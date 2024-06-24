import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { GetAllUserHandler } from './handlers/get-all-user.handler';

@Module({
	providers: [UserResolver, GetAllUserHandler]
})
export class UserModule {}
