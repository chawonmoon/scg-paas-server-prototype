import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 개인버호 정책 상세

    server api
     -

    Route Url : /privacy/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PrivacyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('개인버호 정책 상세');
  }

  render() {
    return <div>PrivacyDetail</div>;
  }
}

export default PrivacyDetail;
