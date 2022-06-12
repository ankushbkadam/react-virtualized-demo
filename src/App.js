import * as React from "react";
import "./App.css";
import { faker } from "@faker-js/faker";
import UserList from "./components/UserList";
import UserListVirtualized from "./components/UserListVirtualized";

function App() {
    const [users, setUsers] = React.useState([]);
    const [date, setDate] = React.useState(new Date());

    //generate user list from faker
    React.useEffect(() => {
        let list = [...Array(10000).keys()].map(() => {
            return {
                id: faker.datatype.uuid(),
                username: faker.name.firstName() + " " + faker.name.lastName(),
                email: faker.internet.email(),
                desc:
                    faker.lorem.paragraph() +
                    faker.lorem.paragraph() +
                    faker.lorem.paragraph() +
                    faker.lorem.paragraph(),
            };
        });
        setUsers(list);
    }, []);

    // maintain interval and update date accordingly
    React.useEffect(() => {
        let interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <p>
                <b>{date.toISOString()}</b>
            </p>

            {/* Normal way */}
            {/* <UserList users={users} /> */}

            {/* Using react virtualized library */}
            <UserListVirtualized users={users} />
        </div>
    );
}

export default App;
