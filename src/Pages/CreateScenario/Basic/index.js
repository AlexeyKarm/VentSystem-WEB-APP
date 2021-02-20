import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Slide, toast} from "react-toastify";
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import {
    Button, Input,
    Row, Col, Form,
    ButtonGroup, Card,
    CardBody, CardHeader, CardFooter,
    Label, FormGroup,
} from "reactstrap";

import {
    faCalendarAlt,
    faKeyboard,
    faReplyAll,
    faInbox,
    faCalendarCheck, faEdit
} from '@fortawesome/free-solid-svg-icons';




const domain = 'https://back.vc-app.ru/';

let rooms = getJSON('app/rm_config?did=10155');
let roomsArray = Object.values(rooms);
let to_send = { 'did': roomsArray[0]};
roomsArray.shift();
print(roomsArray);
console.log(roomsArray[1]['r_name']);


function getJSON(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
    return JSON.parse(request.response);
}

function notify (text) {
    toast(text, {
        transition: Slide,
        closeButton: true,
        autoClose: 2000,
        position: "top-right",
        type: 'warning',

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





        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
                        <Button href="#/scenarioslist/basic" className="mb-2 mr-2" color="info">
                            <span className="btn-icon-wrapper pr-2 opacity-7">
                                <FontAwesomeIcon icon={faReplyAll}/>
                            </span>
                            Назад
                        </Button>
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
                                                Введите название сценария</Label>
                                            <Input type="text" name="scName" id="scName" placeholder="Название"/>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Label><FontAwesomeIcon icon={faInbox} size="lg"/>{' '}Выберите комнаты для создания сценария:</Label>
                                <FormGroup check>
                                    {roomsArray.map((item, index)=>{
                                        return (
                                            <FormGroup check>

                                                <Input type="checkbox" name={roomsArray[index]['rid']} />{roomsArray[index]['r_name']}

                                            </FormGroup>
                                        )
                                    })}
                                </FormGroup>
                                <ul />

                                <Label><FontAwesomeIcon icon={faCalendarAlt} size="lg"/>{' '}Выберите дни недели:</Label>
                                <FormGroup check>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="monday" checked={this.state.monday} onChange={this.handleInputChange}/> ПН
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="tuesday" checked={this.state.tuesday} onChange={this.handleInputChange}/> ВТ
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="wednesday" checked={this.state.wednesday} onChange={this.handleInputChange}/> СР
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="thursday" checked={this.state.thursday} onChange={this.handleInputChange}/> ЧТ
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="friday" checked={this.state.friday} onChange={this.handleInputChange}/> ПТ
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="saturday" checked={this.state.saturday} onChange={this.handleInputChange}/> СБ
                                    </FormGroup>
                                    <FormGroup check inline>
                                            <Input type="checkbox" name="sunday" checked={this.state.sunday} onChange={this.handleInputChange}/> ВС
                                    </FormGroup>
                                </FormGroup>

                                <td><table >

                                        <button type="button" id="ins" name="btn" >Добавить </button></table>
                                </td>

                    <table bgcolor="#f7f7f7" cellspacing="5%" cellpadding="5%" border="2" bordercolor="#ffffff" id="set_inp">
                        <tr class="tr1"><th class="td1">Время начала</th> <th class="td1">Температура</th><th class="td1">Влажность</th><th class="td1">СO2</th><th class="td1"></th></tr>
                    </table>
                            </CardBody>




                            <CardFooter className="d-block text-left">
                                <Button className="mb-2 mr-2" color="success">
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
