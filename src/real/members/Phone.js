import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 휴대폰 번호 변경

    server api
     -

    Route Url : /members/phone

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('휴대폰 번호 변경');
  }

  render() {
    return <div>Phone</div>;
  }
}

export default Phone;
