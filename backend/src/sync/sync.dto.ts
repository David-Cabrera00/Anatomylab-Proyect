import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsDateString, IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from "class-validator";

const anatomySystems = ["cardiovascular", "respiratory", "nervous", "skeletal", "muscular", "digestive"] as const;

export class ProgressSyncDto {
  @IsString()
  @IsIn(anatomySystems)
  system!: string;

  @IsString()
  @MaxLength(160)
  anatomyId!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  score!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentMs?: number;
}

export class FavoriteSyncDto {
  @IsString()
  @IsIn(anatomySystems)
  system!: string;

  @IsString()
  @MaxLength(160)
  anatomyId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class QuizAnswerSyncDto {
  @IsString()
  @MaxLength(160)
  questionId!: string;

  @IsString()
  @MaxLength(160)
  anatomyId!: string;

  @IsInt()
  selectedIndex!: number;

  @IsInt()
  correctIndex!: number;

  @IsBoolean()
  isCorrect!: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeMs?: number;
}

export class QuizSessionSyncDto {
  @IsString()
  @MaxLength(80)
  id!: string;

  @IsString()
  @IsIn(anatomySystems)
  system!: string;

  @IsString()
  @MaxLength(100)
  configId!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  score!: number;

  @IsInt()
  @Min(0)
  totalQuestions!: number;

  @IsInt()
  @Min(0)
  correctCount!: number;

  @IsDateString()
  startedAt!: string;

  @IsDateString()
  completedAt!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentMs?: number;

  @IsArray()
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerSyncDto)
  answers: QuizAnswerSyncDto[] = [];
}

export class StudySessionSyncDto {
  @IsString()
  @MaxLength(80)
  id!: string;

  @IsString()
  @IsIn(anatomySystems)
  system!: string;

  @IsInt()
  @Min(0)
  stepsDone!: number;

  @IsDateString()
  startedAt!: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;
}

export class PreferenceSyncDto {
  @IsString()
  @MaxLength(100)
  key!: string;

  @IsString()
  @MaxLength(2000)
  value!: string;
}

export class SyncDto {
  @IsArray()
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true })
  @Type(() => ProgressSyncDto)
  progress: ProgressSyncDto[] = [];

  @IsArray()
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true })
  @Type(() => FavoriteSyncDto)
  favorites: FavoriteSyncDto[] = [];

  @IsArray()
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => QuizSessionSyncDto)
  quizSessions: QuizSessionSyncDto[] = [];

  @IsArray()
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => StudySessionSyncDto)
  studySessions: StudySessionSyncDto[] = [];

  @IsArray()
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => PreferenceSyncDto)
  preferences: PreferenceSyncDto[] = [];
}
