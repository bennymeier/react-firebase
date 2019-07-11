import React from "react";
import { Button, Modal, Form, Col, Row, Container } from "react-bootstrap";
import { KANBAN, KANBAN_DELETE } from "../../api";
import Octicon, { Trashcan } from "@primer/octicons-react";
import Error from "../../components/main/Error";
import { KanbanEditLoader } from "../../components/main/Loader";
export default class KanbanEdit extends React.Component {
    state = {
        kanban: {},
        changed: false,
        loaded: false,
        error: {
            error: false,
            errMessage: null,
            status: null,
        },
        showConfirm: false
    };
    componentDidMount() {
        if (this.props.match.params.id) {
            this.getKanban(this.props.match.params.id);
        }
    }
    getKanban = async (id) => {
        try {
            const doc = await KANBAN.doc(id).get();
            if (doc.exists) {
                this.setState({ kanban: { ...doc.data() } }, () => this.setState({ loaded: true }));
            } else {
                this.setState({ error: { error: true, errMessage: "No such document!", status: 2 } }, () => console.warn(this.state));
            }
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    handleChange = (e) => {
        this.setState({ kanban: { ...this.state.kanban, [e.target.name]: e.target.value }, changed: true });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await KANBAN.doc(this.props.match.params.id).update(this.state.kanban)
            this.setState({ changed: false });
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    handleDelete = async () => {
        try {
            await KANBAN_DELETE(this.props.match.params.id);
            this.props.history.push("/kanban");
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    render() {
        if (!this.state.loaded && !this.state.error.error) {
            return <KanbanEditLoader />
        } else if (this.state.error.error) {
            return <Error {...this.state.error} />;
        }
        return (
            <>
                <Container>
                    <h3 className="text-center">Edit Kanban</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Form.Group as={Col} xs="12" md="12" lg="6" controlId="summary">
                                <Form.Label>Summary</Form.Label>
                                <Form.Control placeholder="Summary" name="summary" onChange={this.handleChange} value={this.state.kanban.summary} />
                            </Form.Group>
                            <Form.Group as={Col} xs="12" md="12" lg="6" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="4" placeholder="Description" name="description" onChange={this.handleChange} value={this.state.kanban.description} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="issuetype">
                                <Form.Label>Issue Type</Form.Label>
                                <Form.Control as="select" name="issuetype" onChange={this.handleChange} value={this.state.kanban.issuetype}>
                                    <option value="1">Exercise</option>
                                    <option value="2">Story</option>
                                    <option value="3">Bug</option>
                                    <option value="4">Test</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control as="select" name="priority" onChange={this.handleChange} value={this.state.kanban.priority}>
                                    <option value="1">Highest</option>
                                    <option value="2">High</option>
                                    <option value="3">Medium</option>
                                    <option value="4">Low</option>
                                    <option value="5">Lowest</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="currentStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" name="currentStatus" onChange={this.handleChange} value={this.state.kanban.currentStatus}>
                                    <option value="1">To Do</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Done</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" size="lg" disabled={!this.state.changed}>
                                    Submit
                        </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="danger" size="lg" onClick={() => this.setState({ showConfirm: true })}>
                                    Delete
                        </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                {this.state.showConfirm && <Modal animation={true} size="sm" show={this.state.showConfirm} onHide={() => this.setState({ showConfirm: false })}>
                    <Modal.Body as="h5" className="text-center">Are you sure to delete this entry?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showConfirm: false })}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            <Octicon icon={Trashcan} /> Confirm delete
                        </Button>
                    </Modal.Footer>
                </Modal>}
            </>
        );
    }
}