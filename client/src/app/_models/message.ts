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
  bRead: Read;//This does the same job as the above one but I keep it here cause I don't want to break things as is
}
