import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div className={`alert alert-${props.variant} || 'info'`}>
          {
              props.children
          }
        </div>
    );
};

export default ErrorMessage;