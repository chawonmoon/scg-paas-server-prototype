import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 관할 고객센터 검색

    server api
     -

    Route Url : /center/area

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class CenterAreaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('관할 고객센터 검색');
  }

  render() {
    return <div>CenterAreaSearch</div>;
  }
}

export default CenterAreaSearch;
