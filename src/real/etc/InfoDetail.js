import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도시가스 이용 안내 상세

    server api
     -

    Route Url : /infos/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class InfoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도시가스 이용 안내 상세');
  }

  render() {
    return <div>InfoDetail</div>;
  }
}

export default InfoDetail;
