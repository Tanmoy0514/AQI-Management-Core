export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}