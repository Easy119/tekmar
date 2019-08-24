import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Detail from '@/views/detail'
import List from '@/views/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/detail',
      children: [
        {
          path: 'detail',
          name: 'Detail',
          component: Detail
        },
        {
          path: 'list',
          name: 'List',
          component: List
        }
      ]
    }

  ]
})
