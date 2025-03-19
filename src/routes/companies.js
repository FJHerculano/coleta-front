export const companiesRoutes = [

     {
      path: '/companies',
      name: 'ListCompaniesView',
     
      component: () => import('@/views/companies/ListView.vue'),
    },

    {
      path: '/companies/:id',
      name: 'ShowCompanyView',
     
      component: () => import('@/views/companies/ShowView.vue'),
    },

    {
      path: '/companies/edit/:id',
      name: 'EditCompanyView',
     
      component: () => import('@/views/companies/EditView.vue'),
    },

    
    {
      path: '/companies/new',
      name: 'CreateCompanyView',
     
      component: () => import('@/views/companies/CreateView.vue'),
    },
]