import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 고객의 소리 작성

    server api
     -

    Route Url : /vocs/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class VocAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('고객의 소리 작성');
  }

  render() {
    return <div>VocAdd</div>;
  }
}

export default VocAdd;
