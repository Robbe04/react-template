import axios from 'axios';

const baseURL = "http://localhost:9000/api";

/**
 * Haal alle items op van een bepaald endpoint.
 * @param {string} url - Het endpoint van de API dat je wil oproepen.
 * @returns {Promise<Array>} - Een array met alle opgehaalde items.
 */
export const getAll = async (url : string) => {
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