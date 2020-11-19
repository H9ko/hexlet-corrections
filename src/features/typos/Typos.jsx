import React, { useEffect, useMemo } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from './TableContainer';
import { asyncActionsTypos, selectorTypos } from './typosSlice';

const fakeData = {
  content: [
    {
      createdBy: 'system',
      createdDate: '2020-11-10T09:51:41.781047',
      modifiedBy: 'system',
      modifiedDate: '2020-11-10T09:51:41.781047',
      id: 1,
      pageUrl: 'http://site.com/',
      reporterName: 'reporterName',
      reporterComment: 'reporterComment',
      textBeforeTypo: 'textBeforeTypo',
      textTypo: 'textTypo',
      textAfterTypo: 'textAfterTypo',
      typoStatus: 'REPORTED',
    },
    {
      createdBy: 'system',
      createdDate: '2020-11-10T09:51:43.375775',
      modifiedBy: 'system',
      modifiedDate: '2020-11-10T09:51:43.375775',
      id: 2,
      pageUrl: 'http://site.com/',
      reporterName: 'reporterName',
      reporterComment: 'reporterComment',
      textBeforeTypo: 'textBeforeTypo',
      textTypo: 'textTypo',
      textAfterTypo: 'textAfterTypo',
      typoStatus: 'REPORTED',
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 2,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalPages: 4,
  totalElements: 7,
  size: 2,
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  numberOfElements: 2,
  first: true,
  empty: false,
};
const Typos = () => {
  const dispatch = useDispatch();
  const typos = useSelector(selectorTypos.selectAll);
  const pageSort = useSelector(selectorTypos.selectPageSort);
  const pageSize = useSelector(selectorTypos.selectPageSize);
  const currentPage = useSelector(selectorTypos.selectCurrrentPage);

  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'url',
        accessor: 'pageURL',
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
        accessor: 'reporterName',
      },
    ],
    []
  );
  console.log('Typos -> pageSortpageSize', pageSort, pageSize, currentPage);

  useEffect(() => {
    const asyncEffect = () => {
      dispatch(asyncActionsTypos.getTypos({ pageSort, pageSize, currentPage }));
    };
    asyncEffect();
  }, [pageSort, pageSize, currentPage]);

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={typos}
        controlledPageCount={pageSize}
      />
    </Container>
  );
};

export default Typos;
