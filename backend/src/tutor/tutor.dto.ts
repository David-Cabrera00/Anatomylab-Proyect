import { IsIn, IsString, MaxLength, MinLength } from "class-validator";

const anatomySystems = ["cardiovascular", "respiratory", "nervous", "skeletal", "muscular", "digestive"] as const;

export class TutorQuestionDto {
  @IsString()
  @IsIn(anatomySystems)
  system!: string;

  @IsString()
  @MaxLength(160)
  anatomyId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2000)
  question!: string;
}
