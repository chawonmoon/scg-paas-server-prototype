import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 방문예약 캘린더

    server api
     -

    Route Url : /reservations

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('방문예약 캘린더');
  }

  render() {
    return <div>Reservation</div>;
  }
}

export default Reservation;