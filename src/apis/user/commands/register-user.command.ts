export class RegisterUserCommand {
	name!: string;
	username!: string;
	password!: string;

	constructor(data: RegisterUserCommand) {
		Object.assign(this, data);
	}
}
