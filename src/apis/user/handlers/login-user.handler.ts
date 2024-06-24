import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../commands/login-user.command';
import { PrismaService } from '@prisma';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

	async execute(command: LoginUserCommand) {
		const { username, password } = command;

		const user = await this.prismaService.user.findUnique({
			where: { username }
		});
		if (!user) {
			throw new UnauthorizedException(`User not found`);
		}

		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			throw new UnauthorizedException(`Wrong password`);
		}

		const token = await this.jwtService.create(user.id);

		return { token };
	}
}
