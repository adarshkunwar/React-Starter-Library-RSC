export type InputQuestion = {
  type: "input";
  name: string;
  message: string;
  default?: string;
};

export type ListQuestion = {
  type: "list";
  name: string;
  message: string;
  choices: string[];
};

export type Question = InputQuestion | ListQuestion;

export type Answers = Record<string, string>;
