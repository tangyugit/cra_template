import Login from '@/components/login/login'
import Index from '@/pages/home/business/index/index'

const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Index, auth: true }
];

export default routes