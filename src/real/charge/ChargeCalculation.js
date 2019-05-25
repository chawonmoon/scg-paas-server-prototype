import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 실시간 요금 계산

    server api
     -

    Route Url : /charge

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ChargeCalculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('실시간 요금 계산');
  }

  render() {
    return <div>ChargeCalculation</div>;
  }
}

export default ChargeCalculation;
