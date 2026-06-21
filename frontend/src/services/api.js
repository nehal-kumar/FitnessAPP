
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getState = async () => {
    const response = await axios.get(`${API_URL}/state`);
    return response.data;
};

export const setGoal = async (goal) => {
    const response = await axios.post(`${API_URL}/goal`, { goal });
    return response.data;
};

export const logMeal = async (name, weight, isMockUpload = false) => {
    const response = await axios.post(`${API_URL}/meals`, { name, weight, isMockUpload });
    return response.data;
};

export const deleteMeal = async (id) => {
    const response = await axios.delete(`${API_URL}/meals/${id}`);
    return response.data;
};

export const clearAllMeals = async () => {
    const response = await axios.delete(`${API_URL}/meals`);
    return response.data;
};