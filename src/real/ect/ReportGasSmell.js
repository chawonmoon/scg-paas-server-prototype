import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 신고 / 가스 냄새 신고

    server api
     -

    Route Url : /report?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ReportGasSmell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('신고 / 가스 냄새 신고');
  }

  render() {
    return <div>ReportGasSmell</div>;
  }
}

export default ReportGasSmell;
