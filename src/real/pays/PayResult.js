import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 결재하기(완료/실패)

    server api
     -

    Route Url : /pays/result

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PayResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('결재하기(완료/실패)');
  }

  render() {
    return <div>PayResult</div>;
  }
}

export default PayResult;
