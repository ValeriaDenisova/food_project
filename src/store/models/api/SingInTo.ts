export interface SingInToHead{
    identifier: string,
    password: string
}

export interface SingInToApi{
  jwt: string;
  user: {
    id: number|string,
    username: string,
    email: string
  } 
}

export interface UserModel{
  id: number|string,
  username: string,
  email: string
}

export interface SingInToModel{
  jwt: string;
  user: UserModel;
}

export const normalizeSingInTo = (from: SingInToApi): SingInToModel => {
   return {
        jwt: from.jwt,
        user: from.user
  };
};