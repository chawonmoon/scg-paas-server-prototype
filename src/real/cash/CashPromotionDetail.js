import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시이벤트 상세

    server api
     -

    Route Url : /cash/promotion/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashPromotionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시이벤트 상세');
  }

  render() {
    return <div>CashPromotionDetail</div>;
  }
}

export default CashPromotionDetail;
