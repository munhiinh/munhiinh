const Footer = ({ bg, extraClass }) => {
  return (
    <footer
      className={`main-footer ${bg ? bg : "black"}-bg ${
        extraClass ? extraClass : ""
      }`}
    >
      <div className="container">
        {/*=== Footer CTA ===*/}
        <div className="footer-cta pt-80 pb-40">
          <div className="row">
            <div className="col-lg-6">
              {/*=== Single CTA Item ===*/}
              <div className="single-cta-item pr-lg-60 mb-40">
                <div className="icon">
                  <img src="assets/images/icon/support.png" alt="Icon" />
                </div>
                <div className="content">
                  <h3 className="title">
                    Need Any Support For Tour &amp; Travels ?
                  </h3>
                  <a href="#" className="icon-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/*=== Single CTA Item ===*/}
              <div className="single-cta-item pl-lg-60 mb-40">
                <div className="icon">
                  <img src="assets/images/icon/travel.png" alt="Icon" />
                </div>
                <div className="content">
                  <h3 className="title">
                    Ready to Get Started With Vacations!
                  </h3>
                  <a href="#" className="icon-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*=== Footer Widget ===*/}
        <div className="footer-widget-area pt-75 pb-30">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              {/*=== Footer Widget ===*/}
              <div className="footer-widget about-company-widget mb-40">
                <h4 className="widget-title">About us</h4>
                <div className="footer-content">
                  <p style={{ textAlign: "justify" }}>
                  Monkhin Daambe LLC, a Mongolian bus rental company, respects the needs and desires of its customers, provides efficient services, and values ​​quality in its operations.

                  </p>
                  <a href="#" className="footer-logo">
                    <img
                      style={{ width: "200px" }}
                      src={
                        bg === "gray"
                          ? "assets/images/logo/brand-logo-white.png"
                          : "assets/images/logo/brand-logo-white.png"
                      }
                      alt="Site Logo"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              {/*=== Footer Widget ===*/}
              <div className="footer-widget service-nav-widget mb-40 pl-lg-70">
                <h4 className="widget-title">Services</h4>
                <div className="footer-content">
                  <ul className="footer-widget-nav">
                    <li>
                      <a href="#">School camping</a>
                    </li>
                    <li>
                      <a href="#">Family camping</a>
                    </li>
                    <li>
                      <a href="#">Friends' camping</a>
                    </li>
                    <li>
                      <a href="#">Corporate camping</a>
                    </li>
                    <li>
                      <a href="#">Foreign tourist camping</a>
                    </li>
                  </ul>
                  <ul className="footer-widget-nav">
                    <li>
                      <a href="#">Need a Career ?</a>
                    </li>
                    <li>
                      <a href="#">Latest News &amp; Blog</a>
                    </li>
                    <li>
                      <a href="#">Core Features</a>
                    </li>
                    <li>
                      <a href="#">Meet Our teams</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              {/*=== Footer Widget ===*/}
              <div className="footer-widget footer-newsletter-widget mb-40 pl-lg-100">
                <h4 className="widget-title">Offer</h4>
                <div className="footer-content">
                  <p>You can send us feedback.</p>
                  <form>
                    <div className="form_group">
                      <label>
                        <i className="far fa-paper-plane" />
                      </label>
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Е-майл хаяг"
                        name="email"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*=== Footer Copyright ===*/}
        <div className="footer-copyright">
          <div className="row">
            <div className="col-lg-6">
              {/*=== Footer Text ===*/}
              <div className="footer-text">
                <p>
                  Copy@ 2025{" "}
                  <span style={{ color: "#F7921E" }}>Munhiinh daambe XXK </span>
                  , All Right Reserved
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              {/*=== Footer Nav ===*/}
              <div className="footer-nav float-lg-end">
                <ul>
                  <li>
                    <a href="#">Setting &amp; privacy</a>
                  </li>
                  <li>
                    <a href="#">Faqs</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
