import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

import { AuthGuard, type AuthenticatedRequest } from "../auth/auth.guard";
import { SyncDto } from "./sync.dto";
import { SyncService } from "./sync.service";

@Controller("sync")
@UseGuards(AuthGuard)
export class SyncController {
  constructor(private readonly sync: SyncService) {}

  @Post()
  syncUser(@Req() request: AuthenticatedRequest, @Body() input: SyncDto) {
    return this.sync.syncUser(request.user!.id, input);
  }
}
