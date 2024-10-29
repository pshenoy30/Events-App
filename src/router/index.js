import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetails from '../views/Event/Details.vue'
import EventRegister from '../views/Event/Register.vue'
import EventEdit from '../views/Event/Edit.vue'
import EventLayout from '../views/Event/Layout.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: parseInt(route.query.page) || 1})
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit
        },
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        }
      ]
    },
    {
      path: '/event/:id',
      redirect: to => {
        return { name: 'event-details'}
      },
      children: [
        { path: 'register',  redirect: () => ({name: 'EventRegister'}) },
        { path: 'edit', redirect: () => ({name: 'EventEdit'})}
      ]
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
    },
    { path: '/about',
      redirect: {name: 'about'}
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true 
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError 
    }
  ],
  scrollBehavior ( to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0}
    }
  }
})

export default router
