import Vue from 'vue'
import VueRouter from 'vue-router'
import Water from '../views/Water/Water.vue'
import User from '../views/User/User.vue'
import Platform from '../views/Platform/Platform.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import Error_404 from '../views/Error_404.vue'
import Index from '../components/Index.vue'
import Home from '../views/Home/Home.vue'
import Center from '../views/Center/Center.vue'
import WaterRiver from '../views/Water/Query/River.vue'
import WaterReservoir from '../views/Water/Query/Reservoir.vue'
import WaterSystem from '../views/Water/Query/System.vue'
import AlterRiver from '../views/Water/Alter/River.vue'
import AlterReservoir from '../views/Water/Alter/Reservoir.vue'
import AlterSystem from '../views/Water/Alter/System.vue'
import Alter from '../views/Water/Alter/Alter.vue'
import AddInfo from '../views/Water/Add/AddInfo.vue'
import CreateArticle from '../views/Platform/Edit/CreateArticle.vue'
import EditArticle from '../views/Platform/Edit/EditArticle.vue'
import PlatformIndex from '../views/Platform/Index/Index.vue'
import Browse from '../views/Platform/Browse/Browse.vue'
import InquireMyArticle from '../views/Platform/Browse/InquireMyArticle.vue'
import Message from '../views/Message/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'water',
        name: 'water',
        component: Water,
        redirect: '/water/river',
        children: [
          {
            path: 'river',
            name: 'WaterRiver',
            component: WaterRiver
          },
          {
            path: 'reservoir',
            name: 'WaterReservoir',
            component: WaterReservoir
          },
          {
            path: 'system',
            name: 'WaterSystem',
            component: WaterSystem
          },
          {
            path: 'add_info',
            name: 'AddInfo',
            component: AddInfo
          },
          {
            path: 'alter',
            name: 'Alter',
            component: Alter,
            children: [
              {
                path: 'river',
                name: 'AlterRiver',
                component: AlterRiver,
              },
              {
                path: 'reservoir',
                name: 'AlterReservoir',
                component: AlterReservoir,
              },
              {
                path: 'system',
                name: 'AlterSystem',
                component: AlterSystem,
              }
            ]
          }
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/platform',
        name: 'platform',
        component: Platform,
        redirect: '/platform/index',
        children: [
          {
            path: 'index',
            name: 'PlatformIndex',
            component: PlatformIndex
          },
          {
            path: 'create_article',
            name: 'CreateArticle',
            component: CreateArticle
          },
          {
            path: 'browse',
            name: 'browse',
            component: Browse
          },
          {
            path: 'inquire_my_article',
            name: 'InquireMyArticle',
            component: InquireMyArticle
          },
          {
            path: 'edit_article',
            name: 'EditArticle',
            component: EditArticle
          }
        ]
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/center',
        name: 'center',
        component: Center
      },
      {
        path: 'message',
        name: 'Message',
        component: Message
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: Error_404
  }
]

const router = new VueRouter({
  routes
})

export default router
