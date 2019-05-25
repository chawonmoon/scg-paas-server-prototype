import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 요금납부

    server api
     -

    Route Url : /bills/summary

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class BillsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('요금납부');
  }

  render() {
    return <div>BillsSummary</div>;
  }
}

export default BillsSummary;
