import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 전체 업무

    server api
     -

    Route Url : /tasks

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class TaskAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('전체 업무');
  }

  render() {
    return <div>TaskAll</div>;
  }
}

export default TaskAll;
