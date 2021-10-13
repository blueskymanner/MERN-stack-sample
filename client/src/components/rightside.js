import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => {
    
    // parseInt(Date(props.record.date).getMoth()) + 1;
    let d_y = new Date(props.record.date).getFullYear();
    let d_m = new Date(props.record.date).getMonth()+1;
    let d_d = new Date(props.record.date).getDate();
    let d_date = d_y+'-'+d_m+'-'+d_d;
    return <tr>
            <td>{d_date}</td>
            <td>{props.record.title}</td>
            <td>{props.record.content}</td>
            <td>
                <Link to={"/edit/" + props.record._id} onClick={() => {localStorage.setItem('edit_id', 'true');}}>Edit</Link>| |
                <a
                href="/#public"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
                >
                Delete
                </a>
            </td>
        </tr>
    
}


export default class Rightside extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
        super(props);

        this.deleteRecord = this.deleteRecord.bind(this);
        this.state = { records: [] };
    }
    
    // This method will get the data from the database.
    componentDidMount() {
        axios
        .get(`/record`)
        .then((response) => {
            this.setState({ records: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // This method will delete a record based on the method
    deleteRecord(id) {
        axios.post("/" + id).then((response) => {
        console.log(response.data);
        });

        this.setState({
        records: this.state.records.filter((el) => el._id != id),
        });
    }
    
    // This method will map out the users on the table
    recordList() {
        return this.state.records.map((currentrecord) => {
        return (
            <Record
            record={currentrecord}
            deleteRecord={this.deleteRecord}
            key={currentrecord._id}
            />
        );
        });
    }

    render() {
        return (
            <div className="col-sm-9">
                <div class="container-fluid">
                <h4 style={{textAlign: 'center'}}>Daily Report List</h4>
                <table class="table table-dark table-hover" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{this.recordList()}</tbody>
                </table>
                </div>
            </div>
        );
    }
}
