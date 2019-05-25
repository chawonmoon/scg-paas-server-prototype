import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 관할지역 안내

    server api
     -

    Route Url : /company/gasAreaGuide

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class GasAreaGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 관할지역 안내');
  }

  render() {
    return <div>GasAreaGuide</div>;
  }
}

export default GasAreaGuide;
