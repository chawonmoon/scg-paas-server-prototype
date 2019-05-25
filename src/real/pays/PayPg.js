import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 결제하기

    server api
     -

    Route Url : /pays/pg

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PayPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('결제하기');
  }

  render() {
    return <div>PayPg</div>;
  }
}

export default PayPg;
