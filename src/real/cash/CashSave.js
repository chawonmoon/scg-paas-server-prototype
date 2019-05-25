import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 / 적립

    server api
     -

    Route Url : /cash?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 / 적립');
  }

  render() {
    return <div>CashSave</div>;
  }
}

export default CashSave;
