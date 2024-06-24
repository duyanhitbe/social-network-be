import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetAllUserCommand } from '../commands/get-all-user.command';
import { PrismaService } from '../../../modules/database/prisma.service';

@CommandHandler(GetAllUserCommand)
export class GetAllUserHandler implements ICommandHandler<GetAllUserCommand> {
	constructor(private readonly prismaService: PrismaService) {}

	async execute(command: GetAllUserCommand) {
		const {} = command;
		return this.prismaService.user.findMany();
	}
}
