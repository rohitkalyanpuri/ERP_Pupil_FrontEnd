import React, { useState } from "react";
import { ParentProps } from "../../types/types";
//import { formatDate } from "../../utils/commonHelper";
import { Col, Row, Button } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector, useDispatch } from "react-redux";
import { importParent } from "../../slices/Parents/thunk";
import { currentTenant } from "../../constants/tenant";
interface ParentListProps {
  parents: Array<ParentProps>;
}
const ParentImportView = ({ parents }: ParentListProps) => {
  const { loading } = useSelector((state: any) => ({
    loading: state.parent.loading,
  }));
  const dispatch = useDispatch();
  const [parentsList, setParentsList] = useState<ParentProps[]>(parents);
  //console.log(parents);
  const parentListColumns = [
    {
      text: "First Name",
      dataField: "FirstName",
      sort: true,
    },
    {
      text: "Last Name",
      dataField: "LastName",
      sort: true,
    },
    {
      dataField: "Email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "DOB",
      text: "DOB",
      sort: true,
      // formatter: (cellContent: any, parent: ParentProps) =>
      //   parent.dob ? formatDate(new Date(parent.dob), "mm/dd/yyyy") : "",
    },
    {
      text: "Mobile",
      dataField: "Mobile",
      sort: true,
    },
  ];
  const pageOptions = {
    sizePerPage: 10,
    totalSize: parents.length, // replace later with size(users),
    custom: true,
  };
  const { SearchBar } = Search;
  const handleValidUserSubmit = (values: any) => {
    let reqData = parentsList.map(obj => {
      obj.tenantId = currentTenant;
      return obj;
    });
    dispatch(importParent(reqData));
  };
  const handleClearSubmit = (values: any) => {
    window.location.reload();
  };
  return (
    <PaginationProvider pagination={paginationFactory(pageOptions)}>
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField="Mobile"
          data={parentsList}
          columns={parentListColumns}
          bootstrap4
          search
        >
          {toolkitProps => (
            <React.Fragment>
              <Row>
                <Col md={6}>
                  <div className="search-box me-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <SearchBar {...toolkitProps.searchProps} />
                      <i className="bx bx-search-alt search-icon" />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                    <div>
                      <Button
                        type="button"
                        outline
                        color="info"
                        disabled={loading}
                        onClick={handleClearSubmit}
                      >
                        <i className="uil uil-exclamation-triangle me-2"></i>{" "}
                        Clear
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        outline
                        color="success"
                        disabled={loading}
                        onClick={handleValidUserSubmit}
                      >
                        <i className="uil uil-check me-2"></i> Submit
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl="12">
                  <div className="table-responsive">
                    <BootstrapTable
                      {...toolkitProps.baseProps}
                      {...paginationTableProps}
                      //selectRow={selectRow}
                      // defaultSorted={defaultSorted}
                      classes={"table align-middle table-nowrap table-hover"}
                      bordered={false}
                      striped={false}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="align-items-md-center mt-30">
                <Col className="pagination pagination-rounded justify-content-end mb-2">
                  <PaginationListStandalone {...paginationProps} />
                </Col>
              </Row>
            </React.Fragment>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};

export default ParentImportView;
