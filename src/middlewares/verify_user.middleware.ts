import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import { User } from "src/users/entities/user.entity";

export interface VerifyUserRequest extends Request {
    user: User
}

@Injectable()
export class VerifyUser implements NestMiddleware {
  async use(req: VerifyUserRequest, res: Response, next: NextFunction) {
    try {
        console.log('req.headers.authorization => ', req.headers.authorization);
      const token = req.headers.authorization?.split(' ')[1]; // Typically, the token comes after "Bearer "
console.log("token =>", token)
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      // Verify token
      const verifiedToken = await verify(token, process.env.JWT_TOKEN_SECRET);
      if (!verifiedToken) {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = verifiedToken; // Add user to request object for use in other controllers/middlewares
      next();
    } catch (err) {
      return res.status(401).json({ error: err.message || 'Unauthorized' });
    }
  }
}