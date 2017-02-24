import React, {Component} from 'react';
import { connect } from 'react-redux';
import StepDetail from './StepDetail';
import ProcessDetail from './ProcessDetail';

class ProcessContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="col-md-9">
        <div className="mainView">
          <ProcessDetail />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allSteps: state.steps.allSteps,
    selectedStep: state.steps.selectedStep,
  };
}

export default connect(mapStateToProps)(ProcessContainer);