class AuthDto {
	id
	name
	login

	constructor(model) {
		this.id = model.id
		this.name = model.name
		this.login = model.email
	}
}

export default AuthDto
