import {prisma} from "../data"
import { User, UserCreateInput, UserUpdateInput } from "../types/user";

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
      throw new Error("No user with this Id exists");
   }

   return user
}

export const create = async (user : UserCreateInput) : Promise<User> => {
   return prisma.user.create({
      data : user
   })
}

export const updateById = async (id: number, userChanges: UserUpdateInput) : Promise<User> => {
   const user = await prisma.user.findUnique({
     where: {
       userId : id,
     }
   });

   if (!user){
      throw new Error("No user with this Id exists")
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
      throw new Error("No user with this Id exists")
   } 

   await prisma.user.delete({
      where: {
         userId: id,
      }
   });
};
