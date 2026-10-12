import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export type AuthenticatedRequest = {
  headers: { authorization?: string };
  user?: { id: string; email: string };
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) throw new UnauthorizedException("Token requerido.");

    try {
      const secret = this.config.get<string>("JWT_SECRET");
      if (!secret) throw new Error("JWT_SECRET no configurado.");
      const payload = await this.jwt.verifyAsync<{ sub: string; email: string }>(token, {
        secret,
      });
      request.user = { id: payload.sub, email: payload.email };
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido o expirado.");
    }
  }
}
