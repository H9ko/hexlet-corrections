import React, { useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from './TableContainer';
import { asyncActionsTypos, selectorTypos } from './typosSlice';

const Typos = () => {
  const typos = useSelector(selectorTypos.selectAll);

  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'url',
        accessor: 'pageUrl',
      },
      {
        Header: 'createdDate',
        accessor: 'createdDate',
      },
      {
        Header: 'createdBy',
        accessor: 'createdBy',
      },
      {
        Header: 'modifiedDate',
        accessor: 'modifiedDate',
      },
      {
        Header: 'modifiedBy',
        accessor: 'modifiedBy',
      },
      {
        Header: 'status',
        accessor: 'typoStatus',
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={typos} manual />
    </Container>
  );
};

export default Typos;
