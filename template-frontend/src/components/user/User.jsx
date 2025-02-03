export default function User({user}){

   return (
      <>
         <h2>{user?.firstName} {user?.lastName}</h2>
      </>
   )
}