import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 사용계약번호 등록 완료

    server api
     -

    Route Url : /company/contractNumberAddComplete

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ContractNumberAddComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('사용계약번호 등록 완료');
  }

  render() {
    return <div>ContractNumberAddComplete</div>;
  }
}

export default ContractNumberAddComplete;
