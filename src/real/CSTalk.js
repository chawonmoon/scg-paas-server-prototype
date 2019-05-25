import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 상담톡

    server api
     -

    Route Url : /cstalks

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CSTalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('상담톡');
  }

  render() {
    return <div>CSTalk</div>;
  }
}

export default CSTalk;
