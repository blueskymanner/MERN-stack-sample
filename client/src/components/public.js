import React from 'react';
import { connect } from 'react-redux';
import { writeuser, updateuser } from '../actions';
import axios from 'axios';
// import useForm from '../use-form-react';
import Leftside from './leftside';
import Rightside from './rightside';
import { useState, useEffect } from 'react';

const Public = (props) => {

  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    title: '',
    content: ''});

  const [inputs, setInputs] = useState(initialValues);

  const [dirty, setDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  let edit_id = localStorage.getItem('edit_id');

  useEffect(() => {
    if (props.match.params.id && (edit_id == 'true')) {
      axios
      .post(`/record/` + props.match.params.id)
      .then((response) => {
        let values = initialValues;
        setInputs(initialValues => {values = {...initialValues, date: response.data.date, title: response.data.title, content: response.data.content};
          return values;});

        // setInputs({date: response.data.date, title: response.data.title, content: response.data.content});  //instead of above 3 rows code.
        
      })
      .catch(function (error) {
          console.log(error);
      });  
    }
  
  }, [props.match.params.id]);

  const onChange = (event) => {
    // console.log('@@@@@@@@', event.target.value)
    event.persist();
    setDirty(true);
    setSubmitting(false);
    let currentInputs = inputs;
    setInputs(inputs => {
      currentInputs = {...inputs, [event.target.name]: event.target.value};
      if(isEquivalent(currentInputs, initialValues)) setDirty(false);
      return currentInputs
    });
  }

  const onSubmit2 = () => {
    setSubmitting(false);
    // if (event) {
    //   event.preventDefault();
    // }
    if(props.match.params.id && (edit_id == 'true')) {
      // setInputs({date: new Date(), title: '&&&&&&&&&&&&&&&&&', content: '###################'});
      localStorage.setItem('edit_id', 'false');
      return props.updateuser(inputs, props.match.params.id);
     
    }
    else {
      return props.writeuser(inputs);
    }

  }

// const callback = () => {
//   // console.log('!!!!!!',inputs);
//   if(props.match.params.id) {
//     // console.log("calling api to update user####################");
//     props.updateuser(inputs, props.match.params.id);
//   }
//   else {
//     props.writeuser(inputs);
//   }
// }

  const isEquivalent = (a, b) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
    
  return (
    [
      <div className="center">
        <h1>Welcome To Our Daily Report Page.</h1>
      </div>,
      <div className="row" style={{ marginTop: 80 }}>
        <Leftside onSubmit={onSubmit2} onChange={onChange} inputs={inputs}></Leftside>
        <Rightside ></Rightside>
      </div>
    ]
  );

}
export default connect(null, { writeuser, updateuser })(Public);
