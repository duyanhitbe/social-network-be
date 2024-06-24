import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../commands/register-user.command';
import { PrismaService } from '@prisma';
import * as bcrypt from 'bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
	constructor(private readonly prismaService: PrismaService) {}

	async execute(command: RegisterUserCommand) {
		const { username, password, name } = command;
		const hashPassword = await bcrypt.hash(password, 10);
		return this.prismaService.user.create({
			data: { username: username, password: hashPassword, name }
		});
	}
}
