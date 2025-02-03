export const VITE_API_URL = import.meta.env.VITE_API_URL

/**
 * Gaat terug naar de vorige pagina in de gebruiker zijn history
 */
export const handelTerugNaarVorigePagina = () => {
   window.history.back()
}

/**
 * Kopieert een tekst naar je klembord.
 * @param {string} text - De tekst die je wilt kopiëren naar het klembord.
 * @returns {Promise<void>}
 */
export const copyToClipboard = async (text) => {
   try {
     await navigator.clipboard.writeText(text);
     alert("Text gekopiëerd naar het klembord")
   } catch (err) {
     console.error('Fout bij kopiëren naar klembord: ', err);
   }
};

/**
 * Genereert een unieke numerieke ID op basis van timestamp en een willekeurig getal
 * @returns {number} - Een uniek numeriek ID
 */
export const genereerUniekNummerId = () => {
   const timestamp = Date.now(); 
   const randomPart = Math.floor(Math.random() * 1000); 
   return Number(`${timestamp}${randomPart}`); 
 };
 