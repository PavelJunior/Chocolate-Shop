import {NotificationState} from '../types/notification';
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  NotificationActionsTypes,
} from '../types/actions';

const reducer = (
  state: NotificationState = initialState,
  action: NotificationActionsTypes,
): NotificationState => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      let notification = {...action.notification, id: state.id};
      let newNotifications = [...state.notifications, notification];
      return {id: (state.id += 1), notifications: newNotifications};
    }

    case DELETE_NOTIFICATION: {
      const newNotifications = state.notifications.filter(
        (i) => i.id !== action.id,
      );
      return {
        ...state,
        notifications: newNotifications,
      };
    }

    default:
      return state;
  }
};

const initialState: NotificationState = {
  id: 0,
  notifications: [],
};

export default reducer;
