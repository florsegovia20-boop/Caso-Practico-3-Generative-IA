export enum UserRole {
  DESIGNER = 'Diseñador',
  COPYWRITER = 'Redactor',
  APPROVER = 'Aprobador',
  ARCHITECT = 'Arquitecto'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface TextVersion {
  id: string;
  content: string;
  timestamp: number;
  author: string;
  note?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: number;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  TEXT_EDITOR = 'TEXT_EDITOR',
  ARCHITECTURE = 'ARCHITECTURE'
}