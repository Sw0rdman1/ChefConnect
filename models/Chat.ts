import { Message } from "./Message";
import User from "./User";

export interface Chat {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
}
