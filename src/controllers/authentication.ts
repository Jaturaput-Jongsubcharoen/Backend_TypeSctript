import { getUserByEmail, createUser } from '../db/user';
import express from 'express';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        // const { email, password, username } = req.body;

        // console.log('POST /auth/register body:', req.body);

        // if (!email || !password || !username) {
        //     //return res.sendStatus(400).json({ error: 'Missing email, password, or username' });
        //     return res.status(400).json({ error: 'Missing email, password, or username' });
        // }

        const raw = req.body as any;
        let body = raw;
        if (typeof raw === "string") body = JSON.parse(raw);
        else if (Buffer.isBuffer(raw)) body = JSON.parse(raw.toString("utf8"));

        const { email, password, username } = body ?? {};
        console.log("POST /auth/register body:", body);

        if (!email || !password || !username) {
        return res.status(400).json({ error: "Missing email, password, or username" });
        }
        
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            //return res.sendStatus(400).json({ error: 'Email already exists' });
            return res.status(400).json({ error: 'Email already exists' });
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
        // was: res.sendStatus(400)
        return res.status(500).json({ error: 'Internal server error' });
    }
};