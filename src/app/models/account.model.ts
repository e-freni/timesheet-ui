export type Account = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  role: string[];
};

export const Authorities = {
  ADMINISTRATOR: 'ADMINISTRATOR',
  USER: 'USER',
};
