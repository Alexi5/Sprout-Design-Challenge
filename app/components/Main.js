import React from 'react';
import Header from './Header';

//components
import Steps from './Steps';
import ProcessContainer from './ProcessContainer';

export const Main = function(props){
  return (
    <div id="main" className="container-fluid">
      <div>
        <Header />
      </div>
      <div>
        <Steps />
        <ProcessContainer />
      </div>
    </div>
  );
}