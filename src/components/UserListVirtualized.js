import * as React from "react";
//required components from library
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import CellMeasurerCache from "react-virtualized/dist/commonjs/CellMeasurerCache";

//react virtualized styles
import "react-virtualized/styles.css";
import {
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized/dist/commonjs/CellMeasurer";

const UserListVirtualized = ({ users }) => {
    //To have a custom height for each row in the List, we have CellMeasurer and CellMeasurerCache to cache it
    const cache = React.useRef(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 1000,
        })
    );

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            {/**
             * Responsive width and height given to above parent div will be applied to the List using AutoSizer component
             */}
            {users?.length > 0 ? (
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            width={width} //responsive width taken from AutoSizer
                            height={height} //responsive height taken from AutoSizer
                            rowHeight={cache.current.rowHeight} //use rowHeight from cached rowHeight
                            deferredMeasurementCache={cache.current} //specify ref for the row we want rowHeight of
                            rowCount={users.length}
                            rowRenderer={({ key, index, style, parent }) => {
                                let user = users[index];
                                return (
                                    <CellMeasurer
                                        key={key}
                                        cache={cache.current}
                                        parent={parent}
                                        columnIndex={0} //may required to be dynamic in grid/table in this case we are using 0
                                        rowIndex={index}
                                    >
                                        <div style={style}>
                                            <div>
                                                <b>Name: {user.username}</b>
                                            </div>
                                            <div>
                                                <b>Email:</b> {user.email}
                                            </div>
                                            <p>
                                                <b>Description:</b> {user.desc}
                                            </p>
                                        </div>
                                    </CellMeasurer>
                                );
                            }}
                        />
                    )}
                </AutoSizer>
            ) : (
                <div>No users found</div>
            )}
        </div>
    );
};

export default UserListVirtualized;
