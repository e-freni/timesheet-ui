export type Account = {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password?: string,
  authorities: string[],
}

export const Authorities = {
  ADMIN: 'ROLE_ADMINISTRATOR',
  USER: 'ROLE_USER',
};
