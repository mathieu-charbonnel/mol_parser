import React, { Component } from 'react';
import logo from './molecule_logo.svg';
import tick from './tick.svg';
import './App.css';
import EditForm from './Form/editForm';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const url = 'https://uclpktce30.execute-api.eu-west-2.amazonaws.com/prod/my-resource';


async function putData(data = {})  {
let response = await fetch(url, {
  method: 'POST',
  cache: 'no-cache',
  credentials:'omit',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});
return response.json();
}

const styles = {
  media: {
    width:  240,
    height: 0,
    backgroundPosition: '50% 50%',
    backgroundRepeat:   'no-repeat',
    backgroundSize:     'cover',
  },
  center: {
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: 15,
    margin: 0,
    display: 'inline',
  }
};


class App extends Component {

  state = {
      molecule: '',
      composition:{}
  }


  // handle changes in the form inputs
  handleChange = (event) => {
    console.log('handleChange', event.target.value);
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log('state', this.state);
    let output_promise=putData({'molecule' : this.state.molecule});
    output_promise.then(response =>{
      this.setState({ composition: response });
    })
  }





  render() {
    const { classes } = this.props;
    const  record = this.state.composition;

    return (
      <div className="App">
        <div className="App-header">
          <h3>Enter your Molecule</h3>
          <img src={logo} className="App-logo" alt="logo" />
          <form className={classes.form} id="add-record" onSubmit={this.onSubmit}>
              <EditForm
                handleChange={this.handleChange}
                newRecord={this.state}
              />
              <Button type="submit">
                <img src={tick} className="App-tick" alt="logo" />
              </Button>
          </form>
          <div>
              {Object.keys(record).map(function(key) {
              return <div key={key}>{key} -> {record[key]}</div>;
              })}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
