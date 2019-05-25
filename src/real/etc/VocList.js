import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 고객의 소리

    server api
     -

    Route Url : /vocs

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class VocList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('고객의 소리');
  }

  render() {
    return <div>VocList</div>;
  }
}

export default VocList;
