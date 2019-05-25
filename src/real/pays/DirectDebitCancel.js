import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자동이체 해지

    server api
     -

    Route Url : /directDebits/cancel

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class DirectDebitCancel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자동이체 해지');
  }

  render() {
    return <div>DirectDebitCancel</div>;
  }
}

export default DirectDebitCancel;
