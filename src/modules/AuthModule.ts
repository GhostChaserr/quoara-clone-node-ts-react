import SuperModule from './SuperModule';
import * as jwt from 'jwt-then';
import config from '../config/config';

class AuthModule extends SuperModule {
	// public verifyUser = async (req, res, next): Promise<any> => {
	//   // check header or url parameters or post parameters for token
	//   const token: string = req.headers.token;
	//   if (!token) {
	//     return res.status(403).send({ auth: false, message: 'No token provided.' });
	//   }
	//   try {
	//     // verifies secret and checks exp
	//     req.user = await jwt.verify(token, config.JWT_ENCRYPTION);
	//     next();
	//   } catch (err) {
	//     res.status(500).send({ auth: false, message: err });
	//   }
	// };

	public authenticateUser = async (req, res, next): Promise<any> => {
		const token: string = req.headers.token;

		if (!token) {
			const response = this.generateResponse({ data: null, error: 'provide token', status: 403 });
			return res.json({ response }).status(403);
		}

		try {
			req.user = await jwt.verify(token, config.JWT_ENCRYPTION);
			next();
		} catch (error) {
			const response = this.generateResponse({ data: null, error: 'access denied - invalid token', status: 500 });
			return res.json({ response }).status(500);
		}
	};
}

export default AuthModule;
