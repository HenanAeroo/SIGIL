import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../types/auth-request.js';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
