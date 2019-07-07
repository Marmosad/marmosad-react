import {Card, CardHead, ScoreCard} from "../common/card";
import React from "react";
import styled from "styled-components";

export function ScoreArea(props) {
    console.log(props.score);

    return <ScoreCard>
        <CardHead>Score Board</CardHead>
        {props.score.map(s => {
            return <Score isJudge={(s.isCurrentJudge)}>
                <ScoreText>{s.name}</ScoreText>
                <ScoreText>{s.score}</ScoreText>
            </Score>
        })}
    </ScoreCard>
}

const Score = styled(Card)`
  border-left: ${props => props.isJudge ? 'solid 10px #ff5b5b' : 'solid 10px red'}, 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  margin: 5px;

`;

const ScoreText = styled.div`
  font-size: 20px;
   color: black;
   margin: 5px;
`;