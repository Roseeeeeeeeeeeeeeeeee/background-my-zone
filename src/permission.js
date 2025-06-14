import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasGetUser = store.getters.user;
  if(to.meta.auth){
    //需要鉴权的页面
    if(hasGetUser){
      next()
      NProgress.done();

    }else{
      const hasToken = getToken();
      if(hasToken){
        //检验token是否有效
        try{
            await store.dispatch('user/getInfo');
            next()
        }catch(err){
          await store.dispatch('user/resetToken');
          Message.error(err);
          next(`/login?redirect=${to.path}`);
          NProgress.done()
        }
      }else{
        // 说明没有 token，所以需要重新进行登录
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }else{
    if(to.path === '/login'){
      
      if(hasGetUser){
        //已经登录的话就直接跳首页，无需重复登录
        next({path:'/'})
      }else{
        //未登录就放它去登录页
        next()
      }
    }else{
      next()
    }
    NProgress.done();

  }



  //下方是vue-admin-template的原始写法
  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
