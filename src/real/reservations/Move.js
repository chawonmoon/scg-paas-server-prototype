import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 이사

    server api
     -

    Route Url : /move

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Move extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('이사');
  }

  render() {
    return <div>Move</div>;
  }
}

export default Move;
