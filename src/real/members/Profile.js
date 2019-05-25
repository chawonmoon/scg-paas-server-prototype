import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 회원정보변경

    server api
     -

    Route Url : /members/profile

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('회원정보변경');
  }

  render() {
    return <div>Profile</div>;
  }
}

export default Profile;
