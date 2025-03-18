export const companiesRoutes = [

     {
      path: '/companies',
      name: 'ListCompaniesView',
     
      component: () => import('@/views/companies/ListView.vue'),
    },
]