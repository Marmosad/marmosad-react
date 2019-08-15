import styled from "styled-components";

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: #ff8e88;
  border: none;
  border-radius: 3px;
  font-size: 20px;  
  color: #3b3e47;
`;

export const ChatInput = styled(Input)`
    margin-top: auto;
    justify-self: flex-end;
    flex: 1;
`;