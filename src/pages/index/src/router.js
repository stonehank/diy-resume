

const routes = [
    {
        path: '/',
        component: () => import( './Home'),
    },
    {
        name:'diy',
        path: '/diy',
        component: () => import( './DIY'),
        children:[
            {
                name:'builder',
                path: 'builder',
                component: () => import( './components/BuilderMode/index'),
            },
            {
                name:'edit',
                path: 'edit',
                component: () => import( './components/TextMode/index'),
            },
        ]
    },


]


export default routes
