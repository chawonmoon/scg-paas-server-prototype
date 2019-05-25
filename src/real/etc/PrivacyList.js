import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 개인보호 정책

    server api
     -

    Route Url : /privacy

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PrivacyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('개인보호 정책');
  }

  render() {
    return <div>PrivacyList</div>;
  }
}

export default PrivacyList;
