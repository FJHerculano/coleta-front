import axios from "axios";
import {BASE_URL} from "@/services/api/config";
import { useRouter } from "vue-router"; // usaremos nos interceptors

class BaseApi {

    // constructor 
    constructor(){

        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        });

    } // fim do construtor

    // Método para realizar requisição get
    async get(url){
        const response = await this.axiosInstance.get(url);
        return response.data;
    }

    // Método para realizar requisição post
    async post(url, data){
        const response = await this.axiosInstance.post(url, data);
        return response.data;
    }

    // Método para realizar requisição post
    async put(url, data){
        const response = await this.axiosInstance.put(url, data);
        return response.data;
    }
    
    // Método para realizar requisição post
    async delete(url, data){
        const response = await this.axiosInstance.delete(url, data);
        return response.data;
    }


}

export default BaseApi; // exportamos a classe para uso externo
