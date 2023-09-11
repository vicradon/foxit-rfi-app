export interface Template {
  templateId: number;
  templateName: string;
}

export enum Permission {
  "FILL_FIELDS_AND_SIGN",
  "FILL_FIELDS_ONLY",
  "VIEW_ONLY",
  "EDIT_AND_SIGN",
}

export interface User {
  firstName: string;
  lastName: string;
  emailId: string;
  permission: string;
  workflowSequence: number;
  sequence: number;
  hostEmailId: string;
  allowNameChange: true;
  signerAuthLevel: string;
}
