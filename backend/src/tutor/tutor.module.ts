import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { OllamaClient } from "./ollama.client";
import { TutorController } from "./tutor.controller";
import { TutorService } from "./tutor.service";

@Module({ imports: [AuthModule], controllers: [TutorController], providers: [OllamaClient, TutorService] })
export class TutorModule {}
