import React, {memo} from 'react';
import './styles.css';

const Error500: React.FC = () => {
  return (
    <div className="error-500">
      <h1>Error 500</h1>
      <h3>Internal Server Error</h3>
    </div>
  );
};

export default memo(Error500);
