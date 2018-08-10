import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';

import {fetchMain} from '../actions';

export default class Main extends React.Component {
  componentDidMount() {
      this.props.dispatch(fetchMain());
  }

  render() {
      return (
          <div>
            Hello 
          </div>
      );
  }
}
