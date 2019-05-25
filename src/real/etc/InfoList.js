import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 도사가스 이용 안내

    server api
     -

    Route Url : /infos

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class InfoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('도사가스 이용 안내');
  }

  render() {
    return <div>InfoList</div>;
  }
}

export default InfoList;
