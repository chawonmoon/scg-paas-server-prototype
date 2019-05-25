import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 요금납부 / 미납내역

    server api
     -

    Route Url : /bills/summary?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class NonPaymentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('요금납부 / 미납내역');
  }

  render() {
    return <div>NonPaymentHistory</div>;
  }
}

export default NonPaymentHistory;
