import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 아웃

    server api
     -

    Route Url : /cash/cashout

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 아웃');
  }

  render() {
    return <div>CashOut</div>;
  }
}

export default CashOut;
