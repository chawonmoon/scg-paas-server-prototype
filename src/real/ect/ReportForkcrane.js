import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 신고 / 굴착 공사 신고

    server api
     -

    Route Url : /report?activeIndex&#x3D;1

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ReportForkcrane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('신고 / 굴착 공사 신고');
  }

  render() {
    return <div>ReportForkcrane</div>;
  }
}

export default ReportForkcrane;
