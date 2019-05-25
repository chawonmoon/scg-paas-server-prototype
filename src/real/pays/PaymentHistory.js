import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 요금납부 / 납부내역

    server api
     -

    Route Url : /bills/summary?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PaymentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('요금납부 / 납부내역');
  }

  render() {
    return <div>PaymentHistory</div>;
  }
}

export default PaymentHistory;
