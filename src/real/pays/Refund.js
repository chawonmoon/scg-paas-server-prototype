import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 과오납 조회

    server api
     -

    Route Url : /refunds

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Refund extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('과오납 조회');
  }

  render() {
    return <div>Refund</div>;
  }
}

export default Refund;
