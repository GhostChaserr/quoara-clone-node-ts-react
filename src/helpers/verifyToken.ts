import * as jwt from 'jwt-then';
import config from '../config/config';

// Token verification
const verifyToken = async (req, res, next): Promise<any> => {
	// check header or url parameters or post parameters for token
	const token: string = req.headers.token;

	if (!token) {
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	}

	try {
		// verifies secret and checks exp
		req.user = await jwt.verify(token, config.JWT_ENCRYPTION);
		next();
	} catch (err) {
		res.status(500).send({ auth: false, message: err });
	}
};

export default verifyToken;

// Validate password
const validatePassword = async (passToValidate, hashedPassword): Promise<any> => {};
