import React from "react";
import {ActionButton} from "../buttons";
import {Input} from "./input";
import styled from "styled-components";

export function Form(props) {
    //sets default values to name
    const [formVal, setFormVal] = React.useState(props.children.map((input) => {
        return input.props.type === 'number' ? parseInt(input.props.name) : input.props.name
    }));

    //resets default values when switching between forms. This is only useful when using within the tabs.
    React.useEffect(() => {
        setFormVal(props.children.map((input) => {
            return input.props.type === 'number' ? parseInt(input.props.name) : input.props.name
        }));

    }, [props.className, props.children]);


    function handleChange(e, i) {
        e.preventDefault();
        const values = [...formVal];
        const target = e.target;
        values[i] = (target.type === 'number' ? parseInt(target.value) : target.value.trim());
        setFormVal(values);
    }

    return (
        <FormDiv>
            {
                props.children.map((input, index) => {
                    const {name, value, ...passProp} = input.props;
                    return <Input className={props.className} value={formVal[index]} key={name} {...passProp}
                                  onChange={e => {
                                      handleChange(e, index)
                                  }}/>;
                })}
            <ActionButton onClick={() => {
                let form = {};
                props.children.map((val, index) => {
                    form[val.props.formName] = formVal[index];
                });
                props.handleSubmit(form)
            }} show> {props.submitionName} </ActionButton>
        </FormDiv>
    )
}

const FormDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;                 
`;
