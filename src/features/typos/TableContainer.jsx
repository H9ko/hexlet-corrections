/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { range } from 'ramda';
import { Table, Pagination, Form } from 'react-bootstrap';
import { asyncActionsTypos, selectorTypos } from './typosSlice';

const getRange = (begin, end) => range(begin, end + 1);
const getPages = (currentPage, totalPage) => {
  const firstPage = 1;
  const lastPage = totalPage;
  const neighbours = 2;
  const maxAvaliblePages = neighbours * 2 + 1;
  if (totalPage < maxAvaliblePages) {
    return range(firstPage, totalPage + 1);
  }

  const isLeftVisible = firstPage + neighbours < currentPage;
  const isRightVisible = currentPage < totalPage - neighbours;
  if (!isLeftVisible && isRightVisible) {
    return [...getRange(1, maxAvaliblePages), '>>', lastPage];
  }
  if (isLeftVisible && !isRightVisible) {
    return [firstPage, '<<', ...getRange(currentPage - neighbours, totalPage)];
  }
  return [
    firstPage,
    '<<',
    ...getRange(currentPage - neighbours, currentPage + neighbours),
    '>>',
    lastPage,
  ];
};
const TableContainer = ({ columns, data }) => {
  console.log('TableContainer -> data', data);
  const controlledPageCount = useSelector(selectorTypos.selectTotalPages);
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
      initialState: { pageIndex: 1, pageSize: 2 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(asyncActionsTypos.getTypos({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);
  console.log('TableContainer -> pageIndex', pageIndex);
  console.log('TableContainer -> pageCount', pageCount);

  const handleGoToPage = (selectPage) => () => {
    gotoPage(selectPage);
  };
  console.log('pageOptions', pageOptions);

  return (
    <>
      <Table
        bordered
        hover
        onPageChange={() => console.log('1122YAY)')}
        {...getTableProps()}
      >
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
      <nav className="d-flex">
        <Form.Control
          as="select"
          value={pageSize}
          className="w-25"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[1, 2, 3, 10].map((pageSizeI) => (
            <option key={pageSizeI} value={pageSizeI}>
              Show {pageSizeI}
            </option>
          ))}
        </Form.Control>
        <Pagination className=" ml-auto justify-content-center">
          <Pagination.First
            onClick={handleGoToPage(0)}
            disabled={!canPreviousPage}
          />
          <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
          {getPages(pageIndex, pageCount).map((pageI) => {
            switch (true) {
              case pageI === '<<':
                return (
                  <Pagination.Ellipsis
                    key={pageI}
                    onClick={handleGoToPage(pageIndex - 2)}
                  />
                );
              case pageI === '>>':
                return (
                  <Pagination.Ellipsis
                    key={pageI}
                    onClick={handleGoToPage(pageIndex + 2)}
                  />
                );
              default:
                return (
                  <Pagination.Item
                    key={pageI}
                    active={pageIndex === pageI - 1}
                    onClick={handleGoToPage(pageI - 1)}
                  >
                    {pageI}
                  </Pagination.Item>
                );
            }
          })}

          {/* <Pagination.Ellipsis /> */}
          <Pagination.Next onClick={nextPage} disabled={!canNextPage} />
          <Pagination.Last
            onClick={handleGoToPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </Pagination>
      </nav>
    </>
  );
};

export default TableContainer;
