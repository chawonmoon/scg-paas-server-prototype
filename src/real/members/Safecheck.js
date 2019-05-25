import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 안전점검 이력조회

    server api
     -

    Route Url : /safechecks

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Safecheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('안전점검 이력조회');
  }

  render() {
    return <div>Safecheck</div>;
  }
}

export default Safecheck;
