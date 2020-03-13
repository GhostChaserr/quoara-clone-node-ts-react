export class ApiError extends Error {
	status: any;
	errors: [];
	constructor(message, status, name, errors) {
		super(message); // (1)
		this.name = name; // (2)
		this.status = status;
		this.errors = errors;
	}
}
