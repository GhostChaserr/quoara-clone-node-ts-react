import { ApiError } from './ErrorModule';

interface ResponseArgs {
	error: string;
	data: object;
	status: number;
}

class SuperModule {
	EpiError: typeof ApiError;

	constructor() {
		this.EpiError = ApiError;
	}

	public generateResponse = (args: ResponseArgs) => {
		return {
			error: args.error,
			data: args.data,
			sattus: args.status
		};
	};

	public asyncWrapper(promise) {
		return promise.then((data) => [ data, undefined ]).catch((error) => Promise.resolve([ undefined, error ]));
	}
}

export default SuperModule;
