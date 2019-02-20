import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPatients } from "./components/FetchPatients";
import { AddPatient } from "./components/AddPatient";


export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchpatients' component={FetchPatients} />
    <Route path='/addpatient' component={AddPatient} />
    <Route path='/patient/edit/:patId' component={AddPatient} />
</Layout>;