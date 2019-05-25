import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 회원탈퇴

    server api
     -

    Route Url : /members/delete

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MemberDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('회원탈퇴');
  }

  render() {
    return <div>MemberDelete</div>;
  }
}

export default MemberDelete;
