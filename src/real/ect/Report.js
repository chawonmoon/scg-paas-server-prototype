import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 신고

    server api
     -

    Route Url : /report

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('신고');
  }

  render() {
    return <div>Report</div>;
  }
}

export default Report;
