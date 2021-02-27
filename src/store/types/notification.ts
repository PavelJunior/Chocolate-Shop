export interface NotificationState {
  id: number;
  notifications: NotificationItem[];
}

export type NotificationItem = {
  id: number;
  type: string;
  text: string;
};
