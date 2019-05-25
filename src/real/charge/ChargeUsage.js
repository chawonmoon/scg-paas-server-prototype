import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 사용량 기준 계산

    server api
     -

    Route Url : /charge?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ChargeUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('사용량 기준 계산');
  }

  render() {
    return <div>ChargeUsage</div>;
  }
}

export default ChargeUsage;
