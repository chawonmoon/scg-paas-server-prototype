import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 혜택(마케팅) 정보 수신 동의

    server api
     -

    Route Url : /cash/marketing/acceptance

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MarketingAcceptance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('혜택(마케팅) 정보 수신 동의');
  }

  render() {
    return <div>MarketingAcceptance</div>;
  }
}

export default MarketingAcceptance;
