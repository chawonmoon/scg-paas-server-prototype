import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 라이프 전체 목록

    server api
     -

    Route Url : /lifes

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class LifeSectionAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('라이프 전체 목록');
  }

  render() {
    return <div>LifeSectionAll</div>;
  }
}

export default LifeSectionAll;
