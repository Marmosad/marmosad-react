import styled from "styled-components";

export const Modal = styled.div`
    position:fixed;
    color: #3b3e47;
    width: auto;
    height: auto;
    top:50%;
    left:50%;
    padding: 50px;
    transform: translate(-50%,-50%);
    background: transparent;
    display: ${props => props.show ? 'block' : 'none'}
    visibility: ${props => props.show ? 'visible' : 'hidden'}
    user-select: text;
`;