import React, { Component } from "react";  
import logo from "./logo.svg";  
import "./App.css";  
import PropTypes from 'prop-types';  
import { getEmployee,addEmployee, editEmployee, deleteEmployee} from './Redux/actions';  
import { connect } from 'react-redux';  
  
const mapStateToProps = state => ({  
  employees: state.employees  
});  
  
class App extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      id: 0,  
      employee_name: "",  
      employee_salary: "",
      employee_age:""  
    };
  }  
  
  static propTypes = {  
    employees: PropTypes.array.isRequired,  
    getEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,  
    editEmployee: PropTypes.func.isRequired,  
    deleteEmployee: PropTypes.func.isRequired   
  };  
  
  componentDidMount() {  
    this.props.getEmployee();  
  }  

  submitData = () => {  
    if (this.state.employee_name && this.state.employee_salary && this.state.employee_age && !this.state.id) {  
      const newEmployee = {  
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),  
        employee_name: this.state.employee_name,  
        employee_salary: this.state.employee_salary,
        employee_age:this.state.employee_age
      };  

      this.props.addEmployee(newEmployee);  
    } else if (this.state.employee_name && this.state.employee_salary && this.state.employee_age && this.state.id) {  
      const updatedDetails = {  
        id: this.state.id,  
        employee_name: this.state.employee_name,  
        employee_salary: this.state.employee_salary,
        employee_age:this.state.employee_age  
      };  
  
      this.props.editEmployee(updatedDetails);  
    } else {  
      alert('Enter Employee Details.');  
    }  
  
    this.clearData();  
  }  
  
  editDetails = (data) => {  
    this.setState({  
      id: data.id,  
      employee_name: data.employee_name,  
      employee_salary: data.employee_salary,
      employee_age:data.employee_age  
    })  
  }  
  
  deleteEmployee = (id) => {  
    this.clearData();  
    if (window.confirm("Are you sure?")) {  
      this.props.deleteEmployee(id);  
    }  
  }  
  
  handleNameChange = (e) => {  
    this.setState({  
      employee_name: e.target.value  
    });  
  }  
  
  handleSalaryChange = (e) => {  
    this.setState({  
      employee_salary: e.target.value  
    });  
  }  

    handleAgeChange = (e) =>{
      this.setState({
        employee_age:e.target.value
      });
    }
  
  clearData = () => {  
    this.setState({  
      id: 0,  
      employee_name: "",  
      employee_salary: "",
      employee_age:""  
    });  
  }  
  
  
  
  render() {  
    return (  
      <div className="App">  
        <header className="App-header">  
          <img src={logo} className="App-logo" alt="logo" />  
          <h1 className="App-title">CRUD opeartions for Employee Module</h1>  
        </header>  
        <p className="App-intro">  
        <div className="leftsection">  
        Employee Name : <input onChange={this.handleNameChange} value={this.state.employee_name} type="text" placeholder="Employee Name" /> <br />  
        Employee Salary :  <input onChange={this.handleSalaryChange} value={this.state.employee_salary} type="text" placeholder="Employee Salary" /><br />
        Employee Age  : <input onChange={this.handleAgeChange} value={this.state.employee_age} type="text" placeholder="Employee age"/>
        {this.state.id ? <button onClick={this.submitData}>UPDATE</button> : <button onClick={this.submitData}>ADD</button>}   
        <button onClick={this.clearData}>CLEAR</button>  
      </div>  
          <div className="rightsection">  
            <table>  
              <thead>  
                <tr>  
                  <th>ID</th>  
                  <th>Name</th>  
                  <th>Salary</th> 
                  <th>Age</th> 
                  <th>Action(s)</th>  
                </tr>  
              </thead>  
              <tbody>  
                {this.props.employees && this.props.employees.map((data, index) => {  
                  return <tr key={(index + 1)}>  
                    <td>{(index + 1)}</td>  
                    <td>{data.employee_name}</td>  
                    <td>{data.employee_salary}</td>
                    <td>{data.employee_age}</td>  
                    <td><button onClick={() => this.editDetails(data)}>EDIT</button> 
                    <button onClick={() => this.deleteEmployee(data.id)}>DELETE</button> </td>  
                  </tr>  
                })}  
              </tbody>  
            </table>  
          </div>  
        </p>  
      </div>  
    );  
  }  
}  
  
export default connect(mapStateToProps, { getEmployee,addEmployee, editEmployee, deleteEmployee })(App);
