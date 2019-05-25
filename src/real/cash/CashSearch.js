import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 캐시 / 조회

    server api
     -

    Route Url : /cash?activeIndex&#x3D;0

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CashSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('캐시 / 조회');
  }

  render() {
    return <div>CashSearch</div>;
  }
}

export default CashSearch;
