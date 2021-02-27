import {NotificationItem} from '../types/notification';
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  NotificationActionsTypes,
} from '../types/actions';

const reducer = (
  state: NotificationItem[] = initialState,
  action: NotificationActionsTypes,
): NotificationItem[] => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      let notification = {...action.notification};
      let newNotifications = [...state, notification];
      return newNotifications;
    }

    case DELETE_NOTIFICATION: {
      const newNotifications = state.filter(
        (i: NotificationItem) => i.id !== action.id,
      );
      return newNotifications;
    }

    default:
      return state;
  }
};

const initialState: NotificationItem[] = [];

export default reducer;
