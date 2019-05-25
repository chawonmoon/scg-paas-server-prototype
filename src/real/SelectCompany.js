import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 체험용 도시가스 선택 팝업

    server api
     -

    Route Url : /selectCompany

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class SelectCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('체험용 도시가스 선택 팝업');
  }

  render() {
    return <div>SelectCompany</div>;
  }
}

export default SelectCompany;
