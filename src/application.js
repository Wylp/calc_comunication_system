import { useMemo, useState } from 'react';

import {
    InputSwitch,
    Column,
    Row,
    Divider,
    DividerBlock
} from './components.jsx';

import {
    translateWToDBM,
    translateDBMToW,
    typeOfCalculation
} from './utils';

import Initial_State from './InitialState';

import Table from './Table';

const Application = () => {

    const [calculationBlocks, setCalculationBlocks] = useState(Initial_State);

    const TableResponse = useMemo(() => {
        const {
            tableData
        } = calculationBlocks.reduce((acc, { Inputs }, index, array_completed) => {

            const is_last_block = array_completed.length - 1 === index;
            if (is_last_block) return acc;

            if (acc.flag_to_calculate === false) return acc;

            const is_first_line = array_completed[index - 1] === undefined;

            if (is_first_line) {

                const [TX_Input, SN_Relation] = Inputs;

                const {
                    option: TX_Option,
                    unit_measure: TX_Unit_Measure,
                    inputValue: TX_Input_Value
                } = TX_Input;

                const {
                    inputValue: SN_Input_Value
                } = SN_Relation;

                const has_all_first_required_info = Number.isFinite(TX_Input_Value) && Number.isFinite(SN_Input_Value);

                if (has_all_first_required_info === false) return Object.assign(acc, { flag_to_calculate: false });

                const has_TX_Unit_Measure = Number.isFinite(TX_Unit_Measure);
                const is_TX_DBM = TX_Option === "DBM";

                const TX_With_Unit_Measure = has_TX_Unit_Measure && !is_TX_DBM ? TX_Input_Value * TX_Unit_Measure : TX_Input_Value;

                const TX_Translated_To_DBM_Value = translateWToDBM[TX_Option](TX_With_Unit_Measure);

                if (Number.isFinite(TX_Translated_To_DBM_Value) === false) return Object.assign(acc, { flag_to_calculate: false });

                acc.tableData.push({
                    stepName: String.fromCharCode(index + 65),
                    signal: TX_Translated_To_DBM_Value.toFixed(2),
                    noise: (TX_Translated_To_DBM_Value - SN_Input_Value).toFixed(2),
                    sn_value: SN_Input_Value.toFixed(2)
                });

                return acc;
            }


            const [DB_Input, Noise_Input] = Inputs;

            const {
                inputValue: DB_Input_Value,
                type: DB_Input_Type,
            } = DB_Input;

            const has_all_required_info = Number.isFinite(DB_Input_Value);

            if (has_all_required_info === false) return Object.assign(acc, { flag_to_calculate: false });

            const has_noise_option = Noise_Input !== undefined;

            const last_inputed_table_data = acc.tableData[acc.tableData.length - 1];

            const {
                signal: last_signal,
                noise: last_noise,
            } = last_inputed_table_data;

            const has_method_to_calculate = typeOfCalculation[DB_Input_Type] !== undefined;

            if (has_method_to_calculate === false) return Object.assign(acc, { flag_to_calculate: false });

            const step_signal = typeOfCalculation[DB_Input_Type](DB_Input_Value, last_signal);
            const step_noise = typeOfCalculation[DB_Input_Type](DB_Input_Value, last_noise);

            if (has_noise_option === false) {
                acc.tableData.push({
                    stepName: String.fromCharCode(index + 65),
                    signal: step_signal.toFixed(2),
                    noise: step_noise.toFixed(2),
                    sn_value: (step_signal - step_noise).toFixed(2)
                });

                return acc;
            }

            const {
                inputValue: Noise_Input_Value,
                unit_measure: Noise_Input_Unit_Measure,
            } = Noise_Input;

            const has_all_noise_required_info = Number.isFinite(Noise_Input_Value);

            if (has_all_noise_required_info === false) return Object.assign(acc, { flag_to_calculate: false });

            const converted_step_noise = translateDBMToW["DBM"](step_noise);

            const real_input_noise_value = !!Noise_Input_Unit_Measure ? Noise_Input_Value * Noise_Input_Unit_Measure : Noise_Input_Value;

            if (real_input_noise_value === 0) {
                acc.tableData.push({
                    stepName: String.fromCharCode(index + 65),
                    signal: step_signal.toFixed(2),
                    noise: step_noise.toFixed(2),
                    sn_value: (step_signal - step_noise).toFixed(2),
                });

                return acc;
            }

            const new_step_noise_in_w = converted_step_noise + real_input_noise_value;

            const new_step_noise_in_dbm = translateWToDBM["w"](new_step_noise_in_w);

            acc.tableData.push({
                stepName: String.fromCharCode(index + 65),
                signal: step_signal.toFixed(2),
                noise: new_step_noise_in_dbm.toFixed(2),
                sn_value: (step_signal - new_step_noise_in_dbm).toFixed(2),
            });

            return acc;
        }, {
            tableData: [],
            flag_to_calculate: true
        });

        return tableData;
    }, [calculationBlocks]);


    const modifyCalculationBlocks = (block_id, input_index, modifications = {}) => {

        const calculationBlockInputsToEdit = calculationBlocks[block_id].Inputs;

        if (calculationBlockInputsToEdit === undefined) return;

        const calculationInputToEdit = calculationBlockInputsToEdit[input_index];

        if (calculationInputToEdit === undefined) return;

        const editedCalculationInput = Object.assign(calculationInputToEdit, {
            ...modifications
        })

        const editedCalculationBlock = Object.assign(calculationBlocks[block_id], {
            Inputs: calculationBlockInputsToEdit.map((input, index) => {
                if (index !== input_index) return input;
                return editedCalculationInput;
            })
        });

        const newCalculationBlocks = calculationBlocks.map((block, index) => {
            if (index !== block_id) return block;
            return editedCalculationBlock;
        });

        setCalculationBlocks(newCalculationBlocks);
    }

    return (
        <Column>
            <Row>
                {
                    calculationBlocks.map(({
                        Inputs,
                        Symbol
                    }, block_index) => {

                        const is_last_block = calculationBlocks.length - 1 === block_index;

                        return (
                            <>
                                <Column key={block_index}>
                                    {Symbol}
                                    {
                                        Inputs.map(({
                                            placeholder,
                                            option: input_option,
                                            read_only,
                                            has_option,
                                            has_unit_measure
                                        }, input_index) => (
                                            <InputSwitch
                                                key={placeholder}
                                                placeholder={placeholder}
                                                onChangeCheckbox={() => {
                                                    const option = input_option === "DBM" ? "w" : "DBM";
                                                    modifyCalculationBlocks(block_index, input_index, { option })
                                                }}
                                                onSelectValue={(selectedOption) => {
                                                    const unit_measure = selectedOption.value;
                                                    modifyCalculationBlocks(block_index, input_index, { unit_measure })
                                                }}
                                                onInputValueChange={(inputValue) => {
                                                    const formmatedInputValue = Number(inputValue);
                                                    modifyCalculationBlocks(block_index, input_index, { inputValue: formmatedInputValue });
                                                }}
                                                option={input_option}
                                                readOnly={read_only}
                                                hasOption={has_option}
                                                hasUnitMeasure={has_unit_measure}
                                            />
                                        ))
                                    }
                                </Column>
                                {
                                    is_last_block === false && 
                                        <DividerBlock 
                                            text={String.fromCharCode(block_index + 65)} 
                                            onClick={() => {
                                                // Todo: Add new block
                                            }}
                                        />
                                }
                            </>
                        )
                    })
                }
            </Row>
            <Row>
                <Divider />
            </Row>
            <Row>
                <Table data={TableResponse} />
            </Row>
        </Column>
    );
}

export default Application;
