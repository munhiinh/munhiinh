import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { partnerSliderOne, testimonialSliderOne } from "@/src/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
const About = () => {
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"About Us"} />
      {/*====== Start Features Section ======*/}
      {/* <section className="features-section pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-5"> 
              <div className="features-content-box pr-lg-70 mb-50 wow fadeInLeft">
                <div className="section-title mb-30">
                  <span className="sub-title">Availability</span>
                  <h2>Explore GoWilds Real Adventure &amp; Travels</h2>
                </div>
                <p className="mb-30">
                  Sit amet consectetur integer tincidunt sceleries noda lesry
                  volutpat neque fermentum malesuada scelequecy leocras odio
                  blandit rhoncus eues feugiat
                </p>
                <a href="#" className="main-btn filled-btn">
                  Learn More
                  <i className="far fa-paper-plane" />
                </a>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="features-item-area mb-20 pl-lg-70">
                <div className="row">
                  <div className="col-md-6"> 
                    <div className="fancy-icon-box-two mb-30 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-camping" />
                      </div>
                      <div className="text">
                        <h3 className="title">Tent Camping</h3>
                        <p>
                          Sit amet consectetur integ tincidunt scelerie nodermen
                          malesuada sceleris massa
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"> 
                    <div className="fancy-icon-box-two mb-30 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-biking-mountain" />
                      </div>
                      <div className="text">
                        <h3 className="title">Mountain Biking</h3>
                        <p>
                          Sit amet consectetur integ tincidunt scelerie nodermen
                          malesuada sceleris massa
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"> 
                    <div className="fancy-icon-box-two mb-30 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-fishing-2" />
                      </div>
                      <div className="text">
                        <h3 className="title">Fishing &amp; Boat</h3>
                        <p>
                          Sit amet consectetur integ tincidunt scelerie nodermen
                          malesuada sceleris massa
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"> 
                    <div className="fancy-icon-box-two mb-30 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-caravan" />
                      </div>
                      <div className="text">
                        <h3 className="title">RV Caravan Tent</h3>
                        <p>
                          Sit amet consectetur integ tincidunt scelerie nodermen
                          malesuada sceleris massa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== End Features Section ======*/}
      {/*====== Start We Section ======*/}
      <section className="who-we-section">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-lg-6 order-2 order-lg-1">
              {/*=== We Image Box ===*/}
              <div className="we-image-box text-center text-lg-left wow fadeInDown">
                <img
                  src="assets/images/features/auto1.jpg"
                  className="radius-top-left-right-288"
                  alt="Image"
                />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              {/*=== We Content Box ===*/}
              <div className="we-one_content-box">
                <div className="section-title mb-30 wow fadeInUp">
                  <span className="sub-title">Танилцуулга</span>
                  <h2>Манай байгууллагын танилцуулга</h2>
                </div>
                <p className="wow fadeInDown">
                  Мөнхийнх Даамбэ ХХК нь Монгол улсын авто тээврийн үндэсний
                  төвийн стандартын шаардлага хангасан автобус түрээсийн
                  үйлчилгээг 2020 оноос өнөөг хүртэл үйлчлүүлэгчдийн шаардлага,
                  хүсэл сонирхлыг дээдлэн, ажил үйлчилгээг үр дүнтэй явуулж, үйл
                  ажиллагаандаа чанарыг эрхэмлэн ажиллаж байна.
                </p>
                <div className="skill-wrapper wow fadeInUp">
                  <div className="single-skill-circle text-center">
                    <div className="inner-circle">
                      <div className="line" />
                      <span className="number">100%</span>
                    </div>
                    <h5>Автобусны аюулгүй байдал</h5>
                  </div>
                  <div className="single-skill-circle text-center">
                    <div className="inner-circle">
                      <div className="line" />
                      <span className="number">100%</span>
                    </div>
                    <h5>Хэрэглэгчийн сэтгэл хангамж</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End We Section ======*/}
      {/*====== Start Team Section ======*/}
      <section className="team-section pt-100 pb-70 gray-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*====== Section Title ======*/}
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">Багийн гишүүд</span>
                <h2>Манай байгууллагын мэргэшсэн хамт олон</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/muugii.png" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Д. Мөнхбат</h4>
                  <p className="position">Захирал</p>
                  <ul className="social-link">
                    <li>
                      <a href="https://www.facebook.com/munkhbat.davaadagva">
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
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/bvree.jpg" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Б. Бүрэнжаргал</h4>
                  <p className="position">Жолооч &amp; Мэргэшсэн</p>
                  <ul className="social-link">
                    <li>
                      <a href="https://www.facebook.com/bvrenjargal.batbayar">
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
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img
                    src="assets/images/team/choijilsuren.png"
                    alt="Team Image"
                  />
                </div>
                <div className="member-info">
                  <h4 className="title">Д. Чойжилсүрэн</h4>
                  <p className="position">Жолооч &amp; Мэргэшсэн</p>
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
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img
                    src="assets/images/team/uuganbayar.jfif"
                    alt="Team Image"
                  />
                </div>
                <div className="member-info">
                  <h4 className="title">Г. Ууганбаяр</h4>
                  <p className="position">Менежер</p>
                  <ul className="social-link">
                    <li>
                      <a href="https://www.facebook.com/uugnaa.gantulga">
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
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/tugs.jfif" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Б. Гантөгс</h4>
                  <p className="position">Жолооч &amp; Мэргэшсэн</p>
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
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/*====== Single Team Item ======*/}
              <div className="single-team-item mb-30 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/gantig.jfif" alt="Team Image" />
                </div>
                <div className="member-info">
                  <h4 className="title">Ч. Гантигхүү</h4>
                  <p className="position">Жолооч &amp; Мэргэшсэн</p>
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
      {/*====== Start What We Section ======*/}
      <section className="we-section pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-6">
              <div className="we-content-box mb-10 wow fadeInLeft">
                <div className="section-title mb-30">
                  <span className="sub-title">Бидний тухай</span>
                  <h2>Үйлчилгээний давуу талууд</h2>
                </div>
                <div className="features-list_one">
                  <div className="single-features-list mb-40">
                    <div className="icon-inner d-flex align-items-center">
                      <div className="icon-check">
                        <i className="fas fa-badge-check" />
                      </div>
                      <div className="icon">
                        <i className="flaticon-helmet" />
                      </div>
                    </div>
                    <div className="content">
                      <h4>Аюулгүй байдал нэгт</h4>
                      <p>
                        Стандратын шаардлага хангасан автобус болон мэргэшсэн
                        жолооч
                      </p>
                    </div>
                  </div>
                  <div className="single-features-list mb-40">
                    <div className="icon-inner d-flex align-items-center">
                      <div className="icon-check">
                        <i className="fas fa-badge-check" />
                      </div>
                      <div className="icon">
                        <i className="flaticon-best-price" />
                      </div>
                    </div>
                    <div className="content">
                      <h4>Тав тухтай орчин</h4>
                      <p>Зурагт хөгжим, караоке, bluetooth, air condition</p>
                    </div>
                  </div>
                  <div className="single-features-list mb-40">
                    <div className="icon-inner d-flex align-items-center">
                      <div className="icon-check">
                        <i className="fas fa-badge-check" />
                      </div>
                      <div className="icon">
                        <i className="flaticon-travel" />
                      </div>
                    </div>
                    <div className="content">
                      <h4>Цаг баримтлах</h4>
                      <p>
                        Үйлчлүүлэгчийн тухайн маршрут захиалсан цаг минут бүрт
                        хурдан шуурхай үйлчлүүлнэ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="we-two_image-box mb-20">
                <div className="row align-items-end">
                  <div className="col-md-6">
                    <div className="we-image mb-30 wow fadeInLeft">
                      <img
                        src="assets/images/gallery/gall2.jfif"
                        alt="we Image"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="we-image mb-30 wow fadeInRight">
                      <img
                        src="assets/images/gallery/gall1.jfif"
                        alt="we Image"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="we-image mb-30 pr-lg-30 text-md-end wow fadeInDown">
                      <img
                        src="assets/images/gallery/gall3.jfif"
                        alt="we Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End What We Section ======*/}
      {/*====== Start CTA Section ======*/}
      {/* <section
        className="cta-bg overlay bg_cover pt-150 pb-150"
        style={{ backgroundImage: "url(assets/images/bg/cta-bg.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8"> 
              <div className="cta-content-box text-center text-white wow fadeInDown">
                <h2 className="mb-35">
                  Ready to Travel With Real Adventure and Enjoy Natural
                </h2>
                <Link legacyBehavior href="/about">
                  <a className="main-btn primary-btn">
                    Check Availability
                    <i className="far fa-paper-plane" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== End CTA Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      {/* <section className="testimonial-section pt-60 pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8"> 
              <div className="section-title text-center mb-60 wow fadeInDown">
                <span className="sub-title">Testimonials</span>
                <h2>What Our Traveler Say About Our Tour Services</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-xl-center">
            <div className="col-xl-5 col-lg-12 order-2 order-xl-1"> 
              <div className="testimonial-one_image-box mb-40 wow fadeInLeft">
                <img
                  src="assets/images/testimonial/testimonial-1.jpg"
                  alt="Testimonial Image"
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-12 order-1 order-xl-2"> 
              <Slider
                {...testimonialSliderOne}
                className="testimonial-slider-one pl-lg-55 mb-40 wow fadeInRight"
              > 
                <div className="gw-testimonial-item">
                  <div className="testimonial-inner-content">
                    <div className="quote-rating-box">
                      <div className="icon">
                        <img
                          src="assets/images/testimonial/quote.png"
                          alt="quote icon"
                        />
                      </div>
                      <div className="ratings-box">
                        <h4>Quality Services</h4>
                        <ul className="ratings">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      To take a trivial example which of usev undertakes
                      laborious physical exercise excepto obtain advantage from
                      has any right to find fault with man who chooses to enjoy
                    </p>
                    <div className="author-thumb-title">
                      <div className="author-thumb">
                        <img
                          src="assets/images/testimonial/author-1.jpg"
                          alt="Author Image"
                        />
                      </div>
                      <div className="author-title">
                        <h3 className="title">Douglas D. Hall</h3>
                        <p className="position">CEO &amp; Founder</p>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="gw-testimonial-item">
                  <div className="testimonial-inner-content">
                    <div className="quote-rating-box">
                      <div className="icon">
                        <img
                          src="assets/images/testimonial/quote.png"
                          alt="quote icon"
                        />
                      </div>
                      <div className="ratings-box">
                        <h4>Quality Services</h4>
                        <ul className="ratings">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      To take a trivial example which of usev undertakes
                      laborious physical exercise excepto obtain advantage from
                      has any right to find fault with man who chooses to enjoy
                    </p>
                    <div className="author-thumb-title">
                      <div className="author-thumb">
                        <img
                          src="assets/images/testimonial/author-1.jpg"
                          alt="Author Image"
                        />
                      </div>
                      <div className="author-title">
                        <h3 className="title">Douglas D. Hall</h3>
                        <p className="position">CEO &amp; Founder</p>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="gw-testimonial-item">
                  <div className="testimonial-inner-content">
                    <div className="quote-rating-box">
                      <div className="icon">
                        <img
                          src="assets/images/testimonial/quote.png"
                          alt="quote icon"
                        />
                      </div>
                      <div className="ratings-box">
                        <h4>Quality Services</h4>
                        <ul className="ratings">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      To take a trivial example which of usev undertakes
                      laborious physical exercise excepto obtain advantage from
                      has any right to find fault with man who chooses to enjoy
                    </p>
                    <div className="author-thumb-title">
                      <div className="author-thumb">
                        <img
                          src="assets/images/testimonial/author-1.jpg"
                          alt="Author Image"
                        />
                      </div>
                      <div className="author-title">
                        <h3 className="title">Douglas D. Hall</h3>
                        <p className="position">CEO &amp; Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Partners Section ======*/}
      <section className="partners-section">
        <div className="container">
          {/*=== Partners Slider ===*/}
          <Slider
            {...partnerSliderOne}
            className="partner-slider-one pt-80 pb-70 wow fadeInUp"
          >
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/gallery/partner-1.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-2.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-3.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-4.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-5.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-4.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Partners Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <GallerySection />
    </Layout>
  );
};
export default About;
