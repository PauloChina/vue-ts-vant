import axios from 'axios'

export class Interceptors {
  public instance: any

  constructor() {
    // 创建axios实例
    this.instance = axios.create({ timeout: 1000 * 12 })
    // 初始化拦截器
    this.initInterceptors()
  }

  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance
  }

  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    /**
     * 请求拦截器
     * 每次请求前，对请求头统一处理
     */
    this.instance.interceptors.request.use(
      (config: any) => {
        return config
      },
      (error: any) => {
        console.log(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      (res: any) => {
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          this.errorHandle(res)
          return Promise.reject(res.data)
        }
      },
      // 请求失败
      (error: any) => {
        const { response } = error
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response)
          return Promise.reject(response.data)
        } else {
          // 处理网络异常
          console.error('网络连接异常,请稍后再试!')
        }
      },
    )
  }

  /**
   * http握手错误
   * @param res  响应回调,根据不同响应进行不同操作
   */
  private errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break
      case 403:
        break
      case 404:
        console.error('请求的资源不存在')
        break
      default:
        console.error('连接错误')
    }
  }
}
