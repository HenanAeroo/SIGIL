import { Injectable } from '@nestjs/common';
import prisma from '@sigil/database';

@Injectable()
export class PrismaService {
  public readonly client: typeof prisma = prisma;
}
