import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 익월 청구 할인 신청

    server api
     -

    Route Url : /cash/outcomeOrderAdd

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class OutcomeOrderAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('익월 청구 할인 신청');
  }

  render() {
    return <div>OutcomeOrderAdd</div>;
  }
}

export default OutcomeOrderAdd;
