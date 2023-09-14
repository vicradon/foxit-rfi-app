export interface Template {
  templateId: number;
  templateName: string;
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
