import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 이벤트

    server api
     -

    Route Url : /cash/promotion

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 이벤트');
  }

  render() {
    return <div>CashPromotion</div>;
  }
}

export default CashPromotion;
