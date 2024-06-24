import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { GetAllUserCommand } from './commands/get-all-user.command';
import { User } from './models/user.model';
import { RegisterUserInput } from './dto/register-user.input';
import { RegisterUserCommand } from './commands/register-user.command';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUserCommand } from './commands/login-user.command';
import { LoginUserResponseDto } from './dto/login-user-response.dto';

@Resolver()
export class UserResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Query(() => [User])
	getAllUser() {
		return this.commandBus.execute(new GetAllUserCommand());
	}

	@Mutation(() => User)
	registerUser(@Args('data') data: RegisterUserInput) {
		return this.commandBus.execute(new RegisterUserCommand({ ...data }));
	}

	@Mutation(() => LoginUserResponseDto)
	loginUser(@Args('data') data: LoginUserInput) {
		return this.commandBus.execute(new LoginUserCommand({ ...data }));
	}
}
