import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 앱 버전

    server api
     -

    Route Url : /members/appInfo

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('앱 버전');
  }

  render() {
    return <div>AppInfo</div>;
  }
}

export default AppInfo;
