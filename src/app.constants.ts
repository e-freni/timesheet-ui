import { environment } from 'environments/environment';

export const SERVER_API_URL: string = environment.api.toString();

export const JWT_STORAGE_KEY = 'token';
