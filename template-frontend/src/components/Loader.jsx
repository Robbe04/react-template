export default function Loader() {
   return (
     <div
       className="d-flex flex-column align-items-center justify-content-center"
       style={{ minHeight: '100vh' }}
     >
       <div className="spinner-border" role="status" aria-live="polite" aria-label="Loading...">
         <span className="visually-hidden">Loading...</span>
       </div>
     </div>
   );
 }