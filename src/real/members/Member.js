import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 내정보

    server api
     -

    Route Url : /members

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('내정보');
  }

  render() {
    return <div>Member</div>;
  }
}

export default Member;
