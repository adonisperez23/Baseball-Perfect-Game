
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'principal', component: () => import('pages/PrincipalPage.vue')},
      { path: 'playgame', name:'playgame',
        component: () => import('pages/PlayGame.vue'),
        props: route => ({equipoOne:route.query.equipo1,equipoTwo:route.query.equipo2})
       },
      { path: 'howtoplay',name:'howtoplay', component: () => import('pages/HowToPlay.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
