import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 / 사용

    server api
     -

    Route Url : /cash?activeIndex&#x3D;2

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashUse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 / 사용');
  }

  render() {
    return <div>CashUse</div>;
  }
}

export default CashUse;
