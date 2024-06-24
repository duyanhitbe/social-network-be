import { Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { GetAllUserCommand } from './commands/get-all-user.command';
import { User } from './models/user.model';

@Resolver()
export class UserResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Query(() => [User])
	getAllUser() {
		return this.commandBus.execute(new GetAllUserCommand());
	}
}
