import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../types/express';

export const verifyJWT = async(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.AccessToken;

  if (!token) {
    res.status(401).json({ status: false, msg: 'Access Denied. No Token Provided.' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next()  
}
};