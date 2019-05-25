import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 본인인증 결과

    server api
     -

    Route Url : /ciAuthResult

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CiAuthResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('본인인증 결과');
  }

  render() {
    return <div>CiAuthResult</div>;
  }
}

export default CiAuthResult;
