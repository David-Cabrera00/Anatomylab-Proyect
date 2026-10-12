import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

import { AuthGuard, type AuthenticatedRequest } from "../auth/auth.guard";
import { TutorQuestionDto } from "./tutor.dto";
import { TutorService } from "./tutor.service";

@Controller("tutor")
@UseGuards(AuthGuard)
export class TutorController {
  constructor(private readonly tutor: TutorService) {}

  @Post("ask")
  ask(@Req() request: AuthenticatedRequest, @Body() input: TutorQuestionDto) {
    return this.tutor.ask(request.user!.id, input);
  }
}
