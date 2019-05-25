import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 라이프 상세

    server api
     -

    Route Url : /lifes/:sectionId/:detailId

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class LifeSectionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('라이프 상세');
  }

  render() {
    return <div>LifeSectionDetail</div>;
  }
}

export default LifeSectionDetail;
