import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 적립*사용 내역

    server api
     -

    Route Url : /cash/cashHistory

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashUseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 적립*사용 내역');
  }

  render() {
    return <div>CashUseHistory</div>;
  }
}

export default CashUseHistory;
