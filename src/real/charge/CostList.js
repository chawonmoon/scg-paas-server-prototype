import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 가스요금표 목록

    server api
     -

    Route Url : /costs

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('가스요금표 목록');
  }

  render() {
    return <div>CostList</div>;
  }
}

export default CostList;
