import { useState, useEffect, useRef } from "react";
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];


type propTypes = {
  header?: Array<string>,
  rows?:Array<Array<string>>
}

const renderRow = (row) => {
  return <DataTable.Row>
    {row.map((entry) => {
      return <DataTable.Cell>
        {entry}
      </DataTable.Cell>
    })}
  </DataTable.Row>
}

const TableFragment = (props: propTypes) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={{
 
    }}>
      <DataTable.Header>
        {props.header && props.header.map((title) => {return <DataTable.Title> {title} </DataTable.Title>})}
      </DataTable.Header>
      {props.rows && props.rows.map(renderRow)}

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
}

export default TableFragment;