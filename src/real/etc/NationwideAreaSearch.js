import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 전국 도시가스 관할 조회

    server api
     -

    Route Url : /nationwide/area

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class NationwideAreaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('전국 도시가스 관할 조회');
  }

  render() {
    return <div>NationwideAreaSearch</div>;
  }
}

export default NationwideAreaSearch;
