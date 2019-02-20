﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { PatientData } from './FetchPatients';

interface AddPatientDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    patientData: PatientData;
}  

export class AddPatient extends React.Component<RouteComponentProps<{}>, AddPatientDataState>{
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], patientData: new PatientData };

        fetch('api/Patient/GetCityList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data });
            });

        var patId = this.props.match.params["patId"];

        if (patId > 0) {
            fetch('api/Patient/Details/' + patId)
                .then(response => response.json() as Promise<PatientData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, patientData: data });
                });  
        }

        // This will set state for Add patient  
        else {
            this.state = { title: "Create", loading: false, cityList: [], patientData: new PatientData };
        }  

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);  
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm((this.state.cityList));

        return <div>
                   <h1>{this.state.title}</h1>
                   <h3>Employee</h3>
                   <hr/>
                   {contents}
               </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit patient.  
        if (this.state.patientData.patientId) {
            fetch('api/Patient/Edit',
                    {
                        method: 'PUT',
                        body: data,
                    }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchpatients");
                });
        }
        // POST request for Add patient.  
        else {
            fetch('api/Patient/Create',
                    {
                        method: 'POST',
                        body: data,
                    }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchpatients");
                });
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchpatients");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="patientId" value={this.state.patientData.patientId}/>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.patientData
                            .name} required/>
                    </div>
                </div >
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="Lastname">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Lastname" defaultValue={this.state.patientData
                            .lastName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state
                            .patientData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department">Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state
                            .patientData.department} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state
                            .patientData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        );
    }  
}


