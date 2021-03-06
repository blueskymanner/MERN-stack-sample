import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentDidMount() {
        this.props.signUserOut()
    }
    render() {
        return (
            <div class="center">
                <h1>Hope to see you soon.</h1>
            </div>
        );
    }
}

export default connect(null, actions)(Signout)