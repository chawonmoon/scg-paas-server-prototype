import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactUtil from '../utils/ReactUtil';
import FooterMenu from './layout/FooterMenu';

/*

    이름 : 기존 유저 업데이트 후 필수 약관 동의 안내 화면

    server api
     -

    Route Url : /alreadyMemberAgree

    this.prorps 정보
     -
    
    개발방법
     -state

*/

@inject('uiStore')
@observer
class AlreadyMemberAgree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.topRef = React.createRef();
    this.contentRef = React.createRef();
    this.footerMenuRef = React.createRef();
    this.setContentHeight = ReactUtil.setContentHeight.bind(this);
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('기존 유저 업데이트 후 필수 약관 동의 안내 화면');
    this.setContentHeight();
  }

  render() {
    return (
      <div className="wrap">
        <div className="topArea" ref={this.topRef}>
          <div className="inner_box">
            <div className="title_area">
              <h1 className="title">기존 유저 업데이트 후 필수 약관 동의 안내 화면</h1>
            </div>
          </div>
        </div>
        <div className="contentArea" ref={this.contentRef}>
          <div className="inner_box">기존 유저 업데이트 후 필수 약관 동의 안내 화면</div>
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

export default AlreadyMemberAgree;
