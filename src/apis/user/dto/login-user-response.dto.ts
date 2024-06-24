import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponseDto {
	@Field()
	token!: string;
}
