import GallerySection from "@/src/components/GallerySection";
import Layout from "@/src/layout/Layout";
import {
  home2Slider,
  sliderActive3Item,
  sliderActive4Item,
} from "@/src/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
const Index2 = () => {
  return (
    <Layout header={2} extraClass={"pt-160"}>
      {/*====== Start Hero Section ======*/}
      <section className="hero-section">
        {/*=== Hero Wrapper ===*/}
        <div className="hero-wrapper-two">
          {/*=== Hero Slider ===*/}
          <Slider {...home2Slider} className="hero-slider-two">
            {/*=== Single Slider ===*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage: "url(assets/images/hero/hero-two_img-1.jpg)",
                }}
              />
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-9">
                    {/*=== Hero Content ===*/}
                    <div className="hero-content text-white text-center">
                      <span className="ribbon">Tour &amp; Travels</span>
                      <h1 data-animation="fadeInDown" data-delay=".4s">
                        Tour Travel &amp; Adventure Camping
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInRight"
                        data-delay=".6s"
                      >
                        <Link legacyBehavior href="/about">
                          <a className="main-btn primary-btn">
                            Explore More
                            <i className="fas fa-paper-plane" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=== Single Slider ===*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage: "url(assets/images/hero/hero-two_img-2.jpg)",
                }}
              />
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-9">
                    {/*=== Hero Content ===*/}
                    <div className="hero-content text-white text-center">
                      <span className="ribbon">Tour &amp; Travels</span>
                      <h1 data-animation="fadeInDown" data-delay=".4s">
                        Tour Travel &amp; Adventure Camping
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInRight"
                        data-delay=".6s"
                      >
                        <Link legacyBehavior href="/about">
                          <a className="main-btn primary-btn">
                            Explore More
                            <i className="fas fa-paper-plane" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=== Single Slider ===*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage: "url(assets/images/hero/hero-two_img-3.jpg)",
                }}
              />
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-9">
                    {/*=== Hero Content ===*/}
                    <div className="hero-content text-white text-center">
                      <span className="ribbon">Tour &amp; Travels</span>
                      <h1 data-animation="fadeInDown" data-delay=".4s">
                        Tour Travel &amp; Adventure Camping
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInRight"
                        data-delay=".6s"
                      >
                        <Link legacyBehavior href="/about">
                          <a className="main-btn primary-btn">
                            Explore More
                            <i className="fas fa-paper-plane" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=== Single Slider ===*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage: "url(assets/images/hero/hero-two_img-4.jpg)",
                }}
              />
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-9">
                    {/*=== Hero Content ===*/}
                    <div className="hero-content text-white text-center">
                      <span className="ribbon">Tour &amp; Travels</span>
                      <h1 data-animation="fadeInDown" data-delay=".4s">
                        Tour Travel &amp; Adventure Camping
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInRight"
                        data-delay=".6s"
                      >
                        <Link legacyBehavior href="/about">
                          <a className="main-btn primary-btn">
                            Explore More
                            <i className="fas fa-paper-plane" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Hero Section ======*/}
      {/*====== Start Booking Section ======*/}
      <section className="booking-form-section">
        <div className="container-fluid">
          <div className="booking-form-wrapper">
            <form className="booking-form-two">
              <div className="form_group">
                <span>Check In</span>
                <label>
                  <i className="far fa-calendar-alt" />
                </label>
                <input
                  type="text"
                  className="form_control datepicker"
                  placeholder="Check In"
                />
              </div>
              <div className="form_group">
                <span>Check Out</span>
                <label>
                  <i className="far fa-calendar-alt" />
                </label>
                <input
                  type="text"
                  className="form_control datepicker"
                  placeholder="Check Out"
                />
              </div>
              <div className="form_group">
                <span>Guest</span>
                <label>
                  <i className="far fa-user-alt" />
                </label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Guest"
                  name="text"
                />
              </div>
              <div className="form_group">
                <span>Accommodations</span>
                <select className="wide">
                  <option data-display="Accommodations">Accommodations</option>
                  <option value={1}>Classic Tent</option>
                  <option value={1}>Forest Camping</option>
                  <option value={1}>Small Trailer</option>
                  <option value={1}>Tree House Tent</option>
                  <option value={1}>Tent Camping</option>
                  <option value={1}>Couple Tent</option>
                </select>
              </div>
              <div className="form_group">
                <button className="booking-btn">
                  Check Availability <i className="far fa-angle-double-right" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/*====== End Booking Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-section pt-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              {/*=== Section Title ===*/}
              <div className="section-title text-center mb-45 wow fadeInDown">
                <span className="sub-title">Popular Activities</span>
                <h2>Explore Real Adventure</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6 col-sm-12">
              {/*=== Features Image Item ===*/}
              <div className="single-features-item-two mb-40 wow fadeInUp">
                <div className="img-holder">
                  <img
                    src="assets/images/features/feat-5.jpg"
                    alt="Features Image"
                  />
                  <div className="item-overlay">
                    <div className="content">
                      <h3 className="title">Tent Camping</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              {/*=== Features Image Item ===*/}
              <div className="single-features-item-two mb-40 wow fadeInDown">
                <div className="img-holder">
                  <img
                    src="assets/images/features/feat-6.jpg"
                    alt="Features Image"
                  />
                  <div className="item-overlay">
                    <div className="content">
                      <h3 className="title">Mountain Biking</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              {/*=== Features Image Item ===*/}
              <div className="single-features-item-two mb-40 wow fadeInUp">
                <div className="img-holder">
                  <img
                    src="assets/images/features/feat-7.jpg"
                    alt="Features Image"
                  />
                  <div className="item-overlay">
                    <div className="content">
                      <h3 className="title">Fishing</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              {/*=== Features Image Item ===*/}
              <div className="single-features-item-two mb-40 wow fadeInDown">
                <div className="img-holder">
                  <img
                    src="assets/images/features/feat-8.jpg"
                    alt="Features Image"
                  />
                  <div className="item-overlay">
                    <div className="content">
                      <h3 className="title">Kayaking</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start About Section ======*/}
      <section className="about-section pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-lg-6">
              {/*=== About Content Box ===*/}
              <div className="about-two_content-box mb-35 wow fadeInLeft">
                <div className="section-title mb-30">
                  <span className="sub-title">About Company</span>
                  <h2>
                    We Are Most Funning Company About Travel and Adventure
                  </h2>
                </div>
                <p>
                  Sit amet consectetur. Velit integer tincidunt sceleries
                  nodalesry volutpat neque fermentum malesuada sceleris quecy
                  massa lacus Ultrices eget leo cras odio blandit rhoncus eues
                  feugiat
                </p>
                <div className="card-list">
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Family Camping
                  </div>
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Wild Camping
                  </div>
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Fishing
                  </div>
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Mountain Biking
                  </div>
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Luxury Cabin
                  </div>
                  <div className="card-item">
                    <i className="fas fa-badge-check" />
                    Couple Camping
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/*=== About Image Box ===*/}
              <div className="about-one_image-box mb-50 wow fadeInRight">
                <img
                  src="assets/images/about/about-1.jpg"
                  className="radius-top-left-right-288"
                  alt="About image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start We Section ======*/}
      <section className="who-we-section">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-lg-6 order-2 order-lg-1">
              {/*=== We Image Box ===*/}
              <div className="we-image-box text-center text-lg-left wow fadeInLeft">
                <img
                  src="assets/images/gallery/we-1.jpg"
                  className="radius-top-left-right-288"
                  alt="Image"
                />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              {/*=== We Content Box ===*/}
              <div className="we-one_content-box wow fadeInRight">
                <div className="section-title mb-30">
                  <span className="sub-title">Who We Are</span>
                  <h2>Great Opportunity For Adventure &amp; Travels</h2>
                </div>
                <p>
                  Set perspiciatis unde omnis iste natus error voluptatem
                  accusantium doloremue laudantium totam rem aperiam eaque quae
                  abillo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo.
                </p>
                <div className="skill-wrapper">
                  <div className="single-skill-circle text-center">
                    <div className="inner-circle">
                      <div className="line" />
                      <span className="number">60%</span>
                    </div>
                    <h5>Saticfied Clients</h5>
                  </div>
                  <div className="single-skill-circle text-center">
                    <div className="inner-circle">
                      <div className="line" />
                      <span className="number">93%</span>
                    </div>
                    <h5>Success Rate</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End We Section ======*/}
      {/*====== Start Services Section ======*/}
      <section className="services-section black-bg pt-100 pb-100">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*=== Section Title ===*/}
              <div className="section-title text-center text-white mb-50 wow fadeInDown">
                <span className="sub-title">Popular Services</span>
                <h2>Amazing Adventure Camping Services for Enjoyed</h2>
              </div>
            </div>
          </div>
          {/*=== Service Slider One ===*/}
          <Slider
            {...sliderActive4Item}
            className="slider-active-4-item wow fadeInUp"
          >
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-two">
              <div
                className="hover-bg bg_cover"
                style={{
                  backgroundImage: "url(assets/images/service/hover-bg.jpg)",
                }}
              />
              <div className="content">
                <div className="icon">
                  <i className="flaticon-camping" />
                </div>
                <h3 className="title">
                  <a href="#">Tent Camping</a>
                </h3>
                <p>
                  Sit amet consectetur integer tincidunt nodalesry volutpat
                  neque ferme malesua da sceleris quecy massa lacus
                </p>
                <a href="#" className="btn-link">
                  Read More <i className="far fa-long-arrow-right" />
                </a>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-two">
              <div
                className="hover-bg bg_cover"
                style={{
                  backgroundImage: "url(assets/images/service/hover-bg.jpg)",
                }}
              />
              <div className="content">
                <div className="icon">
                  <i className="flaticon-cable-car" />
                </div>
                <h3 className="title">
                  <a href="#">Glamping Cabin</a>
                </h3>
                <p>
                  Sit amet consectetur integer tincidunt nodalesry volutpat
                  neque ferme malesua da sceleris quecy massa lacus
                </p>
                <a href="#" className="btn-link">
                  Read More <i className="far fa-long-arrow-right" />
                </a>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-two">
              <div
                className="hover-bg bg_cover"
                style={{
                  backgroundImage: "url(assets/images/service/hover-bg.jpg)",
                }}
              />
              <div className="content">
                <div className="icon">
                  <i className="flaticon-trailer" />
                </div>
                <h3 className="title">
                  <a href="#">RV Caravan Trailers</a>
                </h3>
                <p>
                  Sit amet consectetur integer tincidunt nodalesry volutpat
                  neque ferme malesua da sceleris quecy massa lacus
                </p>
                <a href="#" className="btn-link">
                  Read More <i className="far fa-long-arrow-right" />
                </a>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-two">
              <div
                className="hover-bg bg_cover"
                style={{
                  backgroundImage: "url(assets/images/service/hover-bg.jpg)",
                }}
              />
              <div className="content">
                <div className="icon">
                  <i className="flaticon-firewood" />
                </div>
                <h3 className="title">
                  <a href="#">Woodfire &amp; BBQ Party</a>
                </h3>
                <p>
                  Sit amet consectetur integer tincidunt nodalesry volutpat
                  neque ferme malesua da sceleris quecy massa lacus
                </p>
                <a href="#" className="btn-link">
                  Read More <i className="far fa-long-arrow-right" />
                </a>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-two">
              <div
                className="hover-bg bg_cover"
                style={{
                  backgroundImage: "url(assets/images/service/hover-bg.jpg)",
                }}
              />
              <div className="content">
                <div className="icon">
                  <i className="flaticon-cable-car" />
                </div>
                <h3 className="title">
                  <a href="#">Glamping Cabin</a>
                </h3>
                <p>
                  Sit amet consectetur integer tincidunt nodalesry volutpat
                  neque ferme malesua da sceleris quecy massa lacus
                </p>
                <a href="#" className="btn-link">
                  Read More <i className="far fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Services Section ======*/}
      {/*====== Start Team Section ======*/}
      <section className="team-section pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*====== Section Title ======*/}
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">Team Member</span>
                <h2>We’ve Expert Team Members Meet With Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-1.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Donald D. Schafer</h4>
                  <p className="position">CEO &amp; Founder</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-2.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">William E. Combs</h4>
                  <p className="position">Web Designer</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-3.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Daniel G. Santana</h4>
                  <p className="position">Senior Manager</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-4.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Mario M. Troutman</h4>
                  <p className="position">Web Developer</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-5.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Don O. Vaillancourt</h4>
                  <p className="position">Junior Marketer</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/team-6.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Eugene J. Gilliam</h4>
                  <p className="position">Graphics Designer</p>
                  <ul className="social-link">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Team Section ======*/}
      {/*====== Start Activity Section ======*/}
      <section className="activity-section pb-60">
        <div className="container-fluid">
          {/*=== Slider Active Item ===*/}
          <Slider
            {...sliderActive3Item}
            className="slider-active-3-item wow fadeInUp"
          >
            {/*====== Activity Item ======*/}
            <div className="single-activity-item mb-40">
              <div className="img-holder">
                <img src="assets/images/gallery/act-1.jpg" alt="Image" />
              </div>
              <div className="content">
                <div className="meta">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="flaticon-blanket" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-cat" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-tent" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-fire" />
                      </span>
                    </li>
                  </ul>
                  <div className="rate">
                    <i className="fas fa-star" />
                    4.9
                  </div>
                </div>
                <h3 className="title">Classic Tents</h3>
                <p>
                  Quis autem veleum reprehenderit voluptate velit esse quame
                  nihile molestiae consequatur veillum dolorem eumy
                </p>
                <a href="#" className="main-btn filled-btn">
                  Check Now
                  <i className="fas fa-paper-plane" />
                </a>
              </div>
            </div>
            {/*====== Activity Item ======*/}
            <div className="single-activity-item mb-40">
              <div className="img-holder">
                <img src="assets/images/gallery/act-2.jpg" alt="Image" />
              </div>
              <div className="content">
                <div className="meta">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="flaticon-blanket" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-cat" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-tent" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-fire" />
                      </span>
                    </li>
                  </ul>
                  <div className="rate">
                    <i className="fas fa-star" />
                    4.9
                  </div>
                </div>
                <h3 className="title">Small Cabin Wood</h3>
                <p>
                  Quis autem veleum reprehenderit voluptate velit esse quame
                  nihile molestiae consequatur veillum dolorem eumy
                </p>
                <a href="#" className="main-btn filled-btn">
                  Check Now
                  <i className="fas fa-paper-plane" />
                </a>
              </div>
            </div>
            {/*====== Activity Item ======*/}
            <div className="single-activity-item mb-40">
              <div className="img-holder">
                <img src="assets/images/gallery/act-3.jpg" alt="Image" />
              </div>
              <div className="content">
                <div className="meta">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="flaticon-blanket" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-cat" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-tent" />
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="flaticon-fire" />
                      </span>
                    </li>
                  </ul>
                  <div className="rate">
                    <i className="fas fa-star" />
                    4.9
                  </div>
                </div>
                <h3 className="title">RV Caravan Trailer</h3>
                <p>
                  Quis autem veleum reprehenderit voluptate velit esse quame
                  nihile molestiae consequatur veillum dolorem eumy
                </p>
                <a href="#" className="main-btn filled-btn">
                  Check Now
                  <i className="fas fa-paper-plane" />
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Activity Section ======*/}
      {/*====== Start CTA Section ======*/}
      <section
        className="cta-bg overlay bg_cover pt-150 pb-150"
        style={{ backgroundImage: "url(assets/images/bg/cta-bg.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              {/*=== CTA Content Box ===*/}
              <div className="cta-content-box text-center text-white wow fadeInUp">
                <h2 className="mb-35">
                  Ready to Travel With Real Adventure and Enjoy Natural
                </h2>
                <Link legacyBehavior href="/about">
                  <a className="main-btn secondary-btn">
                    Check Availability
                    <i className="far fa-paper-plane" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End CTA Section ======*/}
      {/*====== Start Blog Section ======*/}
      <section className="blog-section pt-100 pb-60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              {/*=== Blog Content Box ===*/}
              <div className="blog-content-box mb-40 wow fadeInLeft">
                {/*=== Section Title ===*/}
                <div className="section-title mb-30">
                  <span className="sub-title">News &amp; Blog</span>
                  <h2>
                    Amazing News &amp; Blog For Every Single Update Articles
                    &amp; Tips
                  </h2>
                </div>
                <p className="mb-20">
                  Sit amet consectetur. Velit integer tincidunt sceleries
                  nodalesry volutpat neque fermentum malesuada sceleris quecy
                  massa lacus Ultrices eget leo cras odio blandit rhoncus eues
                  feugiat
                </p>
                <Link legacyBehavior href="/blog-list">
                  <a className="btn-link">
                    View More News <i className="far fa-long-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-6">
              {/*=== Single Blog Post ===*/}
              <div className="single-blog-post-two mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/blog-4.jpg" alt="Blog Image" />
                </div>
                <div className="entry-content">
                  <div className="post-meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      <a href="#">November 15, 2022</a>
                    </span>
                    <h3 className="title">
                      <Link legacyBehavior href="/blog-details">
                        <a>Meet Skeleton Svelte Taile Sind For Reactive UIs</a>
                      </Link>
                    </h3>
                    <Link legacyBehavior href="/blog-details">
                      <a className="main-btn filled-btn">
                        Read More
                        <i className="far fa-paper-plane" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              {/*=== Single Blog Post ===*/}
              <div className="single-blog-post-two mb-40 wow fadeInDown">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/blog-5.jpg" alt="Blog Image" />
                </div>
                <div className="entry-content">
                  <div className="post-meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      <a href="#">November 15, 2022</a>
                    </span>
                    <h3 className="title">
                      <Link legacyBehavior href="/blog-details">
                        <a>Meet Skeleton Svelte Taile Sind For Reactive UIs</a>
                      </Link>
                    </h3>
                    <Link legacyBehavior href="/blog-details">
                      <a className="main-btn filled-btn">
                        Read More
                        <i className="far fa-paper-plane" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Blog Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <GallerySection />
      {/*====== End Gallery Section ======*/}
    </Layout>
  );
};
export default Index2;
