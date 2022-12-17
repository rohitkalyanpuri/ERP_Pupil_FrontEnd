import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter, Link } from "react-router-dom";
import { ParentProps } from "../../types/types";
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
  getParentList as onGetParents,
  createParent,
  updateParent,
  removeParent,
} from "../../slices/Parents/thunk";
import "../../assets/scss/datatables.scss";
const Parents = () => {
  const { parents, loading } = useSelector((state: any) => ({
    parents: state.parent.parents,
    loading: state.parent.loading,
  }));
  const parentCount = parents !== null ? parents.length : 0;
  const dispatch = useDispatch();
  const [parent, setParent] = useState<ParentProps>({
    parentId: 0,
    tenantId: currentTenant,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    dob: "",
    status: true,
  });

  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    if (parents && !parents.length) {
      dispatch(onGetParents());
    }
  }, [onGetParents, parents]);
  const handleShow = () => setModal(false);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: parentCount, // replace later with size(users),
    custom: true,
  };
  const defaultSorted: any = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const editParent = (item: ParentProps) => {
    setIsEdit(true);
    item = { ...item, dob: item.dob ? formatDate(new Date(item.dob), "") : "" };
    setParent(item);
    toggle();
  };
  const { SearchBar } = Search;
  const parentListColumns = [
    {
      text: "Parent Id",
      dataField: "parentId",
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
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "dob",
      text: "DOB",
      sort: true,
      formatter: (cellContent: any, parent: ParentProps) =>
        parent.dob ? formatDate(new Date(parent.dob), "mm/dd/yyyy") : "",
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
      formatter: (cellContent: any, parent: ParentProps) => (
        <React.Fragment>
          <Row className="align-items-center">
            <Link to="#" className="text-body d-flex align-items-center">
              <i
                className="fas fa-edit text-info font-size-13 me-2"
                onClick={e => editParent(parent)}
              ></i>{" "}
              <i
                className="fas fa-trash-alt text-danger font-size-13 me-2"
                onClick={e => dispatch(removeParent(parent.parentId))}
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
      const parentEdit: ParentProps = {
        parentId: parent.parentId,
        tenantId: currentTenant,
        firstName: values["fname"],
        lastName: values["lname"],
        mobile: values["mobile"],
        email: values["email"],
        dob: values["dob"],
      };
      dispatch(updateParent(parentEdit));
    } else {
      const newParent: ParentProps = {
        parentId: 0,
        tenantId: currentTenant,
        firstName: values["fname"],
        lastName: values["lname"],
        mobile: values["mobile"],
        email: values["email"],
        dob: values["dob"],
      };
      // save new user
      dispatch(createParent(newParent));
    }
    toggle();
  };
  const handleUserClicks = () => {
    //setUserList("");
    setIsEdit(false);
    setParent({
      parentId: 0,
      tenantId: currentTenant,
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      dob: "",
      status: true,
    });
    toggle();
  };
  return (
    <React.Fragment>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="page-content">
          <MetaTags>
            <title>Parents | Pupil ERP</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs
              title="Application"
              breadcrumbItem={`Parents List(${parentCount})`}
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
                          data={parents}
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
                                                  value={parent.firstName || ""}
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
                                                  value={parent.lastName || ""}
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
                                                  value={parent.email || ""}
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
                                                  value={parent.mobile || ""}
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
                                                  value={parent.dob || ""}
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

export default withRouter(Parents);
