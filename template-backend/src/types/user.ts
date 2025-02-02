import type { ListResponse } from './common';

export interface User {
   userId : number,
   firstName : string,
   lastName : string,
   emailadres : string
}

export interface UserCreateInput {
   firstName : string,
   lastName : string,
   emailadres : string
}

export interface UserUpdateInput extends UserCreateInput {}

export interface CreateUserRequest extends UserCreateInput {}
export interface UpdateUserRequest extends UserUpdateInput {}

export interface GetAllUsersResponse extends ListResponse<User> {}
export interface GetUserByIdResponse extends User {}
export interface CreateUserResponse extends GetUserByIdResponse {}
export interface UpdateUserResponse extends GetUserByIdResponse {}
