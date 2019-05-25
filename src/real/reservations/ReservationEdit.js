import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 방문예약 수정

    server api
     -

    Route Url : /reservations/:id/edit

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class ReservationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('방문예약 수정');
  }

  render() {
    return <div>ReservationEdit</div>;
  }
}

export default ReservationEdit;
