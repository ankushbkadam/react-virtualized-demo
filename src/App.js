import * as React from "react";
import "./App.css";
import { faker } from "@faker-js/faker";

function App() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        findAndSetUserList();
    }, []);

    const findAndSetUserList = () => {
        let list = [...Array(100).keys()].map((key) => {
            return {
                id: faker.datatype.uuid(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
            };
        });
        setUsers(list);
    };

    return (
        <div className="App">
            <div className="users">
                {users.map((user) => {
                    return (
                        <div key={user.id} className="user">
                            <div className="username">{user.username}</div>
                            <div className="email">{user.email}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
