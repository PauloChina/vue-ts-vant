import { Interceptors } from './interceptors'

export class AxiosService {
  public axios: any
  public modal: any

  constructor() {
    // 获取axios实例
    this.axios = new Interceptors().getInterceptors()
  }

  public get(url: string, params: object) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, { params })
        .then((res: any) => {
          this.resultHandle(res, resolve)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  public post(url: string, data: object) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, data)
        .then((res: any) => {
          this.resultHandle(res, resolve)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  /**
   *
   * @param res
   * @param resolve
   */
  public resultHandle(res: any, resolve: any) {
    resolve(res)
  }

  /**
   * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
   * @param res
   */
  public errorHandle(res: any) {
    console.error(res)
    // 状态码判断
    switch (res.status) {
      case -102:
        break
      case -152:
        break
      default:
      // console.log(other);
    }
  }
}
