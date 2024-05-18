import axios, { AxiosResponse } from 'axios';
import {ApiResponse} from '../common/types'



const API_URL = 'https://swapi.dev/api';


export const fetchCharacters = (page = 1, searchParam = ""): Promise<ApiResponse> => {
    
    console.log(" ------------------ fethcing data for this route  -------------------\n", `${API_URL}/people/?page=${page}&search=${searchParam}`);
    
    return axios.get(`${API_URL}/people/?page=${page}&search=${searchParam}`)
        .then((response: AxiosResponse<ApiResponse>) => response.data)
        .catch((error: any) => {
            console.error('Error fetching characters:', error);
            throw error;
        });
};
