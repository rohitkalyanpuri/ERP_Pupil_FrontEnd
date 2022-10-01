import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter, Link } from "react-router-dom";
import { StudentProps } from "../../types/types";
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
import { formatDate } from "../../utils/commonHelper";
import SpinnerLoader from "../../components/Common/Spinner";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getStudentList as onGetStudents,
  createStudent,
  updateStudent,
  removeStudent,
} from "../../slices/Students/thunk";
import "../../assets/scss/datatables.scss";
const Students = () => {
  const { students, loading } = useSelector((state: any) => ({
    students: state.student.students,
    loading: state.student.loading,
  }));
  const dispatch = useDispatch();
  const studentCount = students !== null ? students.length : 0;
  const [student, setStudent] = useState<StudentProps>({
    studentId: 0,
    tenantId: currentTenant,
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    parentId: 0,
    dateOfJoin: "",
    status: true,
  });

  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (students && !students.length) {
      dispatch(onGetStudents());
    }
  }, [onGetStudents, students]);
  const handleShow = () => setModal(false);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: studentCount, // replace later with size(users),
    custom: true,
  };
  const defaultSorted: any = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const editStudent = (item: StudentProps) => {
    setIsEdit(true);
    item = { ...item, dob: item.dob ? formatDate(new Date(item.dob), "") : "" };
    setStudent(item);
    toggle();
  };
  const { SearchBar } = Search;
  const StudentListColumns = [
    {
      text: "Student Id",
      dataField: "studentId",
      sort: true,
      hidden: true,
    },
    {
      text: "First Name",
      dataField: "firstName",
      sort: true,
    },
    {
      text: "Last Name",
      dataField: "lastName",
      sort: true,
    },
    {
      text: "Email",
      dataField: "email",
      sort: true,
    },
    {
      text: "DOB",
      dataField: "dob",
      sort: true,
      formatter: (cellContent: any, Student: StudentProps) =>
        Student.dob ? formatDate(new Date(Student.dob), "mm/dd/yyyy") : "",
    },
    {
      text: "Mobile",
      dataField: "mobile",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, Student: StudentProps) => (
        <React.Fragment>
          <Row className="align-items-center">
            <Link to="#" className="text-body d-flex align-items-center">
              <i
                className="fas fa-edit text-info font-size-13 me-2"
                onClick={e => editStudent(Student)}
              ></i>{" "}
              <i
                className="fas fa-trash-alt text-danger font-size-13 me-2"
                onClick={e => dispatch(removeStudent(Student.studentId))}
              ></i>{" "}
            </Link>
          </Row>
        </React.Fragment>
      ),
    },
  ];
  const toggle = () => {
    setModal(!modal);
  };
  const handleValidUserSubmit = (values: any) => {
    if (isEdit) {
      const StudentEdit: StudentProps = {
        studentId: student.studentId,
        tenantId: currentTenant,
        firstName: values["fname"],
        lastName: values["lname"],
        dob: values["dob"],
        mobile: values["mobile"],
        parentId: 0,
        dateOfJoin: "",
      };
      dispatch(updateStudent(StudentEdit));
    } else {
      const newStudent: StudentProps = {
        studentId: 0,
        tenantId: currentTenant,
        firstName: values["fname"],
        lastName: values["lname"],
        dob: values["dob"],
        mobile: values["mobile"],
        parentId: 0,
        dateOfJoin: "",
      };
      // save new user
      dispatch(createStudent(newStudent));
    }
    toggle();
  };
  const handleUserClicks = () => {
    //setUserList("");
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
            <title>Students | Pupil ERP</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs
              title="Application"
              breadcrumbItem={`Students List(${studentCount})`}
            />
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
                          data={students}
                          columns={StudentListColumns}
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
                                        onClick={handleUserClicks}
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
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <AvForm
                                          onValidSubmit={(
                                            e: any,
                                            values: any
                                          ) => {
                                            handleValidUserSubmit(values);
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="fname"
                                                  label="First Name"
                                                  type="text"
                                                  placeholder="Enter First Name"
                                                  errorMessage="Invalid first name."
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={
                                                    student.firstName || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="lname"
                                                  label="Last Name"
                                                  placeholder="Enter last name"
                                                  type="text"
                                                  errorMessage="Invalid last name."
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={student.lastName || ""}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="email"
                                                  label="Email"
                                                  type="email"
                                                  placeholder="Enter Email"
                                                  errorMessage="Invalid Email"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={
                                                    student.firstName || ""
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="mobile"
                                                  label="Mobile"
                                                  type="tel"
                                                  placeholder="Enter mobile number"
                                                  errorMessage="Invalid mobile number"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={student.mobile || ""}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="dob"
                                                  label="DOB"
                                                  placeholder="Enter DOB"
                                                  errorMessage="Invalid DOB"
                                                  type="date"
                                                  validate={{
                                                    date: {
                                                      format: "MM/DD/YYYY",
                                                    },
                                                  }}
                                                  value={student.dob || ""}
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

export default withRouter(Students);
