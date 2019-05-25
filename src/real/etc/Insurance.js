import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 보증보험 정보

    server api
     -

    Route Url : /insurances

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('보증보험 정보');
  }

  render() {
    return <div>Insurance</div>;
  }
}

export default Insurance;
