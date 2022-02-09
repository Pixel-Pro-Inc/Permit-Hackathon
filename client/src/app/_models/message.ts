import { Read } from "../_enums/read";

export interface Message {
  id: number;
  senderId: number
  senderUsername: string;
  recipientId: number;
  recipientUsername: string;
  content: string;
  messageSent: Date;
  dateRead?: Date;
}
