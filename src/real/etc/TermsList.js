import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 이용약관 목록

    server api
     -

    Route Url : /terms

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class TermsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('이용약관 목록');
  }

  render() {
    return <div>TermsList</div>;
  }
}

export default TermsList;
