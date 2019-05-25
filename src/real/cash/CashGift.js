import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 선물

    server api
     -

    Route Url : /cash/gift

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashGift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 선물');
  }

  render() {
    return <div>CashGift</div>;
  }
}

export default CashGift;
