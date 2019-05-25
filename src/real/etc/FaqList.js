import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 자주하는 질문 목록

    server api
     -

    Route Url : /faqs

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class FaqList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('자주하는 질문 목록');
  }

  render() {
    return <div>FaqList</div>;
  }
}

export default FaqList;
