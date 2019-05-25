import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 기존 유저 업데이트 후 필수 약관 동의 안내 화면

    server api
     -

    Route Url : /alreadyMemberAgree

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class AlreadyMemberAgree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('기존 유저 업데이트 후 필수 약관 동의 안내 화면');
  }

  render() {
    return <div>AlreadyMemberAgree</div>;
  }
}

export default AlreadyMemberAgree;
