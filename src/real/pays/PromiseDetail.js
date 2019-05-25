import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 분할 납부 확약서(상세)

    server api
     -

    Route Url : /promises/one

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PromiseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('분할 납부 확약서(상세)');
  }

  render() {
    return <div>PromiseDetail</div>;
  }
}

export default PromiseDetail;
