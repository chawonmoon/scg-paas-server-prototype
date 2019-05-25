import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 요금 경감 요청(신청)

    server api
     -

    Route Url : /weakDiscount

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class WeakDiscountAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 요금 경감 요청(신청)');
  }

  render() {
    return <div>WeakDiscountAdd</div>;
  }
}

export default WeakDiscountAdd;
