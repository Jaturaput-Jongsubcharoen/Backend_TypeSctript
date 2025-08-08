import { getUserByEmail, createUser } from '../db/user';
import express from 'express';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400).json({ error: 'Missing email, password, or username' });
        }
        
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400).json({ error: 'Email already exists' });
        }

        const salt = random();
        const user = await createUser({
            email, 
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })

        //return res.status(200).json(user).end();

        const obj = (user as any).toObject?.() ?? user;
        delete obj.authentication?.password;
        delete obj.authentication?.salt;

        //No .end(); res.json already ends the response
        return res.status(201).json(obj);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};