import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';

const jwToken = process.env.TOKEN_SECRET as string;

function VerifyUser(req: Request, userId?: number) {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Not Authenticated!')
    }
    const token: string = authHeader!.split(' ')[1];
    const decoded = verify(token as string, jwToken) as JwtPayload;
    const jwtUserId = decoded.user.user_id; // Return the decoded payload
    if (userId && jwtUserId as unknown as number != userId) {

        throw new Error('Unauthorized Access');
    }
    return Number(jwtUserId);
}

function SignIn(userId: number) {
    return sign({ user: { userId } }, jwToken, { expiresIn: '24h' }); // Sign the token and add the userId to it
}

export { VerifyUser, SignIn };