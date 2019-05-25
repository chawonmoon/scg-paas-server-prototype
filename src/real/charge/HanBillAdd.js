import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 한국전력 청구서 신청

    server api
     -

    Route Url : /hanbill/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class HanBillAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('한국전력 청구서 신청');
  }

  render() {
    return <div>HanBillAdd</div>;
  }
}

export default HanBillAdd;
