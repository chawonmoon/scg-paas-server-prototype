import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자동이체 관리

    server api
     -

    Route Url : /directDebits

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class DirectDebit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자동이체 관리');
  }

  render() {
    return <div>DirectDebit</div>;
  }
}

export default DirectDebit;
