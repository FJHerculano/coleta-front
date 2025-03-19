<template>

    <div class="container-fluid mt-2 mb-4">
        
        <div class="card shadow-lg">
            <div>
                <h4 class="card-header">
                    Nova empresa
                </h4>

                <RouterLink 
                    class="btn btn-sm btn-primary float-start" 
                    to="/companies"
                >
                    <i class="bi bi-arrow-left"></i>&nbsp;
                    Listar empresas
                </RouterLink>

            </div>
        </div>
        
        <div class="card-body">

            <ValidationErrorsView :errors="validationErrors" />         

            <form @submit.prevent="createCompany">

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
    import { defineComponent, ref,  reactive } from 'vue';
    import CompanyFormInputs from '@/components/companies/CompanyFormInputs.vue';
    import ValidationErrorsView from '@/components/ValidationErrors.vue';

    import { useRouter, useRoute } from "vue-router";

    export default defineComponent({
        
        name: 'CreateView',

        components:{
            CompanyFormInputs,
            ValidationErrorsView
        },

        setup(){

            const router = useRouter(); // RouteR - instancia router
            const route = useRoute();   // RoutE  - instancia rota atual


            const company = ref({

                name: '',
                email: '',                
                phone: '',
                address: '',

            });

            const validationErrors = ref([]);

            const createCompany = async() => {

                try{

                    validationErrors.value = [];

                    const api = new CompaniesApi();

                    await api.create(company.value);

                    toast.success(`Sucesso!`,{
                        'theme':'colored',
                        hideProgressBar: true,
                    });

                    setTimeout(() => {
                        // Apos atualizar retorna para view detalhes
                        router.push(`/companies`);
                        
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

            return {
                company,
                createCompany,
                validationErrors
            }
        }

    });

</script>

<style scoped></style>