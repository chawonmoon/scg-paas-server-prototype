import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 이용약관 상세

    server api
     -

    Route Url : /terms/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class TermsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('이용약관 상세');
  }

  render() {
    return <div>TermsDetail</div>;
  }
}

export default TermsDetail;
