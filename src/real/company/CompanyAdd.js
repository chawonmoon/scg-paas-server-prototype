import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 사용 정보 등록

    server api
     -

    Route Url : /company/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CompanyAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 사용 정보 등록');
  }

  render() {
    return <div>CompanyAdd</div>;
  }
}

export default CompanyAdd;
