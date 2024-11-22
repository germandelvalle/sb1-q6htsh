'use client'

import { useEffect, useState } from 'react';
import { API_CLIENT } from '../utils/api';

const useClients = (baseUrl) => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    
    //TODO here we should handle errors 
    const fetchData = async () => {
        //TODO probably in the future this fetch function receive params to filtering.
        const response = await API_CLIENT.fetchClients();
        return response;
    };
    
    useEffect(() => {
        fetchData().then(response => {
            setLoading(false);
            setClients(response.data);
        })
    },[])
    
    //We can return the fetchData method if we need to refresh something from the caller component or just depend on re-renders.
    return {  loading, error, fetchData,clients };
};

export default useClients;
