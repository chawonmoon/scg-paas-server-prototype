import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 실시간 요금 계산

    server api
     -

    Route Url : /charge?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ChargeRealtime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('실시간 요금 계산');
  }

  render() {
    return <div>ChargeRealtime</div>;
  }
}

export default ChargeRealtime;
