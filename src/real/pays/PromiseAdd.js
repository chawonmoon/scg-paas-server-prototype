import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 요금 납부이행 확약서

    server api
     -

    Route Url : /promises/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class PromiseAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 요금 납부이행 확약서');
  }

  render() {
    return <div>PromiseAdd</div>;
  }
}

export default PromiseAdd;
