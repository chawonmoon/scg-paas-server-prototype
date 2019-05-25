import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 청구 요금 조회 / 월별조회

    server api
     -

    Route Url : /bills

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class BillSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('청구 요금 조회 / 월별조회');
  }

  render() {
    return <div>BillSearch</div>;
  }
}

export default BillSearch;
