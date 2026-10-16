import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { OmniRouteClient } from "./omniroute.client";
import { OpenRouterClient } from "./openrouter.client";
import { TutorController } from "./tutor.controller";
import { TutorService } from "./tutor.service";

@Module({ imports: [AuthModule], controllers: [TutorController], providers: [OmniRouteClient, OpenRouterClient, TutorService] })
export class TutorModule {}
