import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import { HOUR } from './jwt.enum';
import { BackendURL } from '@common';

@Injectable()
export class JwtService implements OnModuleInit {
	private SECRET_JWT!: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: NestJwtService
	) {}

	onModuleInit() {
		this.SECRET_JWT = this.configService.get<string>('SECRET_JWT') as string;
	}

	private get issuer() {
		return BackendURL[this.configService.get<any>('NODE_ENV') || 'local'];
	}

	private get audience() {
		return BackendURL[this.configService.get<any>('NODE_ENV') || 'local'];
	}

	private get options(): JwtSignOptions {
		return { secret: this.SECRET_JWT, issuer: this.issuer, audience: this.audience };
	}

	create(subject: string, expiresIn = HOUR, extra?: Record<string, any>): Promise<string> {
		const payload: Partial<JwtPayload> = {
			...extra
		};
		return this.jwtService.signAsync(payload, { ...this.options, subject, expiresIn });
	}

	async verify(token: string): Promise<JwtPayload> {
		const payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.options);
		if (payload.aud !== this.audience || payload.iss !== this.issuer || !payload.sub) {
			throw new UnauthorizedException('invalid token');
		}
		const isExpired = moment().isAfter(moment.unix(payload.exp || 0));
		if (isExpired) {
			throw new UnauthorizedException('token was expired');
		}
		return payload;
	}
}
