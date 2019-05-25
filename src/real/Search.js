import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 검색

    server api
     -

    Route Url : /search

    this.prorps 정보
     -

*/

@withRouter
@inject('uiStore')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.uiStore.changeHeadTitle('검색');
  }

  render() {
    return <div>Search</div>;
  }
}

export default Search;
