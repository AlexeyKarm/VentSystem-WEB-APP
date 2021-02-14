import React, {Fragment} from 'react';

class AppFooter extends React.Component {
    render() {


        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Приложение на Android
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Приложение на IOS
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;
