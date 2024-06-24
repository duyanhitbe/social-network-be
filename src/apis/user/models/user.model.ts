import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field()
	id!: string;

	@Field()
	username!: string;

	password!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	phone?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	birthday?: Date;

	@Field(() => Gender, { nullable: true })
	gender?: Gender;

	@Field({ nullable: true })
	avatar?: string;

	@Field({ nullable: true })
	background?: string;

	@Field({ nullable: true })
	address?: string;

	@Field({ nullable: true })
	education?: string;
}

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}

registerEnumType(Gender, { name: 'Gender' });
