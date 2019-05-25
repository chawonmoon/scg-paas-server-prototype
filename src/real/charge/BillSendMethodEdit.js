import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 청구서 변경

    server api
     -

    Route Url : /billSendMethod/edit

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class BillSendMethodEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('청구서 변경');
  }

  render() {
    return <div>BillSendMethodEdit</div>;
  }
}

export default BillSendMethodEdit;
