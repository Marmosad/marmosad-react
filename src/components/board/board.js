import React, {useState} from "react";
import {Socket} from "./socket";
import {BoardCard} from "../common/card";
import styled from "styled-components";
import {DebugModal} from "./debug";
import {Chat} from "./chat";
import {PlayArea} from "./playArea";
import {Modal} from "../common/popupModal";
import {PacmanLoader} from "react-spinners";
import {css} from '@emotion/core';
import {Score, ScoreArea} from "./score";


export function Board(props) {
    // this bit of code for socket is lazy init, which runs once on construction but not rerender
    let [socket,] = useState(() => {
        const initialState = new Socket(props.url, props.boardId, props.name);
        return initialState;
    });

    const [hand, setHand] = useState([]);
    const [isJudge, setIsJudge] = useState(false);
    const [played, setplayed] = useState([]);
    const [blackCard, setBlackCard] = useState({});
    const [loading, setLoading] = useState(true);
    const [boardLoading, setBoardLoading] = useState(true);
    const [score, setScore] = useState([]);
    React.useEffect(() => {
        socket.connection().onmessage = (e) => {
            setTimeout(socket.nudge, 8000);
            const update = JSON.parse(e.data);
            console.log("update: ", update);

            if (update.gameEvent === "update") {
                const fill = 6 - update.display.whiteCards.length;
                setplayed(update.display.whiteCards.concat(new Array(fill).fill({"noDisplay": true})));
                setIsJudge(update.currentJudge);
                setHand(update.hand);
                setBlackCard(update.display.blackCard);
                setScore(update.display.score);
                setBoardLoading(false)
            }

            if (update.gameEvent === 'loading') {
                setBoardLoading(true);
            }
            else if (update.gameEvent === 'loaded') {
                setBoardLoading(false)
            }
        }
    });
    // loading spinner state
    React.useEffect(() => {
        socket.connection().addEventListener('open', () => {
            setLoading(false)
        });
    });

    // attempt to always properly close socket
    React.useEffect(() => {
        window.addEventListener('beforeunload', () => {
            this.state.socket.leave();
        });
    });


    return (loading ?
        (<Modal show={true}>
            <PacmanLoader css={override}
                          sizeUnit={"px"}
                          size={50}
                          color={'#ff5b5b'}
                          loading={loading}/>
            <SpinnerText>Loading our dankest memes...</SpinnerText>
        </Modal>) : (
            <BoardCard>
                <ChatScoreDiv>
                    <ScoreArea score={score}/>
                    <SpacerDiv/>
                    <Chat chat={socket.chat} handleChat={socket.handleChat}/>
                </ChatScoreDiv>
                <SpacerDiv/>
                <PlayArea hand={hand.map((card, i) => {
                    card.key = i;
                    return card
                })} played={played} blackCard={blackCard} start={socket.start} nudge={socket.nudge}
                          submit={socket.submit} judge={socket.judge} boardLoading={boardLoading}
                          boardId={props.boardId} canPlay={!isJudge}/>
                <DebugModal setDebug={props.setDebug} socket={socket}/>
            </BoardCard>
        ))
}


export const ChatScoreDiv = styled.div`
    max-width: 450px;
    min-width: 250px;
    flex: 25; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const SpacerDiv = styled.div`
    max-width: 40px;
    min-width: 20px;
    max-height: 40px;
    min-height: 20px;
    background: transparent;
    flex: 1;
    flex-direction: column;
    justify-content: stretch; 
`;
export const SpinnerText = styled.h1`
    font-size: 40px;
    min-font-size: 36px;
    max-font-size: 70px;
    color: #ff5b5b;
    bottom: 0;
    display: block;
    margin-top: 20px;
`;


const override = css`
    display: block;
    top: 0;
    margin: 90px auto;
`;

