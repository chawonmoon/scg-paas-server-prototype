import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 라이프 세션 하나에 대한 목록

    server api
     -

    Route Url : /lifes/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class LifeSectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('라이프 세션 하나에 대한 목록');
  }

  render() {
    return <div>LifeSectionList</div>;
  }
}

export default LifeSectionList;
