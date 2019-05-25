import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 전기 요금 조회 (미 신청 case)

    server api
     -

    Route Url : /hanbill

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class HanBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('전기 요금 조회 (미 신청 case)');
  }

  render() {
    return <div>HanBill</div>;
  }
}

export default HanBill;
