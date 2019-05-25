import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 이사 / 전출

    server api
     -

    Route Url : /move?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MoveOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('이사 / 전출');
  }

  render() {
    return <div>MoveOut</div>;
  }
}

export default MoveOut;
