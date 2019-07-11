import React from "react"
import * as Firebase from "firebase";

class Formular extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.fetchUsers();

    }
    handleChange(e) {
        this.setState({ username: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.insertUser();
    }
    async fetchUsers() {
        const snapshot = await Firebase.firestore().collection("users").get();
        snapshot.docs.map(doc => console.log(doc.data()));
    }
    async insertUser() {
        await Firebase.firestore().collection("users").add({ username: this.state.username });
        console.log(this.fetchUsers());
    }
    render() {
        return (
            <>
                <h1>Formular</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username: <input type="text" value={this.state.username} onChange={this.handleChange} name="username" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}

export default Formular;