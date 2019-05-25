import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자가검침 해지

    server api
     -

    Route Url : /indications/cancel

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class IndicattionCancel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자가검침 해지');
  }

  render() {
    return <div>IndicattionCancel</div>;
  }
}

export default IndicattionCancel;
