<template>

    <div class="container-fluid mt-2 mb-4">
        
        <div class="card shadow-lg">
            <div>
                <h4 class="card-header">
                    Empresas de coleta
                </h4>

                <RouterLink class="btn btn-dark float-end" to="/companies/new">
                    <i class="bi bi-plus"></i>&nbsp;
                    Nova Empresa
                </RouterLink>
            </div>
        </div>
        
        <div class="card-body">

            <LoadingSpinner :isLoading="isLoading"/>

            <div class="table-responsive">

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Ações</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Criada</th>
                                <th scope="col">Atualizada</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-if="companies.length === 0">
                               
                                <td class="text-center" colspan="4">Não há dados para exibir</td>

                            </tr>

                            <tr v-else v-for="company in companies" :key="company.id">
                               
                                <RouterLink 
                                    class="btn btn-sm btn-outline-primary" 
                                    :to="{name: 'ShowCompanyView', params: {id: company.id}}"
                                >
                                    <i class="bi bi-eye"></i>&nbsp;
                                    Detalhes da Empresa
                                </RouterLink>
                            
                                <td>{{ company.name }}</td>
                                <td>{{ company.created_at }}</td>
                                <td>{{ company.updated_at }}</td>

                           </tr>
                        </tbody>
                    </table>
                </div>

            </div>

           

        </div>

    </div>

</template>

<script>
    import { RouterLink } from 'vue-router';
    import CompaniesApi from '@/services/api/CompaniesApi';
    import { toast } from 'vue3-toastify';
    import { defineComponent, ref, onMounted } from 'vue';
    import LoadingSpinner from '@/components/LoadingSpinner.vue'

    export default defineComponent({
        name: 'CompaniesView',

        components:{
            LoadingSpinner,
        },

        setup(){
            
            const companies = ref([]);
            const isLoading = ref(true);

            const fetchCompanies = async () => {
                try{

                    const api = new CompaniesApi();

                    const data = await api.list();
                    companies.value = data;

                   isLoading.value = false;



                }catch(error){
                    
                    if(error.response && error.response.status !== 401){

                        toast.error(`Erro ao recuperar os registros : ${error}`,{
                            'theme': 'colored',
                            hideProgressBar: true,
                        });
                    }

                    console.log(`Erro ao recuperar os registros : ${error}`);
                }
            }

            onMounted(fetchCompanies);

            return{ companies, isLoading }
        }

    })

</script>

<style scoped></style>