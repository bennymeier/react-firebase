import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { KANBAN_INSERT } from "../../api";
import "@material/react-snackbar/dist/snackbar.css";
import { Snackbar } from "@material/react-snackbar";
export default class KanbanCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attachment: "",
            created: false,
            currentStatus: "1",
            description: "",
            issuetype: "1",
            summary: "",
            priority: "3",
        };
        this.defaults = {
            attachment: "",
            currentStatus: "1",
            description: "",
            issuetype: "1",
            summary: "",
            priority: "3",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async handleSubmit(e) {
        e.preventDefault();
        const task = this.state;
        task["created"] = new Date().getTime();
        await KANBAN_INSERT(this.state);
        this.setState({ created: true }, () => this.clearFields());
    }
    clearFields() {
        this.setState({ ...this.defaults }, () => console.log(this.state));
    }
    render() {
        return (
            <>
                <Container>
                    <h3 className="text-center">Create Task</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="issuetype">
                                <Form.Label>Issue Type</Form.Label>
                                <Form.Control as="select" name="issuetype" onChange={this.handleChange} value={this.state.issuetype}>
                                    <option value="1">Exercise</option>
                                    <option value="2">Story</option>
                                    <option value="3">Bug</option>
                                    <option value="4">Test</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control as="select" name="priority" onChange={this.handleChange} value={this.state.priority}>
                                    <option value="1">Highest</option>
                                    <option value="2">High</option>
                                    <option value="3">Medium</option>
                                    <option value="4">Low</option>
                                    <option value="5">Lowest</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="currentStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" name="currentStatus" onChange={this.handleChange} value={this.state.currentStatus}>
                                    <option value="1">To Do</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Done</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="summary">
                            <Form.Label>Summary*</Form.Label>
                            <Form.Control type="text" name="summary" required={true} onChange={this.handleChange} value={this.state.summary} placeholder="Summary" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description*</Form.Label>
                            <Form.Control as="textarea" name="description" required={true} onChange={this.handleChange} value={this.state.description} placeholder="Description" />
                        </Form.Group>
                        <Form.Group controlId="attachment">
                            <Form.Label>Attachment</Form.Label>
                            <Form.Control type="file" name="attachment" onChange={this.handleChange} value={this.state.attachment} placeholder="Attachment" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form>
                </Container>
                {this.state.created && <Snackbar message="Task successfully created! 😎" onClose={() => this.setState({ created: false })} />}
            </>
        );
    }
}