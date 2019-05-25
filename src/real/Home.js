import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 홈

    server api
     -

    Route Url : /home

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('홈');
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
