import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자동이체 신청

    server api
     -

    Route Url : /directDebits/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class DirectDebitAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자동이체 신청');
  }

  render() {
    return <div>DirectDebitAdd</div>;
  }
}

export default DirectDebitAdd;
