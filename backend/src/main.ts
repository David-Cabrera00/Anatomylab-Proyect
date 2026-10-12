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
  app.enableCors({
    origin: config.get<string>("CORS_ORIGIN", "http://localhost:1420").split(",").map((origin) => origin.trim()),
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(config.get<number>("PORT", 3000));
}

void bootstrap();
