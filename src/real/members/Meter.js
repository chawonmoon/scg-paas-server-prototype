import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 계량기교체 이력조회

    server api
     -

    Route Url : /meters

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Meter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('계량기교체 이력조회');
  }

  render() {
    return <div>Meter</div>;
  }
}

export default Meter;
