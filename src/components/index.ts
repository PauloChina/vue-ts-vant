import Vue from 'vue'

//全局加载 一些常用 vant 组件
import { Button, Icon, List, Loading, Dialog, Image as VanImage, Lazyload } from 'vant'
import 'vant/lib/index.css'

//全局加载 常用自定义组件
import CusNavBar from './CusNavBar.vue'

Vue.use(Button)
Vue.use(Icon)
Vue.use(List)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(VanImage)
Vue.use(Lazyload)

Vue.component('CusNavBar', CusNavBar)
