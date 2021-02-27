import React from 'react';

import './styles.css';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {
  deleteNotification,
  addNotificationWithTimeout,
} from '../../store/actions/notification';
import {NotificationItem} from '../../store/types/notification';
import ClearIcon from '@material-ui/icons/Clear';

interface LinkStateProps {
  notifications: NotificationItem[];
}

interface LinkDispatchProps {
  onDeleteNotification: (id: number) => void;
  notificationWithTimeout: (notification: NotificationItem) => void;
}

type Props = LinkDispatchProps & LinkStateProps;

const Notification: React.FC<Props> = ({
  notifications,
  onDeleteNotification,
  notificationWithTimeout,
}) => {
  const newNotification = {
    id: new Date().getTime(),
    type: 'warning',
    text: 'Product added to the cart successfully!',
    lifeTime: 2000,
  };

  return (
    <div>
      <ul className="notifications">
        {notifications.map((notification) => (
          <li
            className={`notification notification-${notification.type}`}
            key={notification.id}>
            <p className="notification-content">{notification.text}</p>
            <ClearIcon onClick={() => onDeleteNotification(notification.id)} />
          </li>
        ))}
      </ul>
      <button onClick={() => notificationWithTimeout(newNotification)}>
        Add notification
      </button>
    </div>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    notifications: state.notifications,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onDeleteNotification: (id) => dispatch(deleteNotification(id)),
  notificationWithTimeout: (notification) =>
    addNotificationWithTimeout(notification, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
