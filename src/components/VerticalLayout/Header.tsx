import React, { useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { withTranslation } from "react-i18next";

//import drawer
import "react-drawer/lib/react-drawer.css";

//import component
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

//import images
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import illustrator from "../../assets/images/illustrator/1.png";

import slack from "../../assets/images/brands/slack.png";
import behance from "../../assets/images/brands/behance.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import github from "../../assets/images/brands/github.png";

//Import Icons
import Icon from "@ailibs/feather-react-ts";

const Header = (props: any) => {

  const [isSearch, setSearch] = useState<boolean>(false);
  const [socialDrp, setsocialDrp] = useState<boolean>(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const [categoryMenu, setcategoryMenu] = useState(false);
  

 /*** Sidebar menu icon and default menu set */
 function tToggle() {
  var body = document.body;
  if (window.screen.width <= 998) {
    body.classList.toggle("sidebar-enable");
  }
  document.body.setAttribute("data-sidebar-size", "lg");
}

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">

            <div className="navbar-brand-box">
              <Link to="/sales" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="22" />
                </span>
              </Link>

              <Link to="/sales" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="22" />
                </span>
              </Link>
            </div>
            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block">
            </div>
            {/* <NotificationDropdown /> */}
            <ProfileMenu />
          </div>
        </div>
      </header>

      

    </React.Fragment>
  );
};

export default withTranslation()(Header);