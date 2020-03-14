import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import apiV1 from './apiV1/index';
import * as errorHandler from './helpers/errorHandler';


// let server = app.listen(3000);
// let io = require('socket.io')(server);

// // place this middleware before any other route definitions
// // makes io available as req.io in all request handlers
// app.use(function(req, res, next) {
//     req.io = io;
//     next();
// });

class App {
	public express: express.Application;

	constructor() {
		this.express = express();
		this.setMiddlewares();
		this.setRoutes();
		this.catchErrors();
	}

	private setMiddlewares(): void {
		this.express.use(cors());
		this.express.use(morgan('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(helmet());
	}

	private setRoutes(): void {
		this.express.use('/api/v1', apiV1);
	}

	private catchErrors(): void {
		this.express.use(errorHandler.notFound);
		this.express.use(errorHandler.internalServerError);
	}
}

export default new App().express;
