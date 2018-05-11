import React from 'react';

const Card = ({children}) => {
  return(
    <div className="jumbotron">
      <div>{children}</div>
    </div>
  );
};

export default Card;