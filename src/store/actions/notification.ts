import {
  AppActions,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '../types/actions';
import {NotificationItem} from '../types/notification';

export const addNotification = (
  notification: NotificationItem,
): AppActions => ({
  type: ADD_NOTIFICATION,
  notification: notification,
});

export const deleteNotification = (id: number): AppActions => ({
  type: DELETE_NOTIFICATION,
  id: id,
});

export const addNotificationWithTimeout = (
  notification: NotificationItem,
  dispatch: any,
) => {
  dispatch(addNotification(notification));
  setTimeout(() => {
    dispatch(deleteNotification(notification.id));
  }, notification.lifeTime);
};
