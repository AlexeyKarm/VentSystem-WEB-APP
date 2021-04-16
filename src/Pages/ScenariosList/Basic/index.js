import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Button, Input, Form,
    ButtonGroup, Row,
    Card, CardBody,
    Label, FormGroup,
} from "reactstrap";

import {
    toast,
    Slide
} from 'react-toastify';

import {
    faTrash,
    faEdit,
    faCalendarPlus, faSpinner
} from '@fortawesome/free-solid-svg-icons';

const domain = 'https://back.vc-app.ru/';
let timer;
let scriptsArray = [];

function getHTTP(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, true);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
}

function deleteScenario(num) {
    function handleClick(e) {
        e.preventDefault();
        let sc_id = scriptsArray[num][0];
        let delUrl = 'app/del_script?did=10155&sc_id=' + sc_id;
        getHTTP(delUrl);
        window.location.reload();
    }

    return (
        <a className="ghost-button-delete" href="#/scenarioslist/basic" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrash} size="lg"/>{' '}Удалить
        </a>
    )
}

function notify (text) {
    toast(text, {
    transition: Slide,
    closeButton: true,
    autoClose: 2000,
    position: "top-right",
    type: 'success'
    })
}

function print(text){
    console.log(text)
}

export default class ScenariosDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            scripts: [],
            cur: 0,
            scriptsArray: [],
            timerNumber: false
        };
        this.tick = this.tick.bind(this);
        this.getJSON = this.getJSON.bind(this);
        this.changeCurScenario = this.changeCurScenario.bind(this);
    };

    componentWillUnmount() {
        clearInterval(timer);
    }

    componentDidMount() {
        timer = setInterval(() =>
            this.tick(), 2000);
    }

    tick(){
        try {
            this.setState({
                scripts: this.getJSON('app/get_scripts?did=10155')})
        } catch (e) {
            console.log('Failed to load...')
        }
        if (this.state.scripts !== []){
            print('Data has been received!');
            this.setState({
                cur: this.state.scripts['cur']
            });
            print('curID: ' + this.state.cur);
            this.setState({
                scriptsArray: Object.entries(this.state.scripts)
            });
            scriptsArray = Object.entries(this.state.scripts);
            this.state.scriptsArray.pop();
            this.setState({
                isLoaded: true,
            });
            if (this.state.timerNumber === false){
                clearInterval(timer);
                timer = setInterval(() =>
                    this.tick(), 10000);
                this.setState({
                    timerNumber: true
                })
            }
        }
    }

    changeCurScenario(i, curNumber) {
        i.preventDefault();
        this.setState({
            cur: this.state.scriptsArray[curNumber][0]
        });
        let newCurUrl = 'app/set_script?did=10155&sc_id=' + scriptsArray[curNumber][0];
        notify( 'Сценарий был успешно выбран');
        getHTTP(newCurUrl);
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

                    <ButtonGroup size="lg">
                        <div className="buttons">
                            <Form action='#/createscenario/basic'>
                                <button  className="btn-hover add_scenario">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <FontAwesomeIcon icon={faCalendarPlus}/>
                                    </span>
                                    Добавить сценарий
                                </button>
                            </Form>
                        </div>
                    </ButtonGroup>
                    <ul />

                    {this.state.scriptsArray.map((script, index) => {
                        if (script[0] == this.state.cur) {
                            return <Label className="col-md-11 col-lg-11" key={index}>
                                <Card className="mb-3" id="ScenariosList"
                                      style={{background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'}}>
                                    <CardBody className="pt-3">
                                        <Row>
                                            <Input type="radio" name="radio"
                                                   onChange={(e) => this.changeCurScenario(e, index)} checked/>
                                            <div className="col-md-5 col-lg-7 pl-4">
                                                <div className="widget-numbers fsize-3 text-muted" id="scriptsName">
                                                    {script[1]}
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-lg-5 ">
                                                {deleteScenario(index)}
                                                <a className="ghost-button-edit" href="#/scenarioslist/basic">
                                                    <FontAwesomeIcon icon={faEdit} size="lg"/>{' '}Редактировать
                                                </a>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>

                            </Label>
                        } else {
                            return <Label className="col-md-11 col-lg-11" key={index}>
                                <Card className="mb-3" id="ScenariosList"
                                      style={{background: '#fff'}}>
                                    <CardBody className="pt-3">
                                        <Row>
                                            <Input type="radio" name="radio"
                                                   onChange={(e) => this.changeCurScenario(e, index)}/>
                                            <div className="col-md-5 col-lg-7 pl-4">
                                                <div className="widget-numbers fsize-3 text-muted" id="scriptsName">
                                                    {script[1]}
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-lg-5">
                                                {deleteScenario(index)}
                                                <a className="ghost-button-edit" href="#/scenarioslist/basic">
                                                    <FontAwesomeIcon icon={faEdit} size="lg"/>{' '}Редактировать
                                                </a>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Label>
                        }
                    })}
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
