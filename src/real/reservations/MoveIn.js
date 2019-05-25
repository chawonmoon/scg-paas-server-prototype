import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 이사 / 전입

    server api
     -

    Route Url : /move?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MoveIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('이사 / 전입');
  }

  render() {
    return <div>MoveIn</div>;
  }
}

export default MoveIn;