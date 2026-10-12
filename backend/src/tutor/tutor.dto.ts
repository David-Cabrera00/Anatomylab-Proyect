import { IsString, MaxLength, MinLength } from "class-validator";

export class TutorQuestionDto {
  @IsString()
  system!: string;

  @IsString()
  anatomyId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2000)
  question!: string;
}
