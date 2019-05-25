import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 간편요금조회 / 계약자 번호로 조회

    server api
     -

    Route Url : /bills/simple?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ContractorInfoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('간편요금조회 / 계약자 번호로 조회');
  }

  render() {
    return <div>ContractorInfoSearch</div>;
  }
}

export default ContractorInfoSearch;
