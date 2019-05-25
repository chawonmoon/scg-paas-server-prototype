import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자주하는 질문 상세

    server api
     -

    Route Url : /faqs/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class FaqDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자주하는 질문 상세');
  }

  render() {
    return <div>FaqDetail</div>;
  }
}

export default FaqDetail;
