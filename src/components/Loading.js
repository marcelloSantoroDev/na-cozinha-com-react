import React from 'react';
import './css/Loading.css';

function Loading() {
  return (
    <div className="load-container">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
