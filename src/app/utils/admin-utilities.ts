import { Authorities } from 'app/models/account.model';

export function isAdmin(authority: string): boolean {
  return authority.includes(Authorities.ADMINISTRATOR);
}
