import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자가검침

    server api
     -

    Route Url : /indications

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Indicattion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자가검침');
  }

  render() {
    return <div>Indicattion</div>;
  }
}

export default Indicattion;
