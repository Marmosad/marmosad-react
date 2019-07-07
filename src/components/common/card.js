import styled from "styled-components";

export const Card = styled.div`
  overflow: hidden;  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  flex: 1;
  user-select: none;
`;

export const LobbyCard = styled(Card)`
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);


  background: white;
  max-width: 500px;
  min-width: 200px;
  max-height: 700px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const BoardCard = styled(Card)`
  padding: 20px;
  flex: 1;
  background: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-self: stretch;
  justify-self: stretch;
  justify-content: space-between;
`;

export const ScoreCard = styled(Card)`
      flex: 50;
      flex-direction: column;
      justify-content: start;
`;
export const ChatCard = styled(Card)`
    flex-direction: column;
    flex: 50;
    display: flex;
    justify-content: start;
`;
export const CardHead = styled.h2`
    padding: 10px;
    margin: 0;
    color: #ff5b5b;
    background: #3b3e47;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    flex: 1;
    max-height: 30px;
`;