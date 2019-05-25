import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 청구서 정보로 등록

    server api
     -

    Route Url : /company/contractNumberAddByBillInfo

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ContractNumberAddByBillInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('청구서 정보로 등록');
  }

  render() {
    return <div>ContractNumberAddByBillInfo</div>;
  }
}

export default ContractNumberAddByBillInfo;
