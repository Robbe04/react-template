import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/Authentication.context';

const baseURL = import.meta.env.VITE_API_URL + "/api";

export const axios = axiosRoot.create({
  baseURL: baseURL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  console.log("Axios interceptor - Retrieved Token:", token); 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn("⚠️No token found at request time!");
  }

  return config;
});



/**
 * Haal alle items op van een bepaald endpoint.
 * @param {string} url - Het endpoint van de API dat je wil oproepen.
 * @returns {Promise<Array>} - Een array met alle opgehaalde items.
 */
export const getAll = async (url) => {
   const { data } = await axios.get(`${baseURL}/${url}`);
   return data.items;
};

 /**
 * Haal gegevens op van een specifiek endpoint via zijn ID.
 * @param {string} url - Het endpoint van de API dat je wil oproepen inclusief ID.
 * @param {Object} param - Object met de ID van het te verwijderen item.
 * @returns {Promise<Object>} - De gegevens van het opgehaalde item.
 */
export const getById = async (url, {arg : id}) => {
  console.log(id);
   const { data } = await axios.get(`${baseURL}/${url}/${id}`);
   return data;
 };
 
 /**
  * Verwijder een specifiek item via zijn ID.
  * @param {string} url - Het endpoint van de API dat je wil oproepen.
  * @param {Object} param - Object met de ID van het te verwijderen item.
  * @param {number|string} param.arg - De ID van het item.
  */
 export const deleteById = async (url, { arg: id }) => {
   await axios.delete(`${baseURL}/${url}/${id}`);
 };
 
 /**
  * Werk een specifiek item bij.
  * @param {string} url - Het endpoint van de API dat je wil oproepen.
  * @param {Object} param - Object met de bij te werken gegevens.
  * @param {Object} param.arg - De gegevens die geüpdatet moeten worden.
  * @returns {Promise<Object>} - De bijgewerkte gegevens.
  */
 export const updateById = async (url, { arg: id, body }) => {
   const { data } = await axios.put(`${baseURL}/${url}/${id}`, body);
   return data;
 };

 /**
  * Voegt iets toe aan de REST-api
  * @param url - Het endpoint van de API dat je wil oproepen.
  * @param param1 - Object met de bij te werken gegevens.
  * @returns {Promise<Object>} - Het nieuw aangemaakte item
  */
 export const post = async(url, {arg}) => {
  const {data} = await axios.post(`${baseURL}/${url}`, arg)
  return data
 }
 
 /**
  * Sla een nieuw item op of werk een bestaand item bij.
  * @param {string} url - Het endpoint van de API dat je wil oproepen.
  * @param {Object} param - Object met de gegevens van het item.
  * @param {Object} param.arg - Object met het ID (optioneel) en de overige gegevens.
  */
 export const save = async (url, { arg: { id, ...data } }) => {
   await axios({
     method: id ? 'PUT' : 'POST',
     url: `${baseURL}/${url}/${id ?? ''}`,
     data,
   });
 };