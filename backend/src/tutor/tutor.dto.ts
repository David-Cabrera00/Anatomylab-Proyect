import { IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  structureName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  function?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  relationships?: string;
}
