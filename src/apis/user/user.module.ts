import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { GetAllUserHandler } from './handlers/get-all-user.handler';
import { RegisterUserHandler } from './handlers/register-user.handler';
import { LoginUserHandler } from './handlers/login-user.handler';

@Module({
	providers: [UserResolver, GetAllUserHandler, RegisterUserHandler, LoginUserHandler]
})
export class UserModule {}
