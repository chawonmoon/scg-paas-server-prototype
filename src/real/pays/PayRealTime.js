import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 납부 실시간 조회

    server api
     -

    Route Url : /pays/realtime

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PayRealTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('납부 실시간 조회');
  }

  render() {
    return <div>PayRealTime</div>;
  }
}

export default PayRealTime;
