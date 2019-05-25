import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 약관동의

    server api
     -

    Route Url : /members/regist

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MemberRegist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('약관동의');
  }

  render() {
    return <div>MemberRegist</div>;
  }
}

export default MemberRegist;
