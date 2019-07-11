import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Error from "../../components/main/Error";
import { KanbanLoader } from "../../components/main/Loader";
import { timeAgo } from "../../Help";
import { KANBAN, KANBAN_DELETE, KANBAN_INSERT, KANBAN_GET } from "../../api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ContextMenuWrapper, prepareContextMenuHandlers } from "react-context-menu-wrapper";
import Octicon, { Trashcan, Plus, Clippy } from "@primer/octicons-react";
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: 0,
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});
const Task = (props) => {
    return (
        <ListGroup.Item>
            <div>
                <h5 onClick={props.onClickHandler}>{props.summary}</h5>
            </div>
            <hr />
            <p title={props.description}>{props.description}</p>
            <span className="time" title={new Date(props.created).toLocaleString()}>{timeAgo(props.created)}</span>
        </ListGroup.Item>
    );
};

const OptionsContextMenu = (props) => {
    return (
        <div className="react-context-menu">
            <div className="react-context-menu__item">
                <div className="react-context-menu__item__content" onClick={props.onDeleteClickHandler}>
                    <span><Octicon icon={Trashcan} /></span> Delete
                </div>
                <div className="react-context-menu__item__content" onClick={props.onMoveClickHandler}>
                    <span><Octicon icon={Clippy} /></span> Move
                </div>
            </div>
            <hr className="react-context-menu__seperator" />
            <div className="react-context-menu__item">
                <div className="react-context-menu__item__content" onClick={props.onCloneClickHandler}>
                    <span><Octicon icon={Plus} /></span> Clone
                </div>
            </div>
        </div>
    );
};
export default class Kanban extends React.Component {
    state = {
        todo: [],
        inProgress: [],
        done: [],
        loaded: false,
        error: {
            error: false,
            errMessage: null,
            status: 1
        }
    };
    todoContextMenuHandler = prepareContextMenuHandlers({ id: "todo-context-menu" });
    inProgressContextMenuHandler = prepareContextMenuHandlers({ id: "in-progress-context-menu" });
    doneContextMenuHandler = prepareContextMenuHandlers({ id: "done-context-menu" });
    areas = {
        todo: "drop-to-do",
        inProgress: "drop-in-progress",
        done: "drop-done"
    };
    componentDidMount() {
        this.fetchKanbans();
    }
    delete = async (item) => {
        try {
            await KANBAN_DELETE(item.id);
            const status = item.currentStatus === "1" ? "todo" : (item.currentStatus === "2") ? "inProgress" : "done";
            const newList = this.state[status].filter((entry) => entry.id !== item.id);
            this.setState({ [status]: newList });
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    clone = async (item) => {
        if (item.id) delete item.id;
        try {
            const docRef = await KANBAN_INSERT(item);
            const kanban = await KANBAN_GET(docRef.id);
            const area = kanban.data().currentStatus;
            const status = area === "1" ? "todo" : (area === "2") ? "inProgress" : "done";
            const doc = kanban.data();
            doc["id"] = docRef.id;
            this.setState({ [status]: [...this.state[status], doc] }, () => console.log(this.state));

        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    fetchKanbans = async () => {
        try {
            const snapshot = await KANBAN.get();
            const todo = [];
            const inProgress = [];
            const done = [];
            snapshot.docs.forEach(doc => {
                let task = doc.data();
                const id = doc.id;
                task["id"] = id;
                if (task.currentStatus === "2") {
                    inProgress.push(task);
                } else if (task.currentStatus === "3") {
                    done.push(task);
                } else {
                    todo.push(task);
                }
            });
            this.setState({ todo, inProgress, done, loaded: true });
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        const id = result.draggableId;
        const from = source.droppableId === "drop-to-do" ? "todo" : (source.droppableId === "drop-in-progress") ? "inProgress" : "done";
        const to = destination.droppableId === "drop-to-do" ? "todo" : (destination.droppableId === "drop-in-progress") ? "inProgress" : "done";

        if (source.droppableId !== destination.droppableId) {
            // different list
            const dropId = destination.droppableId;
            let area = dropId === this.areas.todo ? "1" : (dropId === this.areas.inProgress) ? "2" : "3";
            this.updateKanban(id, area);
            this.move(id, from, to, destination.index);
        } else {
            // same list
            const reorder = (list, startIndex, endIndex) => {
                const result = Array.from(list);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);

                return result;
            };
            const items = reorder(this.state[to], source.index, destination.index);
            this.setState({ [to]: items });
        }
    };
    updateKanban = async (id, area) => {
        try {
            await KANBAN.doc(id).update({ "currentStatus": area })
        } catch (err) {
            this.setState({ error: { error: true, errMessage: err, status: 3 } }, () => console.warn(err));
        }
    }
    move = (id, from, to, indexTo) => {
        const currentArea = this.state[from];
        const task = currentArea.filter(task => task.id === id);
        const withoutTask = currentArea.filter(tasks => tasks.id !== id);
        const toArea = this.state[to];
        toArea.splice(indexTo, 0, task[0]);
        this.setState({ [from]: withoutTask, [to]: toArea }, () => console.log(this.state));
    };
    openKanbanHandler = (id) => {
        this.props.history.push("/kanban/" + id);
    }
    render() {
        if (!this.state.loaded) {
            return <KanbanLoader />
        } else if (this.state.error.error) {
            return <Error {...this.state.error} />
        }
        return (
            <Container fluid>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Row>
                        <Col className="mb">
                            <h3 className="text-center">To Do</h3>
                            <Droppable droppableId={this.areas.todo}>
                                {(provided, snapshot) => (
                                    <div
                                        className="drop-area"
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.todo.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="drag-outer"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )} {...this.todoContextMenuHandler}
                                                    >
                                                        <Task {...item} onClickHandler={() => this.openKanbanHandler(item.id)} />
                                                        <ContextMenuWrapper id="todo-context-menu">
                                                            <OptionsContextMenu onDeleteClickHandler={() => this.delete(item)} onCloneClickHandler={() => this.clone(item)} />
                                                        </ContextMenuWrapper>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Col>
                        <Col className="mb">
                            <h3 className="text-center">In Progress</h3>
                            <Droppable droppableId={this.areas.inProgress}>
                                {(provided, snapshot) => (
                                    <div
                                        className="drop-area"
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.inProgress.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="drag-outer"
                                                        id={item.id}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        {...this.inProgressContextMenuHandler}
                                                    >
                                                        <Task {...item} onClickHandler={() => this.openKanbanHandler(item.id)} />
                                                        <ContextMenuWrapper id="in-progress-context-menu">
                                                            <OptionsContextMenu onDeleteClickHandler={() => this.delete(item)} onCloneClickHandler={() => this.clone(item)} />
                                                        </ContextMenuWrapper>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Col>
                        <Col className="mb">
                            <h3 className="text-center">Done</h3>
                            <Droppable droppableId={this.areas.done}>
                                {(provided, snapshot) => (
                                    <div
                                        className="drop-area"
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.done.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="drag-outer"
                                                        id={item.id}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        {...this.doneContextMenuHandler}
                                                    >
                                                        <Task {...item} onClickHandler={() => this.openKanbanHandler(item.id)} />
                                                        <ContextMenuWrapper id="done-context-menu">
                                                            <OptionsContextMenu onDeleteClickHandler={() => this.delete(item)} onCloneClickHandler={() => this.clone(item)} />
                                                        </ContextMenuWrapper>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Col>
                    </Row>
                </DragDropContext>
            </Container>
        );
    }
}