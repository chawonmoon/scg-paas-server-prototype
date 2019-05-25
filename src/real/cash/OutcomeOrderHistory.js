import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 가스비 할인 내역

    server api
     -

    Route Url : /cash/outcomeOrderHistory

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class OutcomeOrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('가스비 할인 내역');
  }

  render() {
    return <div>OutcomeOrderHistory</div>;
  }
}

export default OutcomeOrderHistory;
