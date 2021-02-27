import React from 'react';

import './styles.css';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {deleteNotification} from '../../store/actions/notification';
import {NotificationItem} from '../../store/types/notification';
import ClearIcon from '@material-ui/icons/Clear';

interface LinkStateProps {
  notifications: NotificationItem[];
}

interface LinkDispatchProps {
  onDeleteNotification: (id: number) => void;
}

type Props = LinkDispatchProps & LinkStateProps;

const Notification: React.FC<Props> = ({
  notifications,
  onDeleteNotification,
}) => {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
