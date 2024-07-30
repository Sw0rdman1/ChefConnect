export interface Message {
  id: string;
  text: string;
  isRead: boolean;
  chatID: string;
  senderID: string;
  createdAt: Date;
}
