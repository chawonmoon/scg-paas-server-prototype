import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 방문예약 상세

    server api
     -

    Route Url : /reservations/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ReservationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('방문예약 상세');
  }

  render() {
    return <div>ReservationDetail</div>;
  }
}

export default ReservationDetail;
