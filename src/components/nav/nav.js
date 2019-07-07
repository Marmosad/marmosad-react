import styled from "styled-components";
import React, {useContext} from "react";
import {NavButton} from "../common/buttons";
import {NavTag} from "./navTag";
import {NavText} from "./navText";
import goose from '../../asset/goose.svg'
import {NavIcon} from "./navIcon";
import {DebugContext} from "../board/debug";

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

    return (
        <NavBar className="navBar">
            <NavTag>
                <NavText>Marmosad</NavText> <NavIcon src={goose} className="goose-icon" alt="goose-img"/>
            </NavTag>
            <NavButton onClick={() => {
                props.setDebug(!debug);
                console.log("debug modal", debug);
            }} show={props.curView !== 'lobby'}> Debug </NavButton>
            <NavButton onClick={() => {
                props.setView('lobby')
            }} show={props.curView !== 'lobby'}> Back </NavButton>
        </NavBar>
    )
};
