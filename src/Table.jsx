import { useMemo } from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 10px;

        tr {
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            border-radius: 10px;

            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.8rem;            
            font-size: 0.6em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);

            :last-child {
                border-right: 0;
            }
        }
    }
`

const Table = ({ data }) => {

    const columns = useMemo(
        () => [
            {
                Header: 'Resposta do Sistema',
                columns: [
                    {
                        Header: 'Label',
                        accessor: 'stepName',
                    },
                    {
                        Header: 'Sinal',
                        accessor: 'signal',
                    },
                    {
                        Header: 'Ruído',
                        accessor: 'noise',
                    },
                    {
                        Header: 'S/N',
                        accessor: 'sn_value',
                    }
                ],
            }
        ],
        []
    );

    // const getCellValue = (e, j) => {
    //     console.log({
    //         row: e.row
    //     });
    //     e.row.allCells[j].value = "teste";
    // };

    // To do: add a function to edit the cell value when clicked

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <Styles>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, j) => {
                                    return (
                                    <td
                                        onClick={() => getCellValue(cell,j)} 
                                        {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Styles>
    )
}

export default Table;