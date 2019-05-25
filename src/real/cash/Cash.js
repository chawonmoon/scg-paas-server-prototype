import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시

    server api
     -

    Route Url : /cash

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Cash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시');
  }

  render() {
    return <div>Cash</div>;
  }
}

export default Cash;
