import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactUtil from '../utils/ReactUtil';
import FooterMenu from './layout/FooterMenu';

/*

    이름 : 전체 업무

    server api
     -

    Route Url : /tasks

    this.prorps 정보
     -
    
    개발방법
     -store (TaskStore)

*/

@inject('uiStore')
@observer
class TaskAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.topRef = React.createRef();
    this.contentRef = React.createRef();
    this.footerMenuRef = React.createRef();
    this.setContentHeight = ReactUtil.setContentHeight.bind(this);
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('전체 업무');
    this.setContentHeight();
  }

  render() {
    return (
      <div className="wrap">
        <div className="topArea" ref={this.topRef}>
          <div className="inner_box">
            <div className="title_area">
              <h1 className="title">전체 업무</h1>
            </div>
          </div>
        </div>
        <div className="contentArea" ref={this.contentRef}>
          <div className="inner_box">전체 업무</div>
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

export default TaskAll;
