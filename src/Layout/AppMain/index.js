import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

const Dashboards = lazy(() => import('../../Pages/Devices'));
const Scenarios = lazy(() => import('../../Pages/ScenariosList'));
const NewScenario = lazy(() => import('../../Pages/CreateScenario'));
/*
const Widgets = lazy(() => import('../../Pages/Widgets'));
const Elements = lazy(() => import('../../Pages/Elements'));
const Components = lazy(() => import('../../Pages/Components'));
const Charts = lazy(() => import('../../Pages/Charts'));
const Forms = lazy(() => import('../../Pages/Forms'));
const Tables = lazy(() => import('../../Pages/Tables'));
*/

const AppMain = () => {
    return (
        <Fragment>

            <Suspense fallback={
                <div className="loader-container" />
            }>
                <Route path="/scenarioslist" component={Scenarios}/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container" />
            }>
                <Route path="/createscenario" component={NewScenario}/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container" />
            }>
                <Route path="/dashboards" component={Dashboards}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/dashboards/basic"/>
            )}/> {/* For redirecting to dashboard - it's the main page.
                    Also could be changed to another page.*/}

            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;
