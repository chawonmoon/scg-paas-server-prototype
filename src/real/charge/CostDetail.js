import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 가스요금표 상세

    server api
     -

    Route Url : /costs/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('가스요금표 상세');
  }

  render() {
    return <div>CostDetail</div>;
  }
}

export default CostDetail;