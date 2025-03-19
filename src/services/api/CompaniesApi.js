import BaseApi from "@/services/api/BaseApi";

class CompaniesApi extends BaseApi {

    list(){
        return this.get('/companies');
    }

    create(company){
        return this.post('/companies', company);
    }

    update(id, company){
        return this.put(`/companies/${id}`, company);
    }

    // Método para deletar um registro
    // Importante: nome é destroy pois pode conflitar com o delete da classe API
    // nome do erro acima -> MAXIMUM CALL STACK SIZE EXCEEDED
    destroy(id){
        return this.delete(`/companies/${id}`);
    }

}

export default CompaniesApi; // para uso externo