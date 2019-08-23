import {BoardCard, BoardCardColFlex, Card, CardHead} from "../common/card";
import styled from "styled-components";
import React, {useState} from "react";
import {ActionButton} from "../common/buttons";
import {Modal} from "../common/popupModal";
import {PacmanLoader} from "react-spinners";
import {SpinnerText} from "./board";
import {css} from '@emotion/core';
import {Input} from "../common/form/input";
import {Header} from "../common/tabs";

export function PlayArea(props) {
    const [draggedCard, setDraggedCard] = useState(null);
    const [showInviteCode, setShowInviteCode] = useState(false);
    let handleDrag = (e, card) => {
        setDraggedCard(card)
    };

    let handleDrop = (e) => {
        console.log(draggedCard, props.canPlay);
        if (draggedCard && props.canPlay)
            props.submit(draggedCard);
        setDraggedCard(null);
        e.preventDefault();
        e.stopPropagation();
    };

    if (props.ended !== null) {
        return <EndGame victor={props.ended.victor}/>;
    }

    return <React.Fragment>
        {(props.boardLoading || !props.state ? (<Modal show={true}>
            <PacmanLoader css={override}
                          sizeUnit={"px"}
                          size={50}
                          color={'#ff5b5b'}
                          loading={true}/>
            <SpinnerText>Loading our dankest memes...</SpinnerText>
        </Modal>) : (
            <PlayAreaCard>
                <CardHead>Played</CardHead>
                <DropArea onDrop={handleDrop} onDragOver={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <BlackCard>
                        <p>{props.blackCard.body}</p>
                        {props.blackCard.cardPack}{props.blackCard.cardPack ? ": " : ""}{props.blackCard.cardId}
                    </BlackCard>
                    {props.played.map(card => {
                        return (
                            <WhiteCard key={card.key} show={!(card.noDisplay)} onClick={() => {
                                console.log(card);
                                props.judge(card);
                            }}>
                                <p>{card.body}</p>
                                {card.cardPack}: {card.cardId}
                            </WhiteCard>
                        )
                    })}
                </DropArea>
                <CardHead>Hand</CardHead>
                <DropArea>
                    {props.hand.map((card) => {
                        return (
                            <WhiteCard show key={card.key} draggable="true" onDragStart={
                                e => {
                                    e.dataTransfer.setData("text", null);
                                    handleDrag(e, card)
                                }}>
                                <p>{card.body}</p>
                                {card.cardPack}: {card.cardId}
                            </WhiteCard>
                        )
                    })}
                </DropArea>
                <ButtonArea>
                    <ActionButton show onClick={props.start}>Start</ActionButton>
                    <ActionButton show onClick={props.nudge}>Nudge</ActionButton>
                    <ActionButton show onClick={(e) => {
                        setShowInviteCode(true)
                    }}>Invite Code</ActionButton>
                </ButtonArea>
            </PlayAreaCard>
        ))}
        <InviteModal show={showInviteCode} set={setShowInviteCode} code={props.boardId}/>
        <StartGameModal show={props.state === 0} set={setShowInviteCode} code={props.boardId} start={props.start}/>
    </React.Fragment>
}

const InviteModal = (props) => {

    return (
        <Modal show={props.show}>
            <BoardCard>
                <InvitationCodeCopyBox canClose code={props.code} set={props.set}/>
            </BoardCard>
        </Modal>
    );
};

const StartGameModal = (props) => {

    return (
        <Modal show={props.show}>

            <BoardCardColFlex>
                <Header>
                    Invite your friends
                </Header>
                <div>
                    <InvitationCodeCopyBox canClose={false} code={props.code} set={props.set}/>
                    <ActionButton show onClick={props.start}>Start</ActionButton>
                </div>
                <br/>
                I know you still see the Packman loader in the back, it's a feature trust me :')
                <br/>
                <br/>
                This prompt closes when you start, make sure you aren't missing anyone, the game breaks if anyone joins after you start (drunk me didn't handle this error)
            </BoardCardColFlex>
        </Modal>
    );
};

const InvitationCodeCopyBox = (props) => {
    let handleClose = () => {
        props.set(false);
    };
    let invCode = React.createRef();
    return <React.Fragment>
        <Input type={'text'} value={props.code} readOnly ref={invCode} onClick={(e) => {
            invCode.current.select();
            document.execCommand('copy');
            e.target.focus();
        }}/>
        <ActionButton show onClick={(e) => {
            invCode.current.select();
            document.execCommand('copy');
        }}>copy</ActionButton>
        <ActionButton show={props.canClose} onClick={handleClose}>close</ActionButton>
    </React.Fragment>;
};
const EndGame = (props) => {
    return <Modal show={true}>
        <BoardCardColFlex>
           The dankes memer is: {props.victor}
        </BoardCardColFlex>
    </Modal>
};

export const ButtonArea = styled.div`
 justify-content: stretch;
 display: flex;
 flex-direction: row;
`;

export const PlayAreaCard = styled(Card)`
  display: flex;
  flex: 75;
  flex-direction: column;
  justify-content: stretch;
`;

export const DropArea = styled(Card)`
  display: flex;
  justify-content: start;
  flex: 50;
  flex-direction: row;
  border: 0;
  border-radius: 0;
  box-shadow: none;
`;

export const BlackCard = styled(Card)`
  flex: 1;
  background:#3b3e47;
  min-width: 75px;
  min-height: 100px;

  margin: 5px;
`;

export const WhiteCard = styled(Card)`
  flex: 1;
  background:#ff5b5b;
  min-width: 75px;
  min-height: 100px;
 
  margin: 5px;
  visibility: ${props => props.show ? 'visible' : 'hidden'}
`;

const override = css`
    display: block;
    top: 0;
    margin: 90px auto;
`;