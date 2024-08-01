import GallerySection from "@/src/components/GallerySection";
import MainContext from "@/src/components/context/mainContext/mainContext";
import Layout from "@/src/layout/Layout";
import {
  partnerSliderOne,
  sliderActive3Item,
  sliderActive5Item,
  testimonialSliderOne,
} from "@/src/sliderProps";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Skeleton,
  Spin,
  notification,
} from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import { EnvironmentOutlined } from "@ant-design/icons";
import moment from "moment";

const Counter = dynamic(() => import("@/src/components/Counter"), {
  ssr: false,
});
const { RangePicker } = DatePicker;

const Index = () => {
  const [loadingTable, setLoadingTable] = useState(false);
  const mainContext = useContext(MainContext);
  const [form] = Form.useForm();
  const [date, setDate] = useState();
  const [bus, setBus] = useState();

  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    getBus();
    getOrderHistory();
  }, []);

  useEffect(() => {
    return () => {
      getQpayToken();
    };
  }, []);
  const getQpayToken = () => {
    setTimeout(() => {
      if (!localStorage.getItem("qpay_access_token")) {
        const username = "MUNKHIINKH_DAAMBE";
        const password = "isvFH48i";
        const token = `${username}:${password}`;
        const basicAuth = Buffer.from(token).toString("base64");
        axios
          .post("https://merchant.qpay.mn/v2/auth/token", "", {
            headers: {
              Authorization: "Basic " + basicAuth,
            },
          })
          .then((res) => {
            if (res.data) {
              localStorage.setItem("qpay_access_token", res.data.access_token);
              localStorage.setItem("qpay_expires_in", res.data.expires_in);
              localStorage.setItem(
                "qpay_refresh_token",
                res.data.refresh_token
              );
            }
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      }
    }, 800);
  };
  const getBus = async () => {
    await axios
      .get(`https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus.json`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        setBus(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  const getOrderHistory = async () => {
    await axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json`
      )
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        setOrderHistoryData(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const onRangeChange = (dates, dateStrings) => {
    setDate(dateStrings);
  };
  const onFinish = (values) => {
    if (date && date.length === 2) {
      const startDateRange = date[0];
      const endDateRange = date[1];
      const busDatas = [];
      const busOrderData = [];
      let isBusBooked = false;

      bus?.forEach((element) => {
        const orderHistory = orderHistoryData.filter(
          (e) => e[1].data.busId === element[0]
        );
        busDatas.push({
          busId: element[0],
          busName: element[1].data.busName,
          orderHistory: orderHistory,
          data: element[1].data,
        });
      });

      busDatas.forEach((element) => {
        element.data = { ...element.data, busId: element.busId };
        const isDateBooked = (checkDate) => {
          return element.orderHistory.some((item) => {
            const startDate = item[1].data.startDate;
            const endDate = item[1].data.endDate;
            return checkDate >= startDate && checkDate <= endDate;
          });
        };

        let isBooked = false;
        let currentDate = moment(startDateRange);
        const endDate = moment(endDateRange);

        while (currentDate <= endDate) {
          const checkDate = currentDate.format("YYYY-MM-DD");
          if (isDateBooked(checkDate)) {
            isBooked = true;
            break;
          }
          currentDate.add(1, "day");
        }

        if (!isBooked) {
          busOrderData.push(element.data);
          isBusBooked = true;
        }
      });
      if (isBusBooked) {
        api["success"]({
          message: <div className="fw-bold">Захиалах боломжтой автобус!</div>,
          description: (
            <div className="fw-normal">
              <div>Эхлэх өдөр: {startDateRange}</div>
              <div>Дуусах өдөр: {endDateRange}</div>

              {busOrderData?.map((e, i) => (
                <Link
                  href={`/bus-details?id=${e.busId}`}
                  key={i}
                  style={{
                    display: "flex",
                    gap: "5px",
                    border: "1px solid #ccc",
                    margin: "10px 0px",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  <div style={{ width: "80px", height: "50px" }}>
                    <Image
                      alt="Munkhiinh xxk"
                      width={100}
                      height={50}
                      src={e?.img?.[0]}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: "17px",
                    }}
                  >
                    <div className="text-uppercase fw-bold">{e.busName}</div>
                    <div>
                      Chair number:
                      <span className="fw-bold px-2">{e.chairNumber}</span>
                    </div>
                    <div>
                      price:
                      <span className="fw-bold px-2">
                        {e.price
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {"₮"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ),
          duration: 60,
        });
      } else {
        api["error"]({
          message: <div className="fw-bold">Захиалгатай байна!</div>,
          description: (
            <div className="fw-normal">
              Тухай нь сонгосон өдөр захиалгатай байна. Та дахин оролдоно уу!
            </div>
          ),
          duration: 10,
        });
      }
    } else {
      console.warn("Invalid date range selected.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout header={4}>
      {/*====== Start Hero Section ======*/}
      <section className="hero-section">
        {/*=== Hero Wrapper ===*/}
        {contextHolder}
        <div className="hero-wrapper-four">
          <div className="shape">
            <span>
              <img src="assets/images/hero/map.png" alt />
            </span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xl-7">
                {/*=== Hero Content ===*/}
                <div className="hero-content">
                  <span className="sub-title wow fadeInUp" data-wow-delay=".3s">
                    {mainContext.language.heroContent.welcome}
                  </span>
                  <h1 className="wow fadeInDown" data-wow-delay=".5s">
                    {mainContext.language.heroContent.title}
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay=".6s">
                    {mainContext.language.heroContent.description}
                  </p>
                  {/*=== Hero Search ===*/}
                  <div
                    className="hero-search-form mb-40 wow fadeInDown"
                    data-wow-delay=".7s"
                  >
                    <Form
                      name="basic"
                      layout="inline"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      size="large"
                      style={{ gap: "2px" }}
                    >
                      <Form.Item
                        label={<div className="fw-medium">FROM</div>}
                        name="from"
                        labelCol={{
                          xl: { span: 6 },
                          xs: { span: 6 },
                        }}
                        wrapperCol={{
                          xl: { span: 20 },
                          xs: { span: 22 },
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your FROM!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <EnvironmentOutlined style={{ color: "#ccc" }} />
                          }
                          allowClear
                          placeholder="From"
                        />
                      </Form.Item>

                      <Form.Item
                        label={<div className="fw-medium">TO</div>}
                        name="to"
                        labelCol={{
                          xl: { span: 6 },
                          xs: { span: 7 },
                        }}
                        wrapperCol={{
                          xl: { span: 20 },
                          xs: { span: 23 },
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your TO!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <EnvironmentOutlined style={{ color: "#ccc" }} />
                          }
                          allowClear
                          placeholder="To"
                        />
                      </Form.Item>

                      <Form.Item
                        label={<div className="fw-medium">DATE</div>}
                        name="date"
                        labelCol={{
                          xl: { span: 6 },
                          xs: { span: 6 },
                        }}
                        wrapperCol={{
                          xl: { span: 18 },
                          xs: { span: 18 },
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your date!",
                          },
                        ]}
                      >
                        <RangePicker onChange={onRangeChange} size="large" />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="text-uppercase fw-medium"
                          style={{ width: "100px" }}
                        >
                          find
                        </Button>
                      </Form.Item>
                    </Form>

                    {/* <form className="booking-form-two">
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
                          Check Availability{" "}
                          <i className="far fa-angle-double-right" />
                        </button>
                      </div>
                    </form> */}
                  </div>
                  <div
                    className="avatar-box wow fadeInUp"
                    data-wow-delay=".75s"
                  >
                    <img src="assets/images/about/avater.png" alt />
                    <span>{mainContext.language.heroContent.follows}</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 d-xl-block d-none">
                <div
                  className="hero-image wow fadeInRight"
                  data-wow-delay=".8s"
                >
                  {/* bus4.webp */}
                  {/* bus7.AVIF */}
                  <Image
                    width={2000}
                    height={2000}
                    src="/assets/images/hero/bus7.png"
                    alt="hero image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="service-section-two black-bg pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*=== Section Title ===*/}
              <div className="section-title text-center text-white mb-45 wow fadeInDown">
                <span className="sub-title">
                  {" "}
                  {mainContext.language.ourBus.title}
                </span>
                <h2> {mainContext.language.ourBus.bigTitle}</h2>
              </div>
            </div>
          </div>
          {!bus && (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Spin size="large" />
            </div>
          )}

          <Slider
            {...sliderActive3Item}
            className="slider-active-3-item wow fadeInUp"
          >
            {/*=== Single Service Item ===*/}
            {bus?.map((e, i) => (
              <div className="single-service-item-four" key={i}>
                <div className="img-holder">
                  <img src={e[1].data.img[0]} alt="Service Image" />
                </div>
                <div className="content">
                  <a href="#" className="icon-btn">
                    <i className="fas fa-heart" />
                  </a>
                  <h3 className="title">{e[1].data.busName}</h3>
                  <p>{e[1].data.title}</p>
                  <div className="meta">
                    <span className="icon">
                      <i className="fas fa-tv" />
                    </span>
                    <span className="icon">
                      <i className="fas fa-wifi" />
                    </span>
                    <span className="icon">
                      <i className="fas fa-snowflake" />
                    </span>
                    <span className="icon">
                      <i className="fas fa-plug" />
                    </span>
                    <span className="icon">
                      <i className="fas fa-music" />
                    </span>
                  </div>
                  <div className="action-btn">
                    <Flex
                      justify="space-between"
                      align="center"
                      className="fw-bold fs-5"
                    >
                      <span>
                        <h3 className="title">
                          {e[1].data.price
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ₮
                        </h3>
                      </span>
                      <Link legacyBehavior href={`/bus-details?id=${e[0]}`}>
                        <a className="main-btn primary-btn">
                          {mainContext.language.ourBus.btn}
                          <i className="far fa-paper-plane" />
                        </a>
                      </Link>
                    </Flex>
                  </div>
                </div>
              </div>
            ))}
            {/*=== Single Service Item ===*/}
          </Slider>
          {/*=== Text Box ===*/}
          <div className="big-text pt-100 wow fadeInDown">
            <img src="assets/images/bg/adventure.png" alt="Adventure" />
          </div>
        </div>
      </section>
      {/*====== End Hero Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-section gray-bg pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title mb-55 wow fadeInLeft">
                <span className="sub-title">
                  {mainContext.language.provide.title}
                </span>
                <h2>{mainContext.language.provide.bigTitle}</h2>
              </div>
            </div>
            <div className="col-lg-6">
              {/*=== Features Content Box ===*/}
              <div className="features-content-box pl-lg-70 wow fadeInRight">
                <p className="mb-25">
                  {mainContext.language.provide.description}
                </p>
                <div className="row justify-content-center">
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={356} />+
                      </h2>
                      <p>{mainContext.language.provide.happyTraveler}</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={852} />+
                      </h2>
                      <p>{mainContext.language.provide.tentSites}</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={99} />%
                      </h2>
                      <p>{mainContext.language.provide.positiveReviews}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*=== Features Slider ===*/}
          <Slider
            {...sliderActive5Item}
            className="slider-active-5-item wow fadeInUp"
          >
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-10.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Wadi Musa, Ma'an Governorate, Jordan</h6>
              </div>
            </div>
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-11.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Tambon Ko Kut, จ.ตราด, Thailand</h6>
              </div>
            </div>
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-12.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Camper Trailer, New York</h6>
              </div>
            </div>
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-13.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Wadi Musa, Ma'an Governorate, Jordan</h6>
              </div>
            </div>
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-14.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Forest Tent Camping, South Africa</h6>
              </div>
            </div>
            {/*=== Features Item ===*/}
            <div className="single-features-item-three">
              <div className="img-holder">
                <img
                  src="assets/images/features/feat-12.jpg"
                  alt="Features Image"
                />
              </div>
              <div className="content">
                <h6>Camper Trailer, New York</h6>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*=== End What We Section ===*/}
      {/*====== Start Service Section ======*/}

      <section className="who-we-section pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-5 order-2 order-xl-1">
              {/*=== We Image Box ===*/}
              <div className="we-image-box text-center text-xl-left pr-lg-30 mb-50 wow fadeInLeft">
                <img
                  src="assets/images/features/feat-2.jpg"
                  className="radius-top-left-right-288"
                  alt="What We Image"
                />
              </div>
            </div>
            <div className="col-xl-7 order-1 order-xl-2">
              {/*=== We Content Box ===*/}
              <div className="we-contnet-box mb-20 wow fadeInRight">
                {/*=== Section Title ===*/}
                <div className="section-title mb-45">
                  <span className="sub-title">
                    {mainContext.language.ourServices.title}
                  </span>
                  <h2>{mainContext.language.ourServices.bigTitle}</h2>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-three mb-30">
                      <div className="icon">
                        {/* <i className="flaticon-camping" /> */}
                        <img src="assets/images/icon/support.png" alt="Icon" />
                      </div>
                      <div className="text">
                        <h5 className="title">
                          {mainContext.language.ourServices.supp}
                        </h5>
                        <a href="#" className="btn-link">
                          {mainContext.language.ourServices.btn}{" "}
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-three mb-30">
                      <div className="icon">
                        <img src="assets/images/icon/travel.png" alt="Icon" />
                      </div>
                      <div className="text">
                        <h5 className="title">
                          {" "}
                          {mainContext.language.ourServices.consultations}
                        </h5>
                        <a href="#" className="btn-link">
                          {mainContext.language.ourServices.btn}{" "}
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-three mb-30">
                      <div className="icon">
                        {/* <i className="flaticon-oclock" /> */}
                        <i className="far fa-clock" />
                      </div>
                      <div className="text">
                        <h5 className="title">
                          {" "}
                          {mainContext.language.ourServices.scheduleOnTime}
                        </h5>
                        <a href="#" className="btn-link">
                          {mainContext.language.ourServices.btn}{" "}
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-three mb-30">
                      <div className="icon">
                        <i className="far fa-mobile" />
                      </div>
                      <div className="text">
                        <h5 className="title">
                          {" "}
                          {mainContext.language.ourServices.onlineBooking}
                        </h5>
                        <a href="#" className="btn-link">
                          {mainContext.language.ourServices.btn}
                          <i className="far fa-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="places-section pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">Popular Tour Place</span>
                <h2>Visit &amp; Enjoy Adventure Life With Full Of Dreams</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-20.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hiking Mountains
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-21.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Surfer Riding Wave
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-22.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Tracing Hill On Cloud
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-23.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hill House On Sea
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Gulf of Thailand, Thailand
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-24.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Tent Camping
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Wilderness, United States
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-25.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hiking Mountains
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-26.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Climbing Up The Hills
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-27.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Tracing Hill On Cloud
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Nordegg, Canada
                  </p>
                  <div className="meta">
                    <span>
                      <i className="far fa-calendar-alt" />
                      25 Feb 2023
                    </span>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== End Places Section ======*/}
      {/*====== Start Why Choose Section ======*/}
      {/* <section className="why-choose-section gray-bg pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-7">
              <div className="choose-content-box pr-lg-70">
                <div className="section-title mb-45 wow fadeInDown">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>People Why Choose Our Travel Adventure</h2>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-rabbit" />
                      </div>
                      <div className="text">
                        <h4 className="title">Best Security</h4>
                        <p>
                          We denounce with righteous indignation and dislike
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-wifi-router" />
                      </div>
                      <div className="text">
                        <h4 className="title">Free Internet</h4>
                        <p>
                          We denounce with righteous indignation and dislike
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-solar-energy" />
                      </div>
                      <div className="text">
                        <h4 className="title">Solar Energy</h4>
                        <p>
                          We denounce with righteous indignation and dislike
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-cycling" />
                      </div>
                      <div className="text">
                        <h4 className="title">Mountain Biking</h4>
                        <p>
                          We denounce with righteous indignation and dislike
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="experience-box text-center text-xl-right mb-50 wow fadeInRight">
                <img src="assets/images/features/years.png" alt />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== End Why Choose Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-section-two pt-100">
        <div className="container">
          {/* <div className="row align-items-xl-center">
            <div className="col-xl-5 order-2 order-xl-1">
              <div className="testimonial-image-box text-xl-left text-center wow fadeInLeft">
                <img
                  src="assets/images/testimonial/testimonial-2.png"
                  alt="Icon Image"
                />
              </div>
            </div>
            <div className="col-xl-7 order-1 order-xl-2">
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
          </div> */}

          <div className="blog-area pt-60 pb-60">
            <div className="row justify-content-center">
              <div className="col-xl-7">
                <div className="section-title text-center mb-45 wow fadeInDown">
                  <span className="sub-title">News &amp; Blog</span>
                  <h2>Amazing News &amp; Blog For Every Single Update</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="single-blog-post-three mb-40 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/blog-7.jpg" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 15, 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/blog-details">
                          <a>
                            Meet Skeleton Svelte Taile Sind For Reactive UIs
                          </a>
                        </Link>
                      </h3>
                      <Link legacyBehavior href="/blog-details">
                        <a className="main-btn filled-btn">
                          {mainContext.language.ourServices.btn}
                          <i className="far fa-paper-plane" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="single-blog-post-three mb-40 wow fadeInDown">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/blog-8.jpg" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 15, 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/blog-details">
                          <a>
                            Meet Skeleton Svelte Taile Sind For Reactive UIs
                          </a>
                        </Link>
                      </h3>
                      <Link legacyBehavior href="/blog-details">
                        <a className="main-btn filled-btn">
                          {mainContext.language.ourServices.btn}
                          <i className="far fa-paper-plane" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="single-blog-post-three mb-40 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/blog-9.jpg" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 15, 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/blog-details">
                          <a>
                            Meet Skeleton Svelte Taile Sind For Reactive UIs
                          </a>
                        </Link>
                      </h3>
                      <Link legacyBehavior href="/blog-details">
                        <a className="main-btn filled-btn">
                          {mainContext.language.ourServices.btn}
                          <i className="far fa-paper-plane" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Partners Section ======*/}
      <section className="partners-section black-dark-bg">
        <div className="container">
          {/*=== Partners Slider ===*/}
          <Slider
            {...partnerSliderOne}
            className="partner-slider-one pt-80 pb-50 wow fadeInUp"
          >
            {/*=== Partner Item ===*/}
            <div className="single-partner-item">
              <div className="partner-img">
                <a href="#">
                  <img
                    src="assets/images/partner/partner-6.png"
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
                    src="assets/images/partner/partner-7.png"
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
                    src="assets/images/partner/partner-8.png"
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
                    src="assets/images/partner/partner-9.png"
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
                    src="assets/images/partner/partner-10.png"
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
                    src="assets/images/partner/partner-7.png"
                    alt="Partner Image"
                  />
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Partners Section ======*/}
    </Layout>
  );
};
export default Index;
