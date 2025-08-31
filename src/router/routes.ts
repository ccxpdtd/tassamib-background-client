import Login from "../views/login/index.vue"
import Layout from "../layout/index.vue"
import NotFound from "../views/404/index.vue"

import Home from "../views/home/index.vue"

import User from "../views/acl/user/index.vue"

import AddUser from "../views/acl/add/index.vue"

import List from "../views/atc/list/index.vue"
import Pub from "../views/atc/pub/index.vue"
import Upload from "../views/atc/upload/index.vue"


export const myRoutes = [
  {
    path: "/login",
    component: Login,
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion'
    }
  },
  {
    path: "/",
    component: Layout,
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      },
    ]
  },
  {
    path: '/acl',
    component: Layout,
    name: 'acl',
    redirect: '/acl/user',
    meta: {
      title: '用户管理',
      hidden: false,
      icon: 'HelpFilled'
    },
    children: [
      {
        path: "/acl/user",
        component: User,
        name: 'user',
        meta: {
          title: '查看用户',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: "/acl/add",
        component: AddUser,
        name: 'add',
        meta: {
          title: '添加用户',
          hidden: false,
          icon: 'UserFilled'
        }
      },
    ]
  },

  {
    path: '/atc',
    component: Layout,
    name: 'atc',
    meta: {
      title: '文章管理',
      hidden: false,
      icon: 'HelpFilled'
    },
    children: [
      {
        path: "/atc/list",
        component: List,
        name: 'list',
        meta: {
          title: '文章列表',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: "/atc/pub",
        component: Pub,
        name: 'pub',
        meta: {
          title: '发布文章',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: "/atc/upload",
        component: Upload,
        name: 'upload',
        meta: {
          title: '上传文章',
          hidden: false,
          icon: 'UserFilled'
        }
      },

    ]
  },


  {
    path: "/404",
    component: NotFound,
    name: 'notFound',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意',
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
]
