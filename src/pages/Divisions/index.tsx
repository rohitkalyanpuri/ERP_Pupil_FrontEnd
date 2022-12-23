import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter, Link } from "react-router-dom";
import { DivisionProps } from "../../types/types";
import { currentTenant } from "../../constants/tenant";
import AlertCommon from "src/components/Common/AlertCommon";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import SpinnerLoader from "../../components/Common/Spinner";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getDivisionList,
  createDivision,
  updateDivision,
} from "../../slices/Divisions/thunk";

const Divisions = () => {
  const { divisions, loading } = useSelector((state: any) => ({
    divisions: state.division.divisions,
    loading: state.division.loading,
  }));
  const dispatch = useDispatch();
  const gradeCount = divisions !== null ? divisions.length : 0;
  const [division, setDivision] = useState<DivisionProps>({
    divisionId: 0,
    tenantId: currentTenant,
    divisionName: "",
    divisionDesc: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (divisions && !divisions.length) {
      dispatch(getDivisionList());
    }
  }, [getDivisionList, divisions]);
  const handleShow = () => setModal(false);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: gradeCount,
    custom: true,
  };
  const defaultSorted: any = [
    {
      dataField: "divisionId", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const editDivision = (item: DivisionProps) => {
    setIsEdit(true);
    setDivision(item);
    toggle();
  };
  const { SearchBar } = Search;
  const DivisionListColumns = [
    {
      text: "Division Id",
      dataField: "divisionId",
      sort: true,
      hidden: true,
    },
    {
      text: "Name",
      dataField: "divisionName",
      sort: true,
    },
    {
      text: "Description",
      dataField: "divisionDesc",
      sort: false,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, item: DivisionProps) => (
        <React.Fragment>
          <Row className="align-items-center">
            <Link to="#" className="text-body d-flex align-items-center">
              <i
                className="fas fa-edit text-info font-size-13 me-2"
                onClick={e => editDivision(item)}
              ></i>{" "}
              {/* <i
                className="fas fa-trash-alt text-danger font-size-13 me-2"
                onClick={e => dispatch(removeStudent(item.divisionId))}
              ></i>{" "} */}
            </Link>
          </Row>
        </React.Fragment>
      ),
    },
  ];
  const toggle = () => {
    setModal(!modal);
  };
  const handleValidSubmit = (values: any) => {
    if (isEdit) {
      const GradeEdit: DivisionProps = {
        divisionId: division.divisionId,
        tenantId: currentTenant,
        divisionName: values["divisionName"],
        divisionDesc: values["divisionDesc"],
      };
      dispatch(updateDivision(GradeEdit));
    } else {
      const newGrade: DivisionProps = {
        divisionId: 0,
        tenantId: currentTenant,
        divisionName: values["divisionName"],
        divisionDesc: values["divisionDesc"],
      };
      // save new user
      dispatch(createDivision(newGrade));
    }
    toggle();
  };
  const handleAddClicks = () => {
    //setUserList("");
    setDivision({
      divisionId: 0,
      tenantId: currentTenant,
      divisionName: "",
      divisionDesc: "",
    });
    setIsEdit(false);
    toggle();
  };
  return (
    <React.Fragment>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="page-content">
          <MetaTags>
            <title>Divisions | Pupil ERP</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Application" breadcrumbItem="Divisions" />
            <Row>
              <AlertCommon />

              <Col lg="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="divisionId"
                          data={divisions}
                          columns={DivisionListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row>
                                <Col md={6}>
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>

                                <Col md={6}>
                                  <div className="d-flex flex-wrap align-items-start justify-content-md-end mt-2 mt-md-0 gap-2 mb-3">
                                    <div>
                                      <Link
                                        to="#"
                                        className="btn btn-light"
                                        onClick={handleAddClicks}
                                      >
                                        <i className="uil uil-plus me-1"></i>{" "}
                                        Add New
                                      </Link>
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
                                      // selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit
                                          ? "Edit Division"
                                          : "Add Division"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <AvForm
                                          onValidSubmit={(
                                            e: any,
                                            values: any
                                          ) => {
                                            handleValidSubmit(values);
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="divisionName"
                                                  label="Division Name"
                                                  type="text"
                                                  placeholder="Enter Division Name"
                                                  errorMessage="Invalid Division name."
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={
                                                    division.divisionName || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="divisionDesc"
                                                  label="Division Description"
                                                  placeholder="Enter Description."
                                                  type="text"
                                                  // errorMessage="Invalid Description."
                                                  validate={{
                                                    required: { value: false },
                                                  }}
                                                  value={
                                                    division.divisionDesc || ""
                                                  }
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="button"
                                                  className="btn btn-light w-sm"
                                                  onClick={handleShow}
                                                >
                                                  Close
                                                </button>
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </AvForm>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(Divisions);
