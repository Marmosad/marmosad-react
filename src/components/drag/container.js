import React from "react";
import styled from "styled-components";

export function Container(props) {
    let items = {};

    return <ContainerRoot>
        {props.children.map((item) => {
            items[item.props.index] = {
                'dragState': 'settled'
            };
            items[item.props.index]['dragObj'] =
                (<div dragState={items[item.props.index].dragState} draggable={true} onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', null);
                    props.setDragged(item);
                    items[item.props.index].dragState = 'started';
                    console.log(items[item.props.index]);
                }}>{item}</div>);
            return items[item.props.index]['dragObj'];
        })}
    </ContainerRoot>
}

const ContainerRoot = styled.div`
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
`;