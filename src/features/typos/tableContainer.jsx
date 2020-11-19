import React from 'react';
import { useDispatch } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { actionsTypos } from './typosSlice';

const TableContainer = ({ columns, data, controlledPageCount }) => {
  console.log('TableContainer -> data', data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // пагинация
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );
  const dispatch = useDispatch();
  const onChangeInSelect = (event) => {
    const pageSizeI = Number(event.target.value);
    // setPageSize(pageSizeI)
    dispatch(actionsTypos.setPageSize(pageSizeI));
  };

  const onChangeInInput = (event) => {
    const pageI = event.target.value ? Number(event.target.value) - 1 : 0;
    // gotoPage(pageI)
    dispatch(actionsTypos.setCurrentPage(pageI));
  };
  return (
    <>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color="primary"
            onClick={() => dispatch(actionsTypos.setCurrentPage(0))}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <CustomInput
            id="CustomInput"
            type="select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {'>'}
            {[3, 5, 10].map((pageSizeI) => (
              <option key={pageSizeI} value={pageSizeI}>
                Show {pageSizeI}
              </option>
            ))}
          </CustomInput>
        </Col>
        <Col md={3}>
          <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button
            color="primary"
            onClick={() => dispatch(actionsTypos.setCurrentPage(pageCount - 1))}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TableContainer;
