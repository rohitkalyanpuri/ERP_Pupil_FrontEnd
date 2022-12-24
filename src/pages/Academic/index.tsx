import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter, Link } from "react-router-dom";
import { AcademicProps } from "../../types/types";
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
import { formatDate } from "../../utils/commonHelper";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAcademicList,
  createAcademic,
  updateAcademic,
} from "../../slices/Academic/thunk";

const Academics = () => {
  const { academics, loading } = useSelector((state: any) => ({
    academics: state.academic.academics,
    loading: state.grade.loading,
  }));
  const dispatch = useDispatch();
  const academicCount = academics !== null ? academics.length : 0;
  const [acedemic, setAcademic] = useState<AcademicProps>({
    academicId: 0,
    tenantId: currentTenant,
    yearStartDate: "",
    yearEndDate: "",
    description: "",
    vacationEndDate: "",
    vacationStartDate: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (academics && !academics.length) {
      dispatch(getAcademicList());
    }
  }, [getAcademicList, academics]);
  const handleShow = () => setModal(false);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: academicCount,
    custom: true,
  };
  const defaultSorted: any = [
    {
      dataField: "academicId", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const editAcademic = (item: AcademicProps) => {
    setIsEdit(true);
    item = {
      ...item,
      yearStartDate: item.yearStartDate
        ? formatDate(new Date(item.yearStartDate), "")
        : "",
    };
    item = {
      ...item,
      yearEndDate: item.yearEndDate
        ? formatDate(new Date(item.yearEndDate), "")
        : "",
    };
    item = {
      ...item,
      vacationStartDate: item.vacationStartDate
        ? formatDate(new Date(item.vacationStartDate), "")
        : "",
    };
    item = {
      ...item,
      vacationEndDate: item.vacationEndDate
        ? formatDate(new Date(item.vacationEndDate), "")
        : "",
    };
    setAcademic(item);
    toggle();
  };
  const { SearchBar } = Search;
  const AcademicListColumns = [
    {
      text: "Academic Id",
      dataField: "academicId",
      sort: true,
      hidden: true,
    },
    {
      text: "Description",
      dataField: "description",
      sort: true,
    },
    {
      text: "Year Start Date",
      dataField: "yearStartDate",
      sort: true,
      formatter: (cellContent: any, item: AcademicProps) =>
        item.yearStartDate
          ? formatDate(new Date(item.yearStartDate), "mm/dd/yyyy")
          : "",
    },
    {
      text: "Year End Date",
      dataField: "yearEndDate",
      sort: true,
      formatter: (cellContent: any, item: AcademicProps) =>
        item.yearEndDate
          ? formatDate(new Date(item.yearEndDate), "mm/dd/yyyy")
          : "",
    },
    {
      text: "Vacation Start Date",
      dataField: "vacationStartDate",
      sort: true,
      formatter: (cellContent: any, item: AcademicProps) =>
        item.vacationStartDate
          ? formatDate(new Date(item.vacationStartDate), "mm/dd/yyyy")
          : "",
    },
    {
      text: "Vacation End Date",
      dataField: "vacationEndDate",
      sort: true,
      formatter: (cellContent: any, item: AcademicProps) =>
        item.vacationEndDate
          ? formatDate(new Date(item.vacationEndDate), "mm/dd/yyyy")
          : "",
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, item: AcademicProps) => (
        <React.Fragment>
          <Row className="align-items-center">
            <Link to="#" className="text-body d-flex align-items-center">
              <i
                className="fas fa-edit text-info font-size-13 me-2"
                onClick={e => editAcademic(item)}
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
      const AcedemicEdit: AcademicProps = {
        academicId: acedemic.academicId,
        tenantId: currentTenant,
        yearStartDate: values["yearStartDate"],
        yearEndDate: values["yearEndDate"],
        vacationStartDate: values["vacationStartDate"],
        vacationEndDate: values["vacationEndDate"],
        description: values["description"],
      };
      dispatch(updateAcademic(AcedemicEdit));
    } else {
      const newAcademic: AcademicProps = {
        academicId: 0,
        tenantId: currentTenant,
        yearStartDate: values["yearStartDate"],
        yearEndDate: values["yearEndDate"],
        vacationStartDate: values["vacationStartDate"],
        vacationEndDate: values["vacationEndDate"],
        description: values["description"],
      };
      // save new user
      dispatch(createAcademic(newAcademic));
    }
    toggle();
  };
  const handleAddClicks = () => {
    //setUserList("");
    setAcademic({
      academicId: 0,
      tenantId: currentTenant,
      yearStartDate: "",
      yearEndDate: "",
      vacationStartDate: "",
      vacationEndDate: "",
      description: "",
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
            <title>Academics | Pupil ERP</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Application" breadcrumbItem="Academic" />
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
                          data={academics}
                          columns={AcademicListColumns}
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
                                          ? "Edit Academic"
                                          : "Add Academic"}
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
                                                  name="description"
                                                  label="Description"
                                                  type="text"
                                                  placeholder="Enter Description"
                                                  errorMessage="Invalid Description."
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={
                                                    acedemic.description || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="yearStartDate"
                                                  label="Year Start Date"
                                                  placeholder="Enter Year Start Date"
                                                  errorMessage="Invalid Year Start Date"
                                                  type="date"
                                                  validate={{
                                                    date: {
                                                      format: "MM/DD/YYYY",
                                                    },
                                                  }}
                                                  value={
                                                    acedemic.yearStartDate || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="yearEndDate"
                                                  label="Year End Date"
                                                  placeholder="Enter Year End Date"
                                                  errorMessage="Invalid Year End Date"
                                                  type="date"
                                                  validate={{
                                                    date: {
                                                      format: "MM/DD/YYYY",
                                                    },
                                                  }}
                                                  value={
                                                    acedemic.yearEndDate || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="vacationStartDate"
                                                  label="Vacation Start Date"
                                                  placeholder="Enter Vacation Start Date"
                                                  errorMessage="Invalid Vacation Start Date"
                                                  type="date"
                                                  validate={{
                                                    date: {
                                                      format: "MM/DD/YYYY",
                                                    },
                                                  }}
                                                  value={
                                                    acedemic.vacationStartDate ||
                                                    ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="vacationEndDate"
                                                  label="Vacation End Date"
                                                  placeholder="Enter Vacation End Date"
                                                  errorMessage="Invalid Vacation End Date"
                                                  type="date"
                                                  validate={{
                                                    date: {
                                                      format: "MM/DD/YYYY",
                                                    },
                                                  }}
                                                  value={
                                                    acedemic.vacationEndDate ||
                                                    ""
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

export default withRouter(Academics);
