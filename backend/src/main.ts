import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const nodeEnv = config.get<string>("NODE_ENV", "development");
  const jwtSecret = config.get<string>("JWT_SECRET", "");
  if (nodeEnv === "production" && jwtSecret.length < 32) {
    throw new Error("JWT_SECRET debe tener al menos 32 caracteres en producción.");
  }

  app.setGlobalPrefix("api");
  const rawCors = config.get<string>("CORS_ORIGIN", "*");
  const allowedOrigins = rawCors === "*"
    ? true
    : rawCors.split(",").map((origin) => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = Number(process.env.PORT) || config.get<number>("PORT", 3000);
  await app.listen(port, "0.0.0.0");
}

void bootstrap();
