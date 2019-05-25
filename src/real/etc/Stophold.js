import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공급중지 보류 요청 내역

    server api
     -

    Route Url : /stopholds

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Stophold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('공급중지 보류 요청 내역');
  }

  render() {
    return <div>Stophold</div>;
  }
}

export default Stophold;
