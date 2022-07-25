const Home = () => import('@/views/home/home')
const Ticiqi = () => import('@/views/ticiqi/index')
const Config = () => import('@/views/config/index')
const Pay = () => import('@/views/pay/index')

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/ticiqi',
    component: Ticiqi,
  },
  {
    path: '/config',
    component: Config,
  },
  {
    path: '/pay',
    component: Pay,
  },
  
  // {
  //   path: '/school/A1',
  //   component: () =>import('@/views/school/A1/index'),
  // },
  // {
  //   path: '/school/A2',
  //   component: () =>import('@/views/school/A2/index'),
  // },
  // {
  //   path: '/school/A3',
  //   component: () =>import('@/views/school/A3/index'),
  // },
  // {
  //   path: '/school/A4',
  //   component: () =>import('@/views/school/A4/index'),
  // },
  // {
  //   path: '/school/B1',
  //   component: () =>import('@/views/school/B1/index'),
  // },
  // {
  //   path: '/school/B2',
  //   component: () =>import('@/views/school/B2/index'),
  // },
  // {
  //   path: '/school/C',
  //   component: () =>import('@/views/school/C/index'),
  // },
  // {
  //   path: '/normal/A1',
  //   component: () =>import('@/views/normal/A1/index'),
  // },
  // {
  //   path: '/normal/A2',
  //   component: () =>import('@/views/normal/A2/index'),
  // },
  // {
  //   path: '/normal/A3',
  //   component: () =>import('@/views/normal/A3/index'),
  // },
  // {
  //   path: '/normal/A4',
  //   component: () =>import('@/views/normal/A4/index'),
  // },
  // {
  //   path: '/normal/B1',
  //   component: () =>import('@/views/normal/B1/index'),
  // },
  // {
  //   path: '/normal/B2',
  //   component: () =>import('@/views/normal/B2/index'),
  // },
  // {
  //   path: '/normal/C',
  //   component: () =>import('@/views/normal/C/index'),
  // },
  // {
  //   path: '/city',
  //   component: City,
  // },
  // {
  //   path: '/search',
  //   component: Search,
  // },
  
]
