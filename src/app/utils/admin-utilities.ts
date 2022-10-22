import {Authorities} from "app/models/account.model";

export function isAdmin(authorities: string[]): boolean {
  return authorities?.includes(Authorities.ADMINISTRATOR);
}
