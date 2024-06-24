declare global {
	interface JwtPayload {
		sub: string;
		iss: string;
		iat: number;
		aud: string;
		exp: number;

		[key: string]: any;
	}
}

export {};
