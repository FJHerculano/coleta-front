<template>

    <div class="container-fluid mt-2 mb-4">
        
        <div class="card shadow-lg">
            <div>
                <h4 class="card-header">
                    Editar empresa
                </h4>

                <RouterLink 
                    class="btn btn-sm btn-primary float-start" 
                    :to="{name: 'ShowCompanyView', params: {id: company.id}}"
                >
                    <i class="bi bi-arrow-left"></i>&nbsp;
                    Detalhes da Empresa
                </RouterLink>

            </div>
        </div>
        
        <div class="card-body">

            <LoadingSpinner :isLoading="isLoading"/>         
            <ValidationErrorsView :errors="validationErrors" />         
            

            <form @submit.prevent="updateCompany">

                <CompanyFormInputs :company="company"/>

                <button 
                    type="submit"
                    class="btn btn-success mt-3"
                >
                    <i class="bi bi-floppy"></i>&nbsp;
                    Salvar
                </button>

            </form>

        </div>

    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import CompaniesApi from '@/services/api/CompaniesApi';
    import { toast } from 'vue3-toastify';
    import { defineComponent, ref, onMounted, reactive } from 'vue';
    import LoadingSpinner from '@/components/LoadingSpinner.vue';
    import CompanyFormInputs from '@/components/companies/CompanyFormInputs.vue';
    import ValidationErrorsView from '@/components/ValidationErrors.vue';

    import { useRouter, useRoute } from "vue-router";

    export default defineComponent({
        
        name: 'ShowView',

        components:{
            LoadingSpinner,
            CompanyFormInputs,
            ValidationErrorsView
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

            const validationErrors = ref([]);

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

            const updateCompany = async() => {

                try{

                    validationErrors.value = [];

                    const api = new CompaniesApi();

                    await api.update(route.params.id, company.value);

                    toast.success(`Sucesso!`,{
                        'theme':'colored',
                        hideProgressBar: true,
                    });

                    setTimeout(() => {
                        // Apos atualizar retorna para view detalhes
                        router.push(`/companies/${route.params.id}`);
                        
                    }, 1000);

                }catch(error){


                    // tratar erros de validação da api
                    if(error.response.status === 400 && error.response.data.messages ){

                        validationErrors.value = Object.values(error.response.data.messages);
                        return;
                    
                    }

                    toast.error(`Erro ao enviar os dados: ${error}`,{
                        'theme':'colored',
                        hideProgressBar: true,
                    });


                    console.log(`Erro ao enviar os dados: ${error}`);

                }

            }

            onMounted(fetchCompany);

            return {
                company,
                isLoading,
                updateCompany,
                validationErrors
            }
        }

    });

</script>

<style scoped></style>