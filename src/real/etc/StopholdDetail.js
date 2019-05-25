import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공급중지 보류 요청 상세

    server api
     -

    Route Url : /stopholds/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class StopholdDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('공급중지 보류 요청 상세');
  }

  render() {
    return <div>StopholdDetail</div>;
  }
}

export default StopholdDetail;
