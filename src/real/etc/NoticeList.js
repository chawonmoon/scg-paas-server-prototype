import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공지사항

    server api
     -

    Route Url : /notices

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class NoticeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('공지사항');
  }

  render() {
    return <div>NoticeList</div>;
  }
}

export default NoticeList;
