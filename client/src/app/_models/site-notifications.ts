import { Read } from "../_enums/read";

export interface SiteNotifications {
  message: string;
  Sent: Date;
  Recieved: Date;
  Read: Read;
}
