import { User } from "../user";

export interface AuthUser extends User {
	_checked_at: Date;
	_connected: boolean;
}

export interface TokenResponse {
	refresh_token: string;
	token: string;
}
