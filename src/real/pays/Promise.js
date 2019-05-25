import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 분할 납부 확약서

    server api
     -

    Route Url : /promises

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Promise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('분할 납부 확약서');
  }

  render() {
    return <div>Promise</div>;
  }
}

export default Promise;
