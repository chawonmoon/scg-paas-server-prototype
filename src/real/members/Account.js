import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 회원정보관리

    server api
     -

    Route Url : /members/account

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('회원정보관리');
  }

  render() {
    return <div>Account</div>;
  }
}

export default Account;
