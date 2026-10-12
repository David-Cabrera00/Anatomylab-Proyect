import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(input: RegisterDto) {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException("El correo ya está registrado.");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.prisma.user.create({
      data: { email, passwordHash, displayName: input.displayName?.trim() || null },
      select: { id: true, email: true, displayName: true },
    });

    return this.issueToken(user);
  }

  async login(input: LoginDto) {
    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new UnauthorizedException("Correo o contraseña incorrectos.");
    }

    return this.issueToken({ id: user.id, email: user.email, displayName: user.displayName });
  }

  private async issueToken(user: { id: string; email: string; displayName: string | null }) {
    const secret = this.config.get<string>("JWT_SECRET");
    if (!secret) throw new Error("JWT_SECRET debe estar configurado.");
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email },
      { secret },
    );
    return { accessToken, user };
  }
}
