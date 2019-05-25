import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 알림

    server api
     -

    Route Url : /pushes

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PushList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('알림');
  }

  render() {
    return <div>PushList</div>;
  }
}

export default PushList;
