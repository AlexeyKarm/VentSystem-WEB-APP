import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import Temp from './Temperature.svg'
import CO2 from './CO_2.svg'
import Humidity from './Wetness.svg'
import People from './People.svg'

import {
    Row, Col,
    CardHeader,
    Card,
    CardBody,
} from 'reactstrap';

const domain = 'https://back.vc-app.ru/';
let info = getJSON('app/datchik?did=10155&json=1');
let infoArray = Object.values(info);
let rooms = getJSON('app/rm_config?did=10155');
let roomsArray = Object.values(rooms);
//console.log(roomsArray);


infoArray.map((item, index) => {
    infoArray[index].r_name = roomsArray[index+1].r_name;
});

function getJSON(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
    return JSON.parse(request.response);
}

export default class AnalyticsDashboard extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false} >

                <Row>
                    {infoArray.map((item, index)=>{
                    return <div className="col-md-6 col-lg-6" key={index}>
                        <Card className="mb-3" >
                            <CardHeader className="card-header-tab">
                                <div className="card-header-title">
                                    {item.r_name}
                                </div>
                            </CardHeader>
                            <CardBody className="pt-2">
                                <Row className="mt-3">
                                    <Col md="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img src={Temp} alt='' width="10%"/>
                                                    <div className="widget-content-left mr-3">
                                                        <div className="widget-numbers fsize-3 text-muted">
                                                            {item.temp}
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="text-muted opacity-6">
                                                            Температура
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img src={CO2} alt='' width="15%"/>
                                                    <div className="widget-content-left mr-3">
                                                        <div className="widget-numbers fsize-3 text-muted">
                                                            {item.co2}
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="text-muted opacity-6">
                                                            Уровень CO2
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img src={Humidity} alt='' width="10%"/>
                                                    <div className="widget-content-left mr-3">
                                                        <div className="widget-numbers fsize-3 text-muted">
                                                            {item.humidity}
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="text-muted opacity-6">
                                                            Влажность
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img src={People} alt='' width="15%"/>
                                                    <div className="widget-content-left mr-3">
                                                        <div className="widget-numbers fsize-3 text-muted">
                                                            {item.people}
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="text-muted opacity-6">
                                                            Количество людей
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                })}
                </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
