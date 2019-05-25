import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : Walkthrough

    server api
     -

    Route Url : /walkthrough

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Walkthrough extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('Walkthrough');
  }

  render() {
    return <div>Walkthrough</div>;
  }
}

export default Walkthrough;
