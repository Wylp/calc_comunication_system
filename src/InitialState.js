import {
    Draw,
    AttenuationCable
} from './components.jsx';

const Initial_State = [{
    Symbol:
        <Draw>
            <span>TX</span>
        </Draw>
    ,
    Inputs: [
        {
            type: "Start",
            placeholder: "TX",
            unit_measure: null,
            option: "DBM",
            inputValue: 0,
            has_option: true,
            has_unit_measure: true,
        },
        {
            type: "Signal",
            placeholder: "S/N",
            unit_measure: null,
            option: "DB",
        }
    ]
}, {
    Symbol: <AttenuationCable />,
    Inputs: [
        {
            type: "Att",
            placeholder: "Atenuação",
            option: "DB",
            inputValue: 0
        }
    ]
}, {
    Symbol:
        <Draw>
            Ganho
        </Draw>,
    Inputs: [
        {
            type: "Gain",
            placeholder: "Ganho",
            option: "DB",
            inputValue: 0,
        },
        {
            type: "input",
            placeholder: "P. de Noise",
            option: "w",
            inputValue: 0,
            has_unit_measure: true
        }
    ]
}, {
    Symbol: <AttenuationCable />,
    Inputs: [
        {
            type: "Att",
            placeholder: "Atenuação",
            option: "DB",
            inputValue: 0
        }
    ]
}, {
    Symbol:
        <Draw>
            <span>RX</span>
        </Draw>,
    type: "Final",
    Inputs: [
        {
            type: "input",
            placeholder: "Valor Final",
            unit_measure: null,
            option: "DBM",
            inputValue: 0,
            has_option: true,
            read_only: true,
            has_unit_measure: true,
        }
    ]
}]

export default Initial_State;