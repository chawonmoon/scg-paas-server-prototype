import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 알림 설정

    server api
     -

    Route Url : /members/push

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PushSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('알림 설정');
  }

  render() {
    return <div>PushSetting</div>;
  }
}

export default PushSetting;
