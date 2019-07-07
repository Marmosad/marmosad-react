import {CardHead, ChatCard} from "../common/card";
import React, {useState} from "react";
import {ChatInput} from "../common/form/input";
import styled from "styled-components";

export function Chat(props) {
    const chat = props.chat;
    const [input, setInput] = useState();
    const [messages, setMessages] = useState([]);

    function sendChat(e) {
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            chat(input)
        }
    }

    props.handleChat((msg) => {
        console.log(msg);
        setMessages(messages.concat([msg]));
    });

    return (
        <ChatCard>
            <CardHead>Chat</CardHead>
            <ChatMessageContainer>
                {messages.map((msg, i) => {
                    return <ChatMessage key={i} you={msg.you}>{msg.name}: {msg.message}</ChatMessage>
                })}
            </ChatMessageContainer>
            <ChatInput type={'text'} value={input} onChange={e => {
                setInput(e.target.value);
            }} onKeyDown={sendChat}/>
        </ChatCard>
    )
}

export const ChatMessageContainer = styled.div`
    background: white;
    border: none;
    font-size: 20px;  
    color: #3b3e47;
    flex: 8;
    display: flex;
    flex-direction: column;
    justify-content: start;
    overflow: scroll;
`;

export const ChatMessage = styled.div`
  background: ${props => (props.you ? '#ff8e88' : '#3b3e47')};
  color: ${props => (props.you ? '#000000' : '#ffffff')};;
  font-size: 20px;
  height: 22px;
  padding: 1px;
`;

