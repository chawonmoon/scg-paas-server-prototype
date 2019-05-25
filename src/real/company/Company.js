import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 사용정보 관리

    server api
     -

    Route Url : /company

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 사용정보 관리');
  }

  render() {
    return <div>Company</div>;
  }
}

export default Company;
