import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 나의 주요 일정

    server api
     -

    Route Url : /schedules

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('나의 주요 일정');
  }

  render() {
    return <div>Schedule</div>;
  }
}

export default Schedule;
