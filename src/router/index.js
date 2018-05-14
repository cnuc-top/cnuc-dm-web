import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/pages/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/pages/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '控制台',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index')
      }
    ]
  },

  {
    path: '/buildings',
    component: Layout,
    redirect: '/buildings/list',
    name: 'Buildings',
    meta: { title: '建筑管理', icon: 'example' },
    children: [
      {
        path: 'buildings',
        name: 'Buildings-list',
        component: () => import('@/pages/buildings/list'),
        meta: { title: '所有建筑' }
      },
      {
        path: 'buildings/:id',
        name: 'Buildings-detail',
        component: () => import('@/pages/buildings/detail'),
        meta: { title: '建筑详情' },
        hidden: true
      },
      {
        path: 'svgfiles',
        name: 'Buildings-svgfiles',
        component: () => import('@/pages/buildings/svgfiles'),
        meta: { title: '结构管理' }
      },
      {
        path: 'processes',
        name: 'Buildings-processes',
        component: () => import('@/pages/buildings/processes'),
        meta: { title: '进度管理' }
      },
      {
        path: 'companies',
        name: 'Buildings-companies',
        component: () => import('@/pages/buildings/companies'),
        meta: { title: '公司管理' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/pages/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/pages/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/pages/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
