import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import SearchModal from "./SearchModal";
import data from "../../data.json";
import MainContext from "../components/context/mainContext/mainContext";
const Menu = () => {
  return (
    <Fragment>
      <DeskTopMenu />
      <MobileMenu />
    </Fragment>
  );
};
export default Menu;

const DeskTopMenu = () => {
  const [searchModal, setSearchModal] = useState(false);
  const mainContext = useContext(MainContext);
  const getLanguage = () => {
    return (
      <div className={"dropdown fw-medium"}>
        <span>
          {mainContext.langName} <i className="far fa-angle-down" />
        </span>
        <div className={"dropdownContent"}>
          <div
            className={"engLang"}
            onClick={() => mainContext.onChangeLanguage(0)}
          >
            English
          </div>
          <div
            className={"mnLang"}
            onClick={() => mainContext.onChangeLanguage(1)}
          >
            Mongolian
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <SearchModal
        show={searchModal}
        handleClose={() => setSearchModal(false)}
      />
      <nav className="main-menu d-none d-xl-block">
        <ul>
          {mainContext.user === 1 ? (
            <li className="menu-item has-children ">
              <Link href="/dashboard">
                {mainContext.language.header.dashboard}
              </Link>
            </li>
          ) : null}
          <li className="menu-item has-children">
            <a href="#">
              <Link href="/">{mainContext.language.header.home}</Link>
              {/* <span className="dd-trigger">
                <i className="far fa-angle-down" />
              </span> */}
            </a>

            {/* <li>
              <Link href="index-4">Home 04</Link>
            </li> */}
          </li>
          <li className="menu-item has-children">
            <a href="#">
              <Link href="our-bus"> {mainContext.language.header.bus}</Link>
            </a>
          </li>
          {/* <li className="menu-item has-children">
            <a href="#">
              {mainContext.language.header.destination}
              <span className="dd-trigger">
                <i className="far fa-angle-down" />
              </span>
            </a>
            <ul className="sub-menu">
              <li>
                <Link href="destination">Destination</Link>
              </li>
              <li>
                <Link href="destination-details">Destination Details</Link>
              </li>
            </ul>
          </li> */}
          <li className="menu-item has-children">
            <a href="#">
              {mainContext.language.header.blog}
              <span className="dd-trigger">
                <i className="far fa-angle-down" />
              </span>
            </a>
            <ul className="sub-menu">
              <li>
                <Link href="blog-list">Blog List</Link>
              </li>
              <li>
                <Link href="blog-details">Blog Details</Link>
              </li>
            </ul>
          </li>
          <li className="menu-item has-children">
            <a href="#">
              {mainContext.language.header.pages}
              <span className="dd-trigger">
                <i className="far fa-angle-down" />
              </span>
            </a>
            <ul className="sub-menu">
              <li>
                <Link href="about">{mainContext.language.header.aboutUs}</Link>
              </li>
              <li>
                <Link href="gallery">
                  {mainContext.language.header.ourGallery}
                </Link>
              </li>
              {/* <li>
                <Link href="events">Our Events</Link>
              </li> */}
              {/* <li>
                <Link href="shop">Our Shop</Link>
              </li>
              <li>
                <Link href="product-details">Product Details</Link>
              </li> */}
              <li>
                <Link href="contact">
                  {mainContext.language.header.contact}
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item search-item">
            <div
              className="search-btn"
              data-bs-toggle="modal"
              data-bs-target="#search-modal"
              onClick={() => setSearchModal(true)}
            >
              <i className="far fa-search" />
            </div>
          </li>
          <li className="menu-item search-item">
            <div className="lang-dropdown">{getLanguage()}</div>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const mainContext = useContext(MainContext);
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <nav className="main-menu d-block d-xl-none">
      <ul>
        <li className="menu-item has-children">
          <a href="#" style={{ padding: 0 }}>
            <span onClick={() => activeMenuSet("home")}>
              <Link href={"/"} onClick={() => activeMenuSet("home")}>
                {mainContext.language.header.home}
              </Link>
            </span>
          </a>
        </li>
        <li className="menu-item has-children">
          <a href="#" style={{ padding: 0 }}>
            <span onClick={() => activeMenuSet("home")}>
              <Link href={"/our-bus"} onClick={() => activeMenuSet("home")}>
                {mainContext.language.header.bus}
              </Link>
            </span>
          </a>
        </li>
        <li className="menu-item has-children">
          <a href="#">
            Blog
            <span className="dd-trigger" onClick={() => activeMenuSet("Blog")}>
              <i className="far fa-angle-down" />
            </span>
          </a>
          <ul className="sub-menu" style={activeLi("Blog")}>
            <li>
              <Link href="blog-list">Blog List</Link>
            </li>
            <li>
              <Link href="blog-details">Blog Details</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item has-children">
          <a href="#">
            {mainContext.language.header.pages}
            <span className="dd-trigger" onClick={() => activeMenuSet("Pages")}>
              <i className="far fa-angle-down" />
            </span>
          </a>
          <ul className="sub-menu" style={activeLi("Pages")}>
            <li>
              <Link href="about"> {mainContext.language.header.aboutUs}</Link>
            </li>
            <li>
              <Link href="gallery">
                {" "}
                {mainContext.language.header.ourGallery}
              </Link>
            </li>
            <li>
              <Link href="contact"> {mainContext.language.header.contact}</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item search-item">
          <div
            className="search-btn"
            data-bs-toggle="modal"
            data-bs-target="#search-modal"
          >
            <i className="far fa-search" />
          </div>
        </li>
      </ul>
    </nav>
  );
};
