import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 청구 요금 조회 / 연간조회

    server api
     -

    Route Url : /bills?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class BillSearchMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('청구 요금 조회 / 연간조회');
  }

  render() {
    return <div>BillSearchMonth</div>;
  }
}

export default BillSearchMonth;
