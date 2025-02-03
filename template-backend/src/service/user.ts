import {prisma} from "../data"
import { User, UserCreateInput, UserUpdateInput } from "../types/user";
import ServiceError from '../core/serviceError'; 
import handleDBError from './_handelDBError';

export const getAll = async () : Promise<User[]>=> {
   return prisma.user.findMany();
}

export const getById = async (id: number) : Promise<User> => {
   const user = await prisma.user.findUnique({
     where: {
       userId : id,
     }
   });

   if (!user){
      throw ServiceError.notFound("No user with this Id exists");
   }

   return user
}

export const create = async (user : UserCreateInput) : Promise<User> => {
   try {
      return prisma.user.create({
         data : user
      })
   } catch (error : any){
      throw handleDBError(error)
   }

}

export const updateById = async (id: number, userChanges: UserUpdateInput) : Promise<User> => {
   const user = await prisma.user.findUnique({
     where: {
       userId : id,
     }
   });

   if (!user){
      throw ServiceError.notFound("No user with this Id exists")
   } 
   
   const updatedUser = await prisma.user.update({
      where: {
         userId: id,
      },
      data: userChanges
   });

   return updatedUser;
 };

 export const deleteById = async (id: number) : Promise<void> => {
   const user = await prisma.user.findUnique({
      where: {
        userId : id,
      }
    });

    if (!user){
      throw ServiceError.notFound("No user with this Id exists")
   } 

   await prisma.user.delete({
      where: {
         userId: id,
      }
   });
};
