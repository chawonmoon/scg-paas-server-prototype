import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 방문예약 신청

    server api
     -

    Route Url : /reservations/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ReservationAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('방문예약 신청');
  }

  render() {
    return <div>ReservationAdd</div>;
  }
}

export default ReservationAdd;
