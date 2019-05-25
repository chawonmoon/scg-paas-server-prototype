import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 과오납 환불 신청 내역

    server api
     -

    Route Url : /refunds/:id

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class RefundDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.uiStore.changeHeadTitle('과오납 환불 신청 내역');
    }

    render() {
        return <div>RefundDetail</div>;
    }
}

export default RefundDetail;
