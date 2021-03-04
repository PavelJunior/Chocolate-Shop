import React, {memo} from 'react';
import './styles.css';

const Error404: React.FC = () => {
  return (
    <div className="error-404">
      <h1>Error 404</h1>
      <h3>Page not found</h3>
    </div>
  );
};

export default memo(Error404);
