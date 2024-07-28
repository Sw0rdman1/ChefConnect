export interface Message {
  id: string;
  content: string;
  isRead: boolean;
  chatID: string;
  senderID: string;
  createdAt: Date;
}
