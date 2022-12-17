import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter, Link } from "react-router-dom";
import { GradeProps } from "../../types/types";
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
  getGradeList,
  createGrade,
  updateGrade,
} from "../../slices/Grades/thunk";

const Grades = () => {
  const { grades, loading } = useSelector((state: any) => ({
    grades: state.grade.grades,
    loading: state.grade.loading,
  }));
  const dispatch = useDispatch();
  const gradeCount = grades !== null ? grades.length : 0;
  const [grade, setGrade] = useState<GradeProps>({
    gradeId: 0,
    tenantId: currentTenant,
    gname: "",
    gdesc: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (grades && !grades.length) {
      dispatch(getGradeList());
    }
  }, [getGradeList, grades]);
  const handleShow = () => setModal(false);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: gradeCount,
    custom: true,
  };
  const defaultSorted: any = [
    {
      dataField: "gradeId", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const editGrade = (item: GradeProps) => {
    setIsEdit(true);
    setGrade(item);
    toggle();
  };
  const { SearchBar } = Search;
  const GradeListColumns = [
    {
      text: "Grade Id",
      dataField: "gradeId",
      sort: true,
      hidden: true,
    },
    {
      text: "Name",
      dataField: "gname",
      sort: true,
    },
    {
      text: "Description",
      dataField: "gdesc",
      sort: false,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, item: GradeProps) => (
        <React.Fragment>
          <Row className="align-items-center">
            <Link to="#" className="text-body d-flex align-items-center">
              <i
                className="fas fa-edit text-info font-size-13 me-2"
                onClick={e => editGrade(item)}
              ></i>{" "}
              {/* <i
                className="fas fa-trash-alt text-danger font-size-13 me-2"
                onClick={e => dispatch(removeStudent(item.gradeId))}
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
      const GradeEdit: GradeProps = {
        gradeId: grade.gradeId,
        tenantId: currentTenant,
        gname: values["gname"],
        gdesc: values["gdesc"],
      };
      dispatch(updateGrade(GradeEdit));
    } else {
      const newGrade: GradeProps = {
        gradeId: 0,
        tenantId: currentTenant,
        gname: values["gname"],
        gdesc: values["gdesc"],
      };
      // save new user
      dispatch(createGrade(newGrade));
    }
    toggle();
  };
  const handleAddClicks = () => {
    //setUserList("");
    setGrade({
      gradeId: 0,
      tenantId: currentTenant,
      gname: "",
      gdesc: "",
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
            <title>Grades | Pupil ERP</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Application" breadcrumbItem="Grades" />
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
                          keyField="id"
                          data={grades}
                          columns={GradeListColumns}
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
                                        {!!isEdit ? "Edit Grade" : "Add Grade"}
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
                                                  name="gname"
                                                  label="Grade Name"
                                                  type="text"
                                                  placeholder="Enter Grade Name"
                                                  errorMessage="Invalid Grade name."
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={grade.gname || ""}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="gdesc"
                                                  label="Grade Description"
                                                  placeholder="Enter Description."
                                                  type="text"
                                                  // errorMessage="Invalid Description."
                                                  validate={{
                                                    required: { value: false },
                                                  }}
                                                  value={grade.gdesc || ""}
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

export default withRouter(Grades);
