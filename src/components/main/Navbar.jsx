import React from "react";
import * as ROUTES from "../../routes/routes";
import SignUpPage from "../../sites/signup/SignUp";
import SignInPage from "../../sites/signin/SignIn";
import PasswordForgetPage from "../../sites/password/PasswordForget";
import TasksPage from "../../sites/tasks/Tasks";
import Octicon, { Pencil, Tasklist, Settings, Home, Bell } from "@primer/octicons-react";
import AdminPage from "../../sites/admin/Admin";
import AccountPage from "../../sites/account/Account";
import KanbanPage from "../../sites/kanban/Kanban";
import KanbanCreatePage from "../../sites/kanban/KanbanCreate";
import KanbanEditPage from "../../sites/kanban/KanbanEdit";
import KanbanDeletePage from "../../sites/kanban/KanbanDelete";
import KanbanSettingsPage from "../../sites/kanban/KanbanSettings";
import FlightsPage from "../../sites/flights/Flights";
import AppointmentsPage from "../../sites/appointments/Appointments";
import CalendarPage from "../../sites/calendar/Calendar";
import ChatPage from "../../sites/chat/Chat";
import NewsPage from "../../sites/news/News";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
export default () => {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>Dashboard</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <LinkContainer to={ROUTES.HOME.LINK}>
                            <Nav.Link><Octicon icon={Home} />{ROUTES.HOME.NAME}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={ROUTES.TASKS.LINK}>
                            <Nav.Link><Octicon icon={Tasklist} />{ROUTES.TASKS.NAME}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={ROUTES.NEWS.LINK}>
                            <Nav.Link><Octicon icon={Bell} />{ROUTES.NEWS.NAME}</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title={ROUTES.KANBAN.NAME}>
                            <LinkContainer to={ROUTES.KANBAN.LINK}>
                                <NavDropdown.Item> <Octicon icon={Tasklist} />{ROUTES.KANBAN.NAME}</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.KANBAN_CREATE.LINK}>
                                <NavDropdown.Item> <Octicon icon={Pencil} />{ROUTES.KANBAN_CREATE.NAME}</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to={ROUTES.KANBAN_DELETE.LINK}>
                                <NavDropdown.Item>{ROUTES.KANBAN_DELETE.NAME}</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to={ROUTES.KANBAN_SETTINGS.LINK}>
                                <NavDropdown.Item><Octicon icon={Settings} />{ROUTES.KANBAN_SETTINGS.NAME}</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <LinkContainer to={ROUTES.SIGN_UP.LINK}>
                            <Nav.Link>{ROUTES.SIGN_UP.NAME}</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route path={ROUTES.TASKS.LINK} component={TasksPage} />
            <Route path={ROUTES.CHAT.LINK} component={ChatPage} />
            <Switch>
                <Route exact path={ROUTES.KANBAN.LINK} component={KanbanPage} />
                <Route path={ROUTES.KANBAN_CREATE.LINK} component={KanbanCreatePage} />
                <Route path={ROUTES.KANBAN_DELETE.LINK} component={KanbanDeletePage} />
                <Route exact path={ROUTES.KANBAN_EDIT.LINK} component={KanbanEditPage} />
                <Route path={ROUTES.KANBAN_SETTINGS.LINK} component={KanbanSettingsPage} />
            </Switch>
            <Route path={ROUTES.NEWS.LINK} component={NewsPage} />
            <Route path={ROUTES.FLIGHTS.LINK} component={FlightsPage} />
            <Route path={ROUTES.CALENDAR.LINK} component={CalendarPage} />
            <Route path={ROUTES.APPOINTMENTS.LINK} component={AppointmentsPage} />
            <Route path={ROUTES.SIGN_UP.LINK} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN.LINK} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET.LINK} component={PasswordForgetPage} />
            <Route path={ROUTES.ACCOUNT.LINK} component={AccountPage} />
            <Route path={ROUTES.ADMIN.LINK} component={AdminPage} />
        </Router>
    );
};
