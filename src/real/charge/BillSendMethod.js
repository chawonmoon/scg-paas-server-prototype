import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 모바일 청구서 관리

    server api
     -

    Route Url : /billSendMethod

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class BillSendMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('모바일 청구서 관리');
  }

  render() {
    return <div>BillSendMethod</div>;
  }
}

export default BillSendMethod;
