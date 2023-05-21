import styled from 'styled-components';
import Select from 'react-select'
import { useState } from 'react';

const Title = styled.h1(props => ({
    fontSize: "0.8em",
    textAlign: "center",
    color: "white",
    lineHeight: "0.5em",
    ...props.style
}));

const SubTitle = styled.h2(props => ({
    fontSize: "0.5em",
    textAlign: "center",
    color: "white",
    lineHeight: "0.5em",
    marginBottom: "1.5em",
    ...props.style
}));


const ApplicationBody = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
    minHeight: "90vh",
    height: "auto",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
    ...props.style
}));

const ApplicationHeader = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#23262d",
    minHeight: "10vh",
    width: "auto",
    fontSize: "30px",
    color: "white",
    backgroundSize: "cover",
    ...props.style
}));

const Input = styled.input(props => ({
    padding: "0.5em",
    margin: "0.5em",
    color: "black",
    width: "6em",
    background: props?.backgroundColor || "white",
    border: "none",
    borderRadius: "3px",
    ...props.style
}));

const Draw = styled.div(props => ({
    display: "flex",
    fontSize: "1.5em",
    borderRadius: "3px",
    background: "#1A93A4",
    padding: "0.5em",
    width: "5em",
    height: "2em",
    margin: "0.5em",
    textAlign: "center",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    ...props.style
}));

const Text = styled.span(props => ({
    fontSize: "0.5em",
    textTransform: props?.textTransform || "none",
    color: props?.color || "black",
    cursor: props?.cursor || "cursor",
    marginRight: props?.marginRight || "0px",
    padding: "8px",
    backgroundColor: props?.backgroundColor || "white",
    borderRadius: "2px",
    margin: "0 2px",
    ...props.style
}));

const Row = styled.div(props => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...props.style
}));

const Column = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...props.style
}));;

const InputContainer = styled.div(props => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "none",
    padding: "0 8px",
    margin: "0.2em",
    borderRadius: "3px",
    background: props?.background || "#FFF",
    ...props.style
}));

const AttenuationCable = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    width: "6em",
    height: "0.5em",
    padding: "0 8px",
    margin: "2em",
    marginBottom: "3em",
    borderRadius: "3px",
    background: "#FFF",
    ...props.style
}));

const Divider = styled.div(props => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "none",
    width: "50em",
    height: "0.3em",
    padding: "0 8px",
    margin: "1em",
    borderRadius: "3px",
    background: props?.background || "#FFFFFF44",
    ...props.style
}));

const unit_measure_options = [
    {
        label: "p",
        value: 1e-12
    },
    {
        label: "n",
        value: 1e-9
    },
    {
        label: "u",
        value: 1e-6
    },
    {
        label: "m",
        value: 1e-3
    },
    {
        label: "None",
        value: 1
    },
    {
        label: "k",
        value: 1e3
    },
    {
        label: "M",
        value: 1e6
    },
    {
        label: "G",
        value: 1e9
    },
    {
        label: "T",
        value: 1e12
    }
]


const InputSwitch = ({
    onChangeCheckbox = () => { },
    onInputValueChange = () => { },
    onSelectValue = () => { },
    option = "DBM",
    placeholder = "",
    hasUnitMeasure = false,
    readOnly = false,
    hasOption = false
}) => {
    return (
        <InputContainer
            background={readOnly ? "#dadada" : "white"}
        >
            <Input
                backgroundColor={readOnly ? "#dadada" : "white"}
                type="number"
                placeholder={placeholder}
                onChange={(e) => onInputValueChange(e.target.value)}
                readOnly={readOnly}
            />
            {
                hasUnitMeasure && option === "w" &&
                <Select
                    options={unit_measure_options}
                    defaultValue={unit_measure_options[4]}
                    placeholder={unit_measure_options[4].label}
                    onChange={onSelectValue}
                    inputProps={{readOnly: true}}
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            color: state.isSelected ? "#FFF" : "#666",
                            fontSize: "0.5em",
                            fontWeight: "bold",
                            display: "flex"
                        }),
                        control: (provided, state) => ({
                            ...provided,
                            width: "6em",
                            height: "2em",
                            fontSize: "0.4em",
                            fontWeight: "bold",
                            display: "flex"
                        })
                    }}
                />
            }
            {
                hasOption &&
                <Row>
                    <Text
                        onClick={onChangeCheckbox}
                        color={option === "DBM" ? "#FFF" : "#666"}
                        backgroundColor={option === "DBM" ? "#1A93A4" : "#FFF"}
                        fontWeight="bold"
                        marginRight="8px"
                        fontSize="14px"
                        textTransform="uppercase"
                        cursor="pointer">DBM</Text>
                    <Text
                        onClick={onChangeCheckbox}
                        backgroundColor={option === "w" ? "#1A93A4" : "#FFF"}
                        color={option === "w" ? "#FFF" : "#666"}
                        fontWeight="bold"
                        fontSize="14px"
                        textTransform="capitalize"
                        cursor="pointer">w</Text>
                </Row>
            }
            {
                !hasOption &&
                <Text
                    color="#FFF"
                    backgroundColor="#1A93A4"
                    fontWeight="bold"
                    marginRight="8px"
                    fontSize="14px"
                    textTransform="uppercase"
                    cursor="pointer">{
                        option
                    }</Text>
            }
        </InputContainer>
    )
}

const DividerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    width: 1.5em;
    height: 1.5em;
    margin: 0.5em;
    border-radius: 3px;
    background: #FFFFFF44;
    color: white;
    &:hover {
        background: #1a93a4;
    }
`;

const DividerText = styled.span(props => ({
    fontSize: "0.5em",
    textTransform: props?.textTransform || "none",
    cursor: props?.cursor || "cursor",
    marginRight: props?.marginRight || "0px",
    textTransform: "uppercase",
}));

const DividerBlock = ({text = "", onClick = ()=> {}}) => {
    return (
        <DividerContainer
            onClick={onClick}>
            <DividerText>{text}</DividerText>
        </DividerContainer>
    )
}


export {
    Title,
    SubTitle,
    Column,
    Input,
    Draw,
    InputSwitch,
    Row,
    AttenuationCable,
    Divider,
    ApplicationBody,
    ApplicationHeader,
    DividerBlock
}