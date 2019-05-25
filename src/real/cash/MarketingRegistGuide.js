import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 혜택(가스락 이용 본인인증 안내화면)

    server api
     -

    Route Url : /cash/marketing/registGuide

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MarketingRegistGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('혜택(가스락 이용 본인인증 안내화면)');
  }

  render() {
    return <div>MarketingRegistGuide</div>;
  }
}

export default MarketingRegistGuide;
