import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 내 도시가스 사용 정보 조회 시

    server api
     -

    Route Url : /company/contractNumberAddByMyInfo

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ContractNumberAddByMyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('내 도시가스 사용 정보 조회 시');
  }

  render() {
    return <div>ContractNumberAddByMyInfo</div>;
  }
}

export default ContractNumberAddByMyInfo;
