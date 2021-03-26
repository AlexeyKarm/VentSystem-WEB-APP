import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import Temp from './Temperature.svg'
import CO2 from './CO_2.svg'
import Humidity from './Wetness.svg'
import People from './People.svg'

import {
    Row, Col,
    CardHeader,
    Card, CardFooter,
    CardBody, ButtonGroup,
} from 'reactstrap';

import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

const domain = 'https://back.vc-app.ru/';
let timer;

//Some old code
//let info = getJSON('app/datchik?did=10155&json=1');
//console.log(info);
//let infoArray = Object.values(info);
//console.log(infoArray);
//console.log(roomsArray);
// infoArray.map((item, index) => {
//     infoArray[index].r_name = roomsArray[index+1].r_name;
// });


export default class AnalyticsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isButtonDisabled: false,
            items: [],
            isLoaded: false,
            timerNumber: false,
        };
        this.ventilate = this.ventilate.bind(this);
        this.tick = this.tick.bind(this);
        this.getJSON = this.getJSON.bind(this);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    componentDidMount() {
        timer = setInterval(() =>
            this.tick(), 2000);
    }

    tick(){
        try {
            this.state.items = this.getJSON('app/datchik?did=10155&json=1');
            this.roomsArray = Object.values(this.getJSON('app/rm_config?did=10155'));
        } catch (e) {
            console.log('Failed to load...')
        }
        if (this.state.items !== []){
            console.log('Data has been received!');
            this.setState({
                items: Object.values(this.state.items),
            });
            this.state.items.map((item, index) => {
                this.state.items[index].r_name = this.roomsArray[index+1].r_name;
            });
            this.setState({
                isLoaded: true,
            });
            if (this.state.timerNumber === false){
                clearInterval(timer);
                timer = setInterval(() =>
                    this.tick(), 20000);
                this.setState({
                    timerNumber: true
                })
            }
        }
    }

    ventilate() {
        let request = new XMLHttpRequest();
        let url = domain + 'app/flow?did=10159&rid=53';
        request.open("GET", url, false);
        request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
        request.send();
        // this.setState({isButtonDisabled: true});
        // setTimeout(() => {
        //     this.setState({isButtonDisabled: false});
        // }, 120000)
    }

    getJSON(url) {
        let request = new XMLHttpRequest();
        url = domain + url;
        request.open("GET", url, false);
        request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
        request.send();
        return JSON.parse(request.response);
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <Fragment>
                    <h4>
                    <FontAwesomeIcon icon={faSpinner} spin/>
                        &#160;Загрузка...
                    </h4>
                </Fragment>
            )
        } else
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
                    {this.state.items.map((item, index)=>{
                    return <div className="col-md-6 col-lg-6" key={index}>
                        <Card className="mb-3" >
                            <CardHeader className="card-header-tab">
                                <div className="card-header-title">
                                    {item.r_name}
                                </div>
                            </CardHeader>
                            <CardBody className="pt-2">
                                <Row className="mt-3">
                                    <Col lg="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img style={{marginLeft: '3%'}} className="mr-3" src={Temp} alt='' width="10%"/>
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
                                    <Col lg="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img className="mr-2" src={CO2} alt='' width="15%"/>
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
                                    <Col lg="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img style={{marginLeft: '3%'}} className="mr-3" src={Humidity} alt='' width="10%"/>
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
                                    <Col lg="6">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <img style={{marginLeft: '1%'}} className="mr-2" src={People} alt='' width="15%"/>
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
                            <CardFooter className="pt-3">
                                <ButtonGroup size="md">
                                    <div className="buttons">
                                        <button className="btn-hover ventilate"
                                                onClick={this.ventilate}
                                                disabled={this.state.isButtonDisabled}
                                                key = {index}>
                                            Проветрить
                                        </button>
                                    </div>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </div>
                })}
                </Row>
                </ReactCSSTransitionGroup >
            </Fragment>
        )
    }
}
