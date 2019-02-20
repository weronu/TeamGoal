import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchPatientDataState {
    patList: PatientData[]; // class to hold patient data
    loading: boolean; // indicator if the data is being loaded onto the page
}
export class FetchPatients extends React.Component<RouteComponentProps<{}>, FetchPatientDataState> { // component class
    constructor() {
        super();
        this.state = { patList: [], loading: true };
        fetch('api/Patient/Index') // calling WEB API method for fetching all patients
            .then(response => response.json() as Promise<PatientData[]>)
            .then(data => {
                this.setState({ patList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() { // render HTML elements into the DOM
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPatientTable(this.state.patList);
        return <div>
            <h1>Patient Data</h1>
            <p>This component demonstrates fetching Patient data from the server.</p>
            <p>
                <Link to="/addpatient">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // Handle Delete request for an Patient  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete patient with Id: " + id))
            return;
        else { 
            fetch('api/Patient/Delete/' + id, { // calling WEB API method for fetching all patients
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        patList: this.state.patList.filter((rec) => {
                            return (rec.patientId != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/Patient/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderPatientTable(patList: PatientData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>PatientId</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {patList.map(emp =>
                    <tr key={emp.patientId}>
                        <td></td>
                        <td>{emp.patientId}</td>
                        <td>{emp.name}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.patientId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.patientId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class PatientData {
    patientId: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}