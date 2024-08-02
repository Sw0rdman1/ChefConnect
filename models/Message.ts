export interface Message {
  id: string;
  text: string;
  isRead: boolean;
  chatID: string;
  userId: string;
  createdAt: Date;
}
