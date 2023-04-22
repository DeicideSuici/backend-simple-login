import express from 'express';
import cors from 'cors';
import { auth_router } from './routes/auth.routes.js';

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth_router);

app.listen(port, () => {
    console.log(`Server Started In: [localhost:5005]`);
});