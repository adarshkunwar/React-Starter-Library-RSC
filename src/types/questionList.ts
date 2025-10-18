import {
  stylingLibraryList,
  installationMethodList,
  projectStructureList,
} from "../constant/questionsList.js";

export type Answers = Record<string, string>;

export interface Question<T> {
  type: "input" | "list";
  name: keyof T;
  message: string;
  choices?: readonly string[];
}

export type StylingLibrary = (typeof stylingLibraryList)[number];
export type ProjectStructure = (typeof projectStructureList)[number];
export type InstallationMethod = (typeof installationMethodList)[number];

export interface ProjectAnswers {
  name: string;
  project_structure: ProjectStructure;
  installation_method: InstallationMethod;
}
