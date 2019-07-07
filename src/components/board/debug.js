import {ActionButton} from "../common/buttons";
import React, {createContext, useContext, useState} from "react";
import {BoardCard} from "../common/card";
import {Input} from "../common/form/input";
import {Modal} from "../common/popupModal";


export const DebugModal = (props) => {
    const handleClose = () => {
        props.setDebug(false);
    };

    const [debug, setDebug] = useState([]);

    React.useEffect(() => {
        props.socket.connection().onmessage = (e) => {
            setDebug(debug.concat([JSON.stringify(e.data)]));
        }
    });
    const [input, setInput] = useState();
    const handleSend = () => {
        props.socket.send(input);
    };
    return (
        <Modal show={useContext(DebugContext)}>
            <BoardCard>
                <section className="modal-main">
                    <ul>
                        {debug.map((val, i) => {
                            return <li key={i}>{val}</li>
                        })}
                    </ul>
                    <Input type={'text'} value={input} onChange={e => {
                        setInput(e.target.value)
                    }}/>
                    <ActionButton show onClick={handleSend}>send</ActionButton>
                    <ActionButton show onClick={handleClose}>close</ActionButton>
                </section>
            </BoardCard>

        </Modal>
    );
};


export const DebugContext = createContext();
