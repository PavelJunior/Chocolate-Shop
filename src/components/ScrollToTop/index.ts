import React from 'react';
import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from '../../routes/types';

const ScrollToTop: React.FC<RouteComponentProps> = ({history}) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
};

export default withRouter(ScrollToTop);
