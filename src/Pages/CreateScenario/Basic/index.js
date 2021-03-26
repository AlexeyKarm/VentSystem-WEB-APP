import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Slide, toast} from "react-toastify";
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import {
    Button, Input, UncontrolledTooltip,
    Row, Col, Form,
    ButtonGroup, Card,
    CardBody, CardHeader, CardFooter,
    Label, FormGroup,
} from "reactstrap";

import {
    faCalendarAlt, faPlusCircle,
    faKeyboard, faClock,
    faReplyAll, faThermometerThreeQuarters,
    faInbox, faTint, faCloud, faFilter,
    faCalendarCheck, faEdit, faCalendarPlus
} from '@fortawesome/free-solid-svg-icons';

const domain = 'https://back.vc-app.ru/';

let rooms = getJSON('app/rm_config?did=10155');
let roomsArray = Object.values(rooms);
let to_send = { 'did': Number.parseInt(roomsArray.shift(), 10)};
let rIDs = [];
let days = [];
let roomGroup = {};

function getJSON(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
    return JSON.parse(request.response);
}

function notify (text, type) {
    toast(text, {
        transition: Slide,
        closeButton: true,
        autoClose: 2000,
        position: "top-right",
        type: type,

    })
}

function print(text){
    console.log(text)
}

export default class CreateScenario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,

            isCheckedRoom: false,
            isSoundOff: false,
            isEmptyHome: false,
            isTempOff: false,
            isHumOff: false,
            isCloudOff: false,
            isEndDisabled: true,



        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addRow = this.addRow.bind(this);
        this.getHTTP = this.getHTTP.bind(this);
        this.sendScenario = this.sendScenario.bind(this);
    }

    getHTTP(url, body) {
        let request = new XMLHttpRequest();
        url = domain + url;
        request.open("POST", url, false);
        request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(body));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //alert(value);
        const name = target.name;
        this.setState({[name]: value});
    }

    addRow() {
        to_send['name'] = document.getElementById("scName").value;

        //получаем ID выбранных комнат
        for (let index=0; index < roomsArray.length; index++){
            if (document.getElementsByName(roomsArray[index]['rid'])[0].checked){
                rIDs.push(roomsArray[index]['rid']);
            }
        }
        roomGroup['rIDs'] = rIDs;


        //получаем номера выбранных дней
        let dayGroup = {};
        if (this.state.monday === true) days.push(1);
        if (this.state.tuesday === true) days.push(2);
        if (this.state.wednesday === true) days.push(3);
        if (this.state.thursday === true) days.push(4);
        if (this.state.friday === true) days.push(5);
        if (this.state.saturday === true) days.push(6);
        if (this.state.sunday === true) days.push(7);
        dayGroup['days'] = days;

        //получаем выбранные настройки
        let setting = {};
        setting['mute'] = 0;
        setting['time'] = document.getElementById('timeSc').value;
        setting['at_home'] = 1;
        let must_use = [];
        setting['must_use'] = must_use;
        setting['hum'] = Number.parseInt(document.getElementById('humSc').value, 10);
        setting['temp'] = Number.parseInt(document.getElementById('tempSc').value, 10);
        let dont_use = [];
        setting['dont_use'] = dont_use;
        setting['co2'] = Number.parseInt(document.getElementById('co2Sc').value, 10);

        //группируем JSON на отправку
        dayGroup['setting0'] = setting;
        roomGroup['dayGroup0'] = dayGroup;
        to_send['roomGroup0'] = roomGroup;

        print(to_send);
        this.setState({isEndDisabled : false});

    }

    sendScenario() {
        this.getHTTP('app/script', to_send);
        notify('Сценарий успешно создан.', 'success');

    }

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

                    <ButtonGroup size="lg">
                        <div className="buttons">
                            <Form action='#/scenarioslist/basic'>
                                <button  className="btn-hover back">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <FontAwesomeIcon icon={faReplyAll}/>
                                    </span>
                                    Назад
                                </button>
                            </Form>
                        </div>
                    </ButtonGroup>
                    <ul />

                    <div className="col-md-12 col-lg-11">
                        <Card className="mb-3">
                            <CardHeader>
                                <div className="card-header-title">
                                    Задайте желаемые настройки сценария
                                </div>
                            </CardHeader>

                            <CardBody className="pt-3">
                                <Row className="mt-auto" form>
                                    <Col>
                                        <FormGroup>
                                            <Label for="scenarioName">
                                                <FontAwesomeIcon icon={faKeyboard} size="lg"/>{' '}
                                                Введите название сценария
                                            </Label>
                                            <Input type="text" name="scName" id="scName" placeholder="Название"/>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Label>
                                    <FontAwesomeIcon icon={faInbox} size="lg"/>
                                    {' '}Выберите комнаты для создания сценария:
                                </Label>
                                <FormGroup check>
                                    {roomsArray.map((item, index)=>{
                                        return (
                                            <FormGroup key={index} check>
                                                <Label>
                                                <Input type="checkbox"
                                                       name={roomsArray[index]['rid']}
                                                       // checked={this.state.isCheckedRoom}
                                                       // onChange={}
                                                />
                                                {roomsArray[index]['r_name']}</Label>
                                                <ul />
                                            </FormGroup>
                                        )
                                    })}
                                </FormGroup>
                                <div className="divider"/>

                                <Label><FontAwesomeIcon icon={faCalendarAlt} size="lg"/>{' '}Выберите дни недели:</Label>
                                <FormGroup check>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="monday" checked={this.state.monday} onChange={this.handleInputChange}/> ПН
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="tuesday" checked={this.state.tuesday} onChange={this.handleInputChange}/> ВТ
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="wednesday" checked={this.state.wednesday} onChange={this.handleInputChange}/> СР
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="thursday" checked={this.state.thursday} onChange={this.handleInputChange}/> ЧТ
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="friday" checked={this.state.friday} onChange={this.handleInputChange}/> ПТ
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="saturday" checked={this.state.saturday} onChange={this.handleInputChange}/> СБ
                                    </FormGroup></Label>
                                    <Label><FormGroup check inline>
                                            <Input type="checkbox" name="sunday" checked={this.state.sunday} onChange={this.handleInputChange}/> ВС
                                    </FormGroup></Label>
                                </FormGroup>
                                <div className="divider"/>

                                <Label><FontAwesomeIcon icon={faFilter} size="lg"/>{' '}Режимы работы (необязательно):</Label>
                                <FormGroup  check>
                                    <FormGroup  check>
                                        <Label id="isSoundOff">
                                            <Input type="checkbox"
                                                   name="isSoundOff"
                                            />Не беспокоить
                                        </Label>
                                        <UncontrolledTooltip placement="top" className="opacity-9" target={'isSoundOff'} style={{background: '#00BFFF'}}>
                                            Устанавливает бесшумный режим
                                        </UncontrolledTooltip>
                                        <ul />
                                    </FormGroup>
                                    <FormGroup  check>
                                        <Label id="isEmptyHome">
                                            <Input type="checkbox"
                                                   name='isEmptyHome'
                                            />Никого нет дома
                                        </Label>
                                        <UncontrolledTooltip placement="top" className="opacity-9" target={'isEmptyHome'} style={{background: '#00BFFF'}}>
                                            Отключает контроллирование микроклимата
                                        </UncontrolledTooltip>
                                        <ul />
                                    </FormGroup>
                                </FormGroup>
                                <div className="divider"/>

                                <Label>
                                    <FontAwesomeIcon icon={faClock} size="lg" id="timeLabel"/>
                                    {' '}Время начала:&#160;&#160;
                                    <input type="time"
                                           id="timeSc"
                                           className="timeSc"
                                           defaultValue="00:00" />
                                </Label>
                                <ul />

                                <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label>
                                    <FontAwesomeIcon icon={faThermometerThreeQuarters} size="lg" id="tempLabel"/>
                                    {' '}Температура:&#160;&#160;&#160;
                                    <input type="number" min="-10" max="35" defaultValue="0" step="1" id="tempSc"
                                           disabled={this.state.isTempOff}/>&#160;°C
                                </Label>
                                    <Label><FormGroup check inline>
                                        <Input type="checkbox" name="isTempOff" id="isTempOff"
                                               checked={this.state.isTempOff}
                                               onChange={this.handleInputChange}/>
                                        &#160;&#160;Не имеет значения
                                    </FormGroup></Label>
                                </FormGroup>
                                </Form>
                                <ul />

                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label>
                                            <FontAwesomeIcon icon={faTint} size="lg" id="humLabel"/>
                                            &#160;&#160;Влажность:&#160;
                                            <input type="number" min="0" max="100" defaultValue="0" step="1" id="humSc"
                                                   disabled={this.state.isHumOff}/>&#160;%
                                        </Label>
                                        <Label><FormGroup check inline>
                                            <Input type="checkbox" name="isHumOff" id="isHumOff"
                                                   checked={this.state.isHumOff}
                                                   onChange={this.handleInputChange}/> &#160;&#160;Не имеет значения
                                        </FormGroup></Label>
                                    </FormGroup>
                                </Form>
                                <ul />

                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label>
                                            <FontAwesomeIcon icon={faCloud} size="lg" id="cloudLabel"/>
                                            {' '} CO_2 не более:&#160;
                                            <input type="number" min="0" max="999" defaultValue="0" step="1" id="co2Sc"
                                                   disabled={this.state.isCloudOff}/>&#160;ppm
                                        </Label>
                                    </FormGroup>
                                    <Label><FormGroup check inline>
                                        <Input type="checkbox" name="isCloudOff" id="isCloudOff"
                                               checked={this.state.isCloudOff}
                                               onChange={this.handleInputChange}/> &#160;&#160;Не имеет значения
                                    </FormGroup></Label>
                                </Form>
                                <ul />

                                <Button className="mb-2 mr-2" color="info" onClick={this.addRow} >
                                    <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                                    {' '}Добавить
                                </Button>
                            </CardBody>




                            <CardFooter className="d-block text-left">
                                <Button className="mb-2 mr-2" color="success"
                                        href="#/scenarioslist/basic"
                                        onClick={this.sendScenario}
                                        disabled={this.state.isEndDisabled}>
                                    <FontAwesomeIcon icon={faCalendarCheck} size="lg"/>
                                    {' '}Завершить
                                </Button>
                            </CardFooter>
                        </Card>


                    </div>



                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
