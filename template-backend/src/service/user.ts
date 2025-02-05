import {prisma} from "../data"
import { User, UserUpdateInput, PublicUser, CreateUserRequest } from "../types/user";
import ServiceError from '../core/serviceError'; 
import handleDBError from './_handelDBError';
import { hashPassword, verifyPassword } from "../core/password";
import Role from "../core/roles";
import jwt from 'jsonwebtoken'; 
import { getLogger } from '../core/logging'; 
import { generateJWT, verifyJWT } from '../core/jwt'; 
import type { SessionInfo } from '../types/authentication'; 

const makeExposedUser = ({userId, firstName, lastName, emailadres, image} : User) : PublicUser => ({
   userId,
   firstName,
   lastName,
   emailadres,
   image,
});

export const checkAndParseSession = async (
   authHeader?: string,
 ): Promise<SessionInfo> => {
   if (!authHeader) {
     throw ServiceError.unauthorized('You need to be signed in');
   }
 
   if (!authHeader.startsWith('Bearer ')) {
     throw ServiceError.unauthorized('Invalid authentication token');
   }
 
   const authToken = authHeader.substring(7);
 
   try {
     const { roles, sub } = await verifyJWT(authToken);
 
     return {
       userId: Number(sub),
       roles,
     };
   } catch (error: any) {
     getLogger().error(error.message, { error });
 
     if (error instanceof jwt.TokenExpiredError) {
       throw ServiceError.unauthorized('The token has expired');
     } else if (error instanceof jwt.JsonWebTokenError) {
       throw ServiceError.unauthorized(
         `Invalid authentication token: ${error.message}`,
       );
     } else {
       throw ServiceError.unauthorized(error.message);
     }
   }
 };

 export const checkRole = (role: string, roles: string[]): void => {
   const hasPermission = roles.includes(role);
 
   if (!hasPermission) {
     throw ServiceError.forbidden(
       'You are not allowed to view this part of the application',
     );
   }
 };

 export const login = async (emailadres: string, password: string): Promise<string> => {
  if (!emailadres) {
    throw ServiceError.conflict('Email address is required');
  }

  const user = await prisma.user.findUnique({ where: { emailadres } });

  if (!user) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  const passwordValid = await verifyPassword(password, user.password);

  if (!passwordValid) {
    throw ServiceError.unauthorized('The given email and password do not match');
  }

  return await generateJWT(user);
};


export const getAll = async () : Promise<PublicUser[]>=> {
   const users = await prisma.user.findMany();
   return users.map(makeExposedUser);
}

export const getById = async (id: number) : Promise<PublicUser> => {
   const user = await prisma.user.findUnique({
     where: {
       userId : id,
     }
   });

   if (!user){
      throw ServiceError.notFound("No user with this Id exists");
   }

   return makeExposedUser(user);
}

export const create = async ({firstName, lastName, emailadres, image, password} : CreateUserRequest) : Promise<String> => {
   try {
      const passwordHash = await hashPassword(password);
      const user =  await prisma.user.create({
         data : {
            firstName,
            lastName,
            emailadres,
            image,
            password : passwordHash,
            roles : [Role.USER]
         }
      })

      if (!user) {
         throw ServiceError.internalServerError(
            'An unexpected error occured when creating the user',
         );
      }

      return await generateJWT(user);
   } catch (error : any){
      throw handleDBError(error)
   }
}

export const updateById = async (id: number, userChanges: UserUpdateInput) : Promise<PublicUser> => {
   try {
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
   } catch (error : any){
      throw handleDBError(error);
   }
 };

 export const deleteById = async (id: number) : Promise<void> => {
   try {
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
   } catch (error : any){
      throw handleDBError(error);
   }
};
