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


export interface SavedScoresModel {
  id: number;
  who: string;
  right: number;
  wrong: number;
  when: string;
}
