import {CardHead, ChatCard} from "../common/card";
import React, {useState} from "react";
import {ChatInput} from "../common/form/input";
import styled from "styled-components";

export function Chat(props) {
    const chat = props.chat;
    const [input, setInput] = useState('');

    function sendChat(e) {
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            chat(input);
            setInput('')
        }
    }

    return (
        <ChatCard>
            <CardHead>Chat</CardHead>
            <ChatMessageContainer>
                {props.messages.map((msg, i) => {
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
  color: ${props => (props.you ? '#000000' : '#ffffff')};
 
  font-size: 20px;
  height: 22px;
  padding: 3px;
  margin:  ${props => (props.you ? '5px 5px 5px 30px' : '5px 30px 5px 5px')};;
`;

