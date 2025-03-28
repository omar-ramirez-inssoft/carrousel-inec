import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
//const API_URL = 'http://10.38.2.135:3000/api';
//const API_URL = 'http://52.23.252.184:3000/api';

export const loginWithMatricula = async (matricula) => {
    const response = await axios.post(`${API_URL}/student/selectStudent`, { matricula });
    return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};


export const loginWithMatriculaStudent = async (matricula) => {
    const response = await axios.post(`${API_URL}/student/selectStudentMatricula`, { matricula });
    return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};

export const createOrder = async (openPayId, description, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados) => {
    try {
        // Asegúrate de que la URL es correcta
        const response = await axios.post(`${API_URL}/orders/createOrderStudent`, {
            customer_id: openPayId,
            description,
            amount: totalAmount,
            pedidoIds,  
            fechaVigencia,
            pedidosSeleccionados// Pasamos los IDs de los pedidos seleccionados
        });

        return response.data;  // Regresa la respuesta del servidor, que debe contener el link o la información necesaria
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al generar el link de pago');
    }
};


export const pay = async (openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, token) => {
    try {
        // Asegúrate de que la URL es correcta
        const response = await axios.post(`${API_URL}/orders/pay`, {
            customer_id: openPayId,
            description,
            orderId,
            amount: totalAmount,
            pedidoIds,  
            fechaVigencia,
            pedidosSeleccionados,
            deviceSessionId,
            token// Pasamos los IDs de los pedidos seleccionados
        });

        return response.data;  // Regresa la respuesta del servidor, que debe contener el link o la información necesaria
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al generar el link de pago');
    }
};

export const cancelOrder = async (pedidosConLinks, pedidosComp) => {
    try {
        // Asegúrate de que la URL es correcta
        const response = await axios.post(`${API_URL}/cancel/cancel`, {
            pedidosConLinks, 
            pedidosComp        
        });

        return response.data;  
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al cancelar el link de pago');
    }
};