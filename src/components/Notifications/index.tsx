import React from 'react';

import './styles.css';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {
  addNotification,
  deleteNotification,
} from '../../store/actions/notification';
import {NotificationItem} from '../../store/types/notification';
import ClearIcon from '@material-ui/icons/Clear';

interface LinkStateProps {
  notifications: NotificationItem[];
  newId: number;
}

interface LinkDispatchProps {
  addNotification: (notification: NotificationItem) => void;
  onDeleteNotification: (id: number) => void;
}

type Props = LinkDispatchProps & LinkStateProps;

const not = {
  id: 0,
  type: 'success',
  text: 'Product added to the cart successfully!',
};

const Notification: React.FC<Props> = ({
  notifications,
  addNotification,
  onDeleteNotification,
  newId,
}) => {
  const onAddNotification = () => {
    addNotification(not);
    setTimeout(() => {
      onDeleteNotification(newId);
    }, 5000);
  };

  return (
    <div>
      <ul className="notifications">
        {notifications.map((notification) => (
          <li className="notification" style={{backgroundColor: 'green'}}>
            <p className="notification-content">{notification.text}</p>
            <ClearIcon onClick={() => onDeleteNotification(notification.id)} />
          </li>
        ))}
      </ul>
      <button onClick={() => onAddNotification()}>Add notification</button>
    </div>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    notifications: state.notifications.notifications,
    newId: state.notifications.id,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  addNotification: (notification) => dispatch(addNotification(notification)),
  onDeleteNotification: (id) => dispatch(deleteNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
