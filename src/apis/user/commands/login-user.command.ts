export class LoginUserCommand {
	username!: string;
	password!: string;

	constructor(data: LoginUserCommand) {
		Object.assign(this, data);
	}
}
