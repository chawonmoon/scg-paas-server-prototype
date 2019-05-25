import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 나의 문의 현황

    server api
     -

    Route Url : /myVocs

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class MyVoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('나의 문의 현황');
  }

  render() {
    return <div>MyVoc</div>;
  }
}

export default MyVoc;
