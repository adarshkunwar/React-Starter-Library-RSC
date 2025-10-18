import {
  STYLING_LIBRARY_OPTIONS,
  PROJECT_STRUCTURE_OPTIONS,
  INSTALLATION_METHOD_OPTIONS,
} from "../constant/commands.js";

export type StylingLibrary = (typeof STYLING_LIBRARY_OPTIONS)[number];
export type ProjectStructure = (typeof PROJECT_STRUCTURE_OPTIONS)[number];
export type InstallationMethod = (typeof INSTALLATION_METHOD_OPTIONS)[number];
export type Answers = Record<string, string>;

export interface Question<T> {
  type: "input" | "list";
  name: keyof T;
  message: string;
  choices?: readonly string[];
}

export interface ProjectAnswers {
  name: string;
  project_structure: ProjectStructure;
  installation_method: InstallationMethod;
}
