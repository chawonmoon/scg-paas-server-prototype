import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 사용 정보 등록 방식 선택

    server api
     -

    Route Url : /company/contractNumberAddMethodSelect

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ContractNumberAddMethodSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 사용 정보 등록 방식 선택');
  }

  render() {
    return <div>ContractNumberAddMethodSelect</div>;
  }
}

export default ContractNumberAddMethodSelect;
