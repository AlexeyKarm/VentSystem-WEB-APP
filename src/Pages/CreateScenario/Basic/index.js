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
    faEdit,
    faReplyAll,
    faSave,
    faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

let text = 'Default';


function notify (text) {
    toast(text, {
        transition: Slide,
        closeButton: true,
        autoClose: 2000,
        position: "top-right",
        type: 'warning',

    })
}



export default class CreateScenario extends Component {
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
                                    <Col md-auto lg-auto>
                                        <FormGroup>
                                            <Label for="scenarioName">Введите название сценария</Label>
                                            <Input type="scenario" name="scenario" id="scenarioName"
                                                   placeholder="Название"/>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Label for="scenarioName">Выберите дни недели</Label>
                                <Form>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> ПН
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> ВТ
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> СР
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> ЧТ
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> ПТ
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> СБ
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox"/> ВС
                                        </Label>
                                    </FormGroup>
                                </Form>
                            </CardBody>




                            <CardFooter className="d-block text-left">
                                <Button className="mb-2 mr-2" color="success">
                                    <FontAwesomeIcon icon={faCalendarCheck} size="lg"/>
                                    {' '}Сохранить
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>



                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
