import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';

import passportConfig from './config/passport';
import session from './config/session';
import routes from './routes';
import response from './utils/response';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passportConfig(passport);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.SESSION_SECRET || 'secret'));
app.use(response);

app.use('/api', routes);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
