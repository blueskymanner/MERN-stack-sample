import React, { Component } from "react";
// import axios from ' ';
import { withRouter } from "react-router";

class Leftside extends Component {
    // This is the constructor that stores the data.
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         date: new Date(),
    //         title: "",
    //         content: "",
    //     };

    //     // this.handleChange = this.handleChange.bind(this);
    // }

    // This will get the record based on the id from the database.
    // componentDidMount() {
    //     axios
    //     .get(`/record/` + this.props.match.params.id)
    //     .then((response) => {
    //         this.setState({
    //             date: response.data.date,
    //             title: response.data.title,
    //             content: response.data.content,
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    // componentWillReceiveProps(props) {
    //     axios
    //     .get(`/record/` + props.match.params.id)
    //     .then((response) => {
    //         this.setState({
    //             date: response.data.date,
    //             title: response.data.title,
    //             content: response.data.content,
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    // componentWillUpdate() {
    //     axios
    //     .get(`/record/` + this.props.match.params.id)
    //     .then((response) => {
    //         this.setState({
    //             date: response.data.date,
    //             title: response.data.title,
    //             content: response.data.content,
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    // handleChange(event) {
    //     // console.log('######', event.target.value)
    //     this.setState({ [event.target.name]: event.target.value });
    // }

    render() {
        // console.log(this.state.content);
        return(
            <div className="col-sm-3">
                <div className='card'>
                    <h5 className="card-header">
                        Write Daily Report
                    </h5>
                    <div className="card-body">
                        <form onSubmit={this.props.onSubmit} className="writeform">
                        <div className="form-group">
                            <label>Date : </label><br></br>
                            <input type="date" className="formdate form-control-lg"
                                name="date"
                                value={this.props.inputs.date}
                                onChange={this.props.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Title : </label><br></br>
                            <input type="text" name="title"
                                id="title"
                                value={this.props.inputs.title}
                                onChange={this.props.onChange}
                                className="form-control form-control-lg"
                                placeholder="write title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Content : </label><br></br>
                            <input type="text" style={{paddingBottom: 140}}
                                name="content"
                                id="content"
                                value={this.props.inputs.content}
                                onChange={this.props.onChange}
                                className="form-control form-control-lg"
                                placeholder="write content"
                            />
                        </div>
                        
                        <div style={{'paddingTop': '30px'}}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg ">
                                Submit
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
export default withRouter(Leftside);