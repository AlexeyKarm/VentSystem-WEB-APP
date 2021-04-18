import React, {Fragment} from 'react';
import PlayMarket from './PlayMarket.png';
import AppStore from './AppStore.png';
import {
    Button, Input, UncontrolledTooltip,
    Row, Col, Form,
    ButtonGroup, Card,
    CardBody, CardHeader, CardFooter,
    Label, FormGroup,
} from "reactstrap";
class AppFooter extends React.Component {
    render() {


        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">


                                <a href="#" >
                                    <img id="PlayMarket" src={PlayMarket} alt='' />
                                </a>
                                <a href="https://testflight.apple.com/join/BQgrga9z" >
                                    <img id="AppStore" src={AppStore} alt=''  />
                                </a>



                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;
