import { JwtPayload } from './jwt-payload.js';

export interface AuthRequest {
  headers: { authorization?: string };
  user?: JwtPayload;
}
