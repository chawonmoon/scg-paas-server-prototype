import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공급중지 보류 요청 작성

    server api
     -

    Route Url : /stopholds/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class StopholdAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('공급중지 보류 요청 작성');
  }

  render() {
    return <div>StopholdAdd</div>;
  }
}

export default StopholdAdd;
