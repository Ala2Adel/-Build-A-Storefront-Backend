import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';

const jwToken = process.env.TOKEN_SECRET as string;

function VerifyUser(req: Request, userId?: number) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Not Authenticated!')
    }
    const token = authHeader!.split(' ')[1]; 
    const decoded = verify(token as string, jwToken) as JwtPayload; 
    const jwtUserId = decoded.user.id// Return the decoded payload
    if (userId && jwtUserId != userId) {

        throw new Error('Unauthorized Access');
    }
    return Number(jwtUserId);
}

function SignIn(userId: number) {
    return sign({ user: { userId } }, jwToken, { expiresIn: '24h' }); // Sign the token and add the userId to it
}

export { VerifyUser, SignIn };