import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import ReactDOM from 'react-dom'

import {
    Button, Input,
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
    faCalendarPlus
} from '@fortawesome/free-solid-svg-icons';


const domain = 'https://back.vc-app.ru/';

let scripts = getJSON('app/get_scripts?did=10155');

let cur = scripts['cur'];
print("cur: "+ cur)
let scriptsArray = Object.entries(scripts);
let scriptsArrayLength = scriptsArray.length;
scriptsArray.pop();
//console.log(scriptsArray);


function changeCurScenario(i, curNumber) {
    i.preventDefault();
    let newCurUrl = 'app/set_script?did=10155&sc_id=' + scriptsArray[curNumber][0];
    notify('Сценарий был успешно выбран.');
    getHTTP(newCurUrl);


    //window.location.reload();
}

function getScenarioList(){
    scripts = getJSON('app/get_scripts?did=10155');
    cur = scripts['cur'];
    scriptsArray = Object.entries(scripts);
    scriptsArray.pop();
}


function getCur(number){
    // number - это index
    let curIdIndex;
    if (scriptsArray[number][0] == cur) {
        curIdIndex = number;
    }
    if (curIdIndex === number) {
        return <Input type="radio" name="radio" onClick={(e) => changeCurScenario(e, number)} checked />
    }
    else {
        return <Input type="radio" name="radio" onClick={(e) => changeCurScenario(e, number)} />
    }
}

function getJSON(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, false);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
    return JSON.parse(request.response);
}

function getHTTP(url) {
    let request = new XMLHttpRequest();
    url = domain + url;
    request.open("GET", url, true);
    request.setRequestHeader("Authorization", 'Yandex AgAAAAADcss4AAa-id41yBOKBEgdgHgz7ew8mP4');
    request.send();
}

function deleteScenario(num) {
    function handleClick(e){
        e.preventDefault();
        //print("num:" + num);
        let sc_id = scriptsArray[num][0];
        //print("sc_id:" + sc_id);
        let delUrl = 'app/del_script?did=10155&sc_id=' + sc_id;
        //console.log(domain + delUrl);
        getHTTP(delUrl);
        getScenarioList();
        print("newLength: " + scriptsArray.length);
        scriptsArrayLength = scriptsArray.length;
        //console.log(scriptsArray);
        window.location.reload();
        notify('Сценарий был успешно удалён.');
    }

    return (
        <Button className="mb-2 mr-2" id="del_btn" color="danger"
                onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} size="lg"/>
            {' '}Удалить
        </Button>
    )

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

export default class ScenariosDashboard extends Component {

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(scriptsArray.length !== scriptsArrayLength){
    //         return true
    //     }
    // }

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

                        <Button href="#/createscenario/basic" className="mb-2 mr-2" color="info">
                            <span className="btn-icon-wrapper pr-2 opacity-7">
                                <FontAwesomeIcon icon={faCalendarPlus}/>
                            </span>
                            Добавить сценарий
                        </Button>
                    </ButtonGroup>
                    <ul />

                    {scriptsArray.map((script, index) => {
                        return <div className="col-md-12 col-lg-11" key={index}>
                            <Card className="mb-3" >
                                <CardBody className="pt-3">
                                    <Row>
                                        <div className="col-md-1 col-lg-1">
                                            <FormGroup check>
                                                <Label>
                                                    {getCur(index)}
                                                </Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-5 col-lg-6">
                                            <div className="widget-numbers fsize-3 text-muted">
                                                {scriptsArray[index][1]}
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-lg-5 align-items-baseline">
                                            {deleteScenario(index)}

                                            <Button className="mb-2 mr-2" color="success">
                                                <FontAwesomeIcon icon={faEdit} size="lg"/>
                                                {' '}Редактировать
                                            </Button>
                                        </div>


                                    </Row>

                                </CardBody>
                            </Card>

                        </div>

                    })}


                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
