import styled from "styled-components";
import React, {useState, useContext} from "react";
import {ActionButton, NavButton} from "../common/buttons";
import {NavTag} from "./navTag";
import {NavText} from "./navText";
import goose from '../../asset/goose.svg'
import {NavIcon} from "./navIcon";
import {DebugContext} from "../board/debug";
import {Modal} from "../common/popupModal";
import {HelpCard} from "../common/card";
import {Tabs} from "../common/tabs";

export const NavBar = styled.nav`
    min-height: 40px;
    max-height: 80px;
    
    padding: 5px 10px 5px 10px;
    
    width: 100%;
    background: #3b3e47;
    flex: 1;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    box-shadow: 10px 10px 16px -13px rgba(0,0,0,0.75);

`;


export const Nav = (props) => {
    const debug = useContext(DebugContext);
    const [showHelp, setShowHelp] = useState(false);
    return (
        <React.Fragment>
            <NavBar className="navBar">
                <NavTag>
                    <NavText>Marmosad</NavText> <NavIcon src={goose} className="goose-icon" alt="goose-img"/>
                </NavTag>
                <NavButton onClick={() => {
                    props.setDebug(!debug);
                    console.log("debug modal", debug);
                }} show={props.curView !== 'lobby'}> Debug </NavButton>
                <NavButton onClick={() => {
                    setShowHelp(!showHelp)
                }} show={true}> Help </NavButton>
                <NavButton onClick={() => {
                    alert("I'm not implemented :D")
                }} show={true}> About </NavButton>
                <NavButton onClick={() => {
                    props.setView('lobby')
                }} show={props.curView !== 'lobby'}> Back </NavButton>
            </NavBar>
            <Modal show={showHelp}>
                <HelpCard>
                    <Tabs headerText="Help" tabs={['Create', 'Invite', 'Join', 'Play', 'Rules']}>
                        <div>
                            1. Go to the 'Create' tab in 'Lobby' <br/>
                            2. Enter the max number of players allowed in a room. We support 3-6, although you can start with fewer.<br/>
                            3. Leave the card packs field for now, we only support the two default card packs.<br/>
                            4. Give yourself a fun username.<br/>
                            5. Once you've created the room, wait for the board to load, send your friends the Invite Code so they can join.<br/>
                        </div>
                        <div>
                            1. Copy the invite code by either using the copy button or click the text box.<br/>
                            2. Send your friends the code to join.<br/>
                        </div>
                        <div>
                            1. Give yourself a fun username.<br/>
                            2. Paste in the invite code from your friends.<br/>
                        </div>
                        <div>
                            1. The pink highlighted player name on the score board is the judge.<br/>
                            2. If you are the judge, you can click one of the submitted cards to declare them the winner of the round.<br/>
                            3. If you are not the judge, submit a card by clicking and dragging the card up to the submission area.<br/>
                        </div>
                        <div>
                            Have you played Apples to Apples? Cards Against Humanities? It's like that.<br/>
                            <br/>
                            Best enjoyed with a beer, or several.<br/>
                        </div>
                    </Tabs>
                    <ActionButton onClick={() => {
                        setShowHelp(false)
                    }} show={true}>Got it (closes this modal in case you didn't know :D)</ActionButton>
                </HelpCard>
            </Modal>
        </React.Fragment>
    )
};
