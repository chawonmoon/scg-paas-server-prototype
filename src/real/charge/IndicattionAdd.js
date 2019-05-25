import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자가검침 신청

    server api
     -

    Route Url : /indications/add

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class IndicattionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자가검침 신청');
  }

  render() {
    return <div>IndicattionAdd</div>;
  }
}

export default IndicattionAdd;
