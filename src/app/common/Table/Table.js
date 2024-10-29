import React from "react";
import DataTable from "react-data-table-component";
import "../../common/common.css";
import DataNotFound from "../DataNotFound/DataNotFound";

function Table(props) {
  const {
    columns = [],
    data = [],
    style = {},
    fixedHeader = false,
    fixedHeaderScrollHeight,
    progressPending,
    highlightOnHover,
    progressComponent,
    selectableRows,
    title,
    theme = "default",
    pagination = false,
    paginationPerPage = 10,
    paginationRowsPerPageOptions = [5, 10, 15, 20],
    className = "global-data-table",
    onChangePage = () => {},
    onChangeRowsPerPage = () => {},
    onSelectedRowsChange = () => {},
    clearSelectedRows = () => {},
    customStyle = {},
    dataNotFoundMessage = "Your search results were not found.",
  } = props;
  return (
    <div className="global-table-wrapper">
      <DataTable
        style={style}
        title={title}
        theme={theme}
        columns={columns}
        data={data}
        highlightOnHover={highlightOnHover}
        selectableRows={selectableRows}
        fixedHeader={fixedHeader}
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        progressPending={progressPending}
        progressComponent={progressComponent}
        pagination={pagination}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        noDataComponent={
          <DataNotFound dataNotFoundMessage={dataNotFoundMessage} />
        }
        className={className}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onSelectedRowsChange={onSelectedRowsChange}
        clearSelectedRows={clearSelectedRows}
        customStyle={customStyle}
      />
    </div>
  );
}

export default Table;
