import { Router } from 'express';
import { login, register } from "../controller/login.js";

export const auth_router = Router();

auth_router.post('/login', login);
auth_router.post('/register', register);