export interface QuestionModel {
  num: number;
  of: number;
  question: string;
}

export interface ScoresModel {
  scores: ScoreLineModel[];
  numberOfQuestions: number;
  numberCorrect: number;
  numberWrong: number;
}

interface ScoreLineModel {
  num: number;
  question: string;
  answer: number;
  incorrect: boolean;
  providedAnswer: number;
}
