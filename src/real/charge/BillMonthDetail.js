import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactUtil from '../../utils/ReactUtil';
import FooterMenu from '../layout/FooterMenu';

/*

    이름 : 월별조회 전용 상세

    server api
     -

    Route Url : /bills/detail?month&#x3D;{201901}

    this.prorps 정보
     -
    
    개발방법
     -store (BillSearchMonthStore)

*/

@inject('uiStore', 'billSearchMonthStore')
@observer
class BillMonthDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.topRef = React.createRef();
    this.contentRef = React.createRef();
    this.footerMenuRef = React.createRef();
    this.setContentHeight = ReactUtil.setContentHeight.bind(this);
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('월별조회 전용 상세');
    this.setContentHeight();
  }

  render() {
    return (
      <div className="wrap">
        <div className="topArea" ref={this.topRef}>
          <div className="inner_box">
            <div className="title_area">
              <h1 className="title">월별조회 전용 상세</h1>
            </div>
          </div>
        </div>
        <div className="contentArea" ref={this.contentRef}>
          <div className="inner_box">월별조회 전용 상세</div>
        </div>
        <div
          ref={this.footerMenuRef}
          style={{ display: this.props.displayFooterMenu ? 'block' : 'none' }}
        >
          <FooterMenu />
        </div>
      </div>
    );
  }
}

export default BillMonthDetail;
