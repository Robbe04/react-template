import { Prisma } from '@prisma/client';
import type { ListResponse } from './common';

export interface User {
   userId : number,
   firstName : string,
   lastName : string,
   emailadres : string,
   image : string,
   password : string,
   roles : Prisma.JsonValue;
}

export interface UserCreateInput {
   firstName : string,
   lastName : string,
   emailadres : string,
   image : string,
   password : string,
}

export interface PublicUser extends Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailadres' | 'image'>{}

export interface UserUpdateInput extends UserCreateInput {}

export interface CreateUserRequest extends UserCreateInput {}
export interface UpdateUserRequest extends UserUpdateInput {}

export interface GetAllUsersResponse extends ListResponse<User> {}
export interface GetUserByIdResponse extends User {}
export interface CreateUserResponse extends GetUserByIdResponse {}
export interface UpdateUserResponse extends GetUserByIdResponse {}

export interface LoginRequest {
  emailadres: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface GetUserRequest {
   id: number | 'me';
 }
 