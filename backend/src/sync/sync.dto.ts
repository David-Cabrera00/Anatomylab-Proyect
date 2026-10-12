import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class ProgressSyncDto {
  @IsString()
  system!: string;

  @IsString()
  anatomyId!: string;

  @IsNumber()
  @Min(0)
  score!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentMs?: number;
}

export class FavoriteSyncDto {
  @IsString()
  system!: string;

  @IsString()
  anatomyId!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class QuizAnswerSyncDto {
  @IsString()
  questionId!: string;

  @IsString()
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
  id!: string;

  @IsString()
  system!: string;

  @IsString()
  configId!: string;

  @IsNumber()
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
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerSyncDto)
  answers: QuizAnswerSyncDto[] = [];
}

export class StudySessionSyncDto {
  @IsString()
  id!: string;

  @IsString()
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
  key!: string;

  @IsString()
  value!: string;
}

export class SyncDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgressSyncDto)
  progress: ProgressSyncDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FavoriteSyncDto)
  favorites: FavoriteSyncDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizSessionSyncDto)
  quizSessions: QuizSessionSyncDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudySessionSyncDto)
  studySessions: StudySessionSyncDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreferenceSyncDto)
  preferences: PreferenceSyncDto[] = [];
}
