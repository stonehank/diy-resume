

const routes = [
    {
        path: '/',
        component: () => import( '../components/Home'),
    },
    {
        name:'diy',
        path: '/diy',
        component: () => import( '../components/DIY'),
        children:[
            {
                name:'builder',
                path: 'builder',
                component: () => import( '../components/BuilderMode/index'),
            },
            {
                name:'edit',
                path: 'edit',
                component: () => import( '../components/TextMode/index'),
            },
        ]
    },
    {
        name:'print',
        path: '/print',
        component: () => import( '../components/Print'),
    },

]


export default routes
