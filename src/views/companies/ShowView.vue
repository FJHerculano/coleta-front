<template>

    <div class="container-fluid mt-2 mb-4">
        
        <div class="card shadow-lg">
            <div>
                <h4 class="card-header">
                    Detalhes da empresa
                </h4>

                <RouterLink class="btn btn-primary float-start" to="/companies">
                    <i class="bi bi-arrow-left"></i>&nbsp;
                    Listar Empresas
                </RouterLink>
            </div>
        </div>
        
        <div class="card-body">

            <LoadingSpinner :isLoading="isLoading"/>         

            <ul class="list-group mb-3">
                <li class="list-group-item"><strong>Empresa: </strong>&nbsp;{{ company.name }}</li>
                <li class="list-group-item"><strong>E-mail: </strong>&nbsp;{{ company.email }}</li>
                <li class="list-group-item"><strong>Telefone: </strong>&nbsp;{{ company.phone }}</li>
                <li class="list-group-item"><strong>Endereço: </strong>&nbsp;{{ company.address }}</li>

                <li class="list-group-item"><strong>Criada em: </strong>&nbsp;{{ company.created_at }}</li>
                <li class="list-group-item"><strong>Atualizada em: </strong>&nbsp;{{ company.updated_at }}</li>
            </ul>

            <RouterLink 
                class="btn btn-sm btn-warning float-start" 
                :to="{name: 'EditCompanyView', params: {id: company.id}}"
            >
                <i class="bi bi-pencil-square"></i>&nbsp;
                Editar
            </RouterLink>
            
            <DeleteButton v-if="company.id" :itemId="company.id" btnClass="btn m-1 btn-danger" @delete="deleteCompany"/>

        </div>

    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import CompaniesApi from '@/services/api/CompaniesApi';
    import { toast } from 'vue3-toastify';
    import { defineComponent, ref, onMounted, reactive } from 'vue';

    import LoadingSpinner from '@/components/LoadingSpinner.vue';
    import DeleteButton from '@/components/DeleteButton.vue';

    import { useRouter, useRoute } from "vue-router";

    export default defineComponent({
        
        name: 'ShowView',

        components:{
            LoadingSpinner,
            DeleteButton,
        },

        setup(){


            const router = useRouter(); // RouteR - instancia router
            const route = useRoute();   // RoutE  - instancia rota atual

            const isLoading = ref(true);

            const company = ref({

                name: '',
                email: '',                
                phone: '',
                address: '',
                routes: ref([]), // cada empresa é responsavel por um rotas de coleta

            });

            const fetchCompany = async() => {
                try{

                    const api = new CompaniesApi();

                    // Aqui chamamos o método get() da classe BaseApi que recebe a url
                    const data = await api.get(`/companies/${route.params.id}`);
                    company.value = data;

                    isLoading.value = false;

                }catch(error){
                    if(error.response && error.response.status !== 401){
                        toast.error(`Erro ao recuperar os registros: ${error}`,{
                            'theme':'colored',
                            hideProgressBar: true,
                        });
                    }

                    console.log(`Erro ao recuperar os registros: ${error}`);
                
                }
            }

            const deleteCompany = async (id) => {

                try{
                    
                    const confirmed = confirm("Tem certeza da exclusão?");

                    if(!confirmed){
                        return;
                    }

                    const api = new CompaniesApi();

                    await api.destroy(id);

                    toast.success(`Excluido com sucesso`,{
                        'theme':'colored',
                        hideProgressBar: true,
                    });

                    setTimeout(() => {
                        router.push('/companies');
                    }, 1000);

                }catch(error){
                    if(error.response && error.response.status !== 401){
                        toast.error(`Erro ao excluir os registros: ${error}`,{
                            'theme':'colored',
                            hideProgressBar: true,
                        });
                    }

                    console.log(`Erro ao excluir os registros: ${error}`);

                }          
            }


            onMounted(fetchCompany);

            return {
                company,
                isLoading,
                deleteCompany
            }
        }

    });

</script>

<style scoped></style>