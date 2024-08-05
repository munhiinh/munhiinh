import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import RelatedTours from "@/src/components/sliders/RelatedTours";
import Layout from "@/src/layout/Layout";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Skeleton,
} from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const { RangePicker } = DatePicker;
const data = [
  {
    name: "amraa1",
    startDate: "2024-07-05",
    endDate: "2024-07-06",
  },
  {
    name: "amraa2",
    startDate: "2024-07-07",
    endDate: "2024-07-20",
  },
  {
    name: "amraa4",
    startDate: "2024-08-10",
    endDate: "2024-08-20",
  },
];
const BusDetails = () => {
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const [date, setDate] = useState();
  const [bus, setBus] = useState();
  const [busList, setBusList] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [orderDays, setOrderDays] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusDetails();
    getBus();
  }, []);

  const getBus = async () => {
    await axios
      .get(`https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus.json`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        setBusList(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getBusDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("idToken");
    await axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus/${router.query.id}.json?&auth=${token}`
      )
      .then((res) => {
        setBus(res.data.data);
        getOrderHistory();
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getOrderHistory = async () => {
    await axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json`
      )
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        const orderDataList = [];
        data.forEach((element) => {
          if (element[1].data?.busId === router.query.id) {
            orderDataList.push(element[1]?.data);
          }
        });
        setOrderHistoryData(orderDataList);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const onRangeChange = (dates, dateStrings) => {
    setDate(dateStrings);

    const startDate = new Date(dateStrings[0]);
    const endDate = new Date(dateStrings[1]);

    // Calculate the difference in milliseconds
    const differenceMs = endDate - startDate;

    // Convert milliseconds to days
    const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

    setOrderDays(differenceDays + 1);
  };

  const onFinish = (values) => {
    if (date && date.length === 2) {
      const startDateRange = date[0];
      const endDateRange = date[1];

      // Function to check if a date is within any booked interval
      const isDateBooked = (checkDate) => {
        return orderHistoryData.some((item) => {
          const startDate = item.startDate;
          const endDate = item.endDate;

          // Check if the checkDate falls within any booked interval
          return checkDate >= startDate && checkDate <= endDate;
        });
      };

      // Iterate through each date in the range to check if any are booked
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

      if (isBooked) {
        api["error"]({
          message: <div className="fw-bold">Захиалгатай байна!!!</div>,
          description: (
            <div className="fw-normal">
              Тухай нь сонгосон өдөр захиалгатай байна. Та дахин оролдоно уу!
            </div>
          ),
          duration: 10,
        });
      } else {
        const data = [];
        data.push({
          date: date,
          from: values.from,
          to: values.to,
          person: values.person,
        });

        localStorage.setItem("data", JSON.stringify(data));
        router.push(`/checkout?id=${router.query.id}`);
      }
    } else {
      console.warn("Invalid date range selected.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout extraClass={"pt-160"}>
      {/*====== Start Place Details Section ======*/}

      <section className="place-details-section">
        {/*=== Place Slider ===*/}
        <div className="place-slider-area overflow-hidden wow fadeInUp"></div>
        <PageBanner pageTitle={mainContext.language.header.bus} />
        {contextHolder}

        <div className="container">
          {loading && (
            <div
              style={{
                marginTop: "50px",
                marginBottom: "350px",
                justifyContent: "center",
                display: "flex",
                gap: "50px",
                flexDirection: "column",
              }}
            >
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          )}
          {!bus ? (
            <div
              style={{
                marginTop: "50px",
                marginBottom: "350px",
                justifyContent: "center",
                display: "flex",
                gap: "50px",
                flexDirection: "column",
              }}
            >
              <Empty description="No data">
                <Button type="primary" onClick={() => router.push("/")}>
                  Go to home
                </Button>
              </Empty>
            </div>
          ) : (
            <div className="tour-details-wrapper pt-80">
              {/*=== Tour Title Wrapper ===*/}
              <div className="tour-title-wrapper pb-30 wow fadeInUp">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="tour-title mb-20">
                      <h3 className="title">Улсын дугаар - {bus?.busName}</h3>
                      <p>
                        <i className="far fa-map-marker-alt" />
                        Ulaanbaatar of Mongolian
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="tour-widget-info">
                      <div className="info-box mb-20">
                        <div className="icon">
                          <i className="fal fa-box-usd" />
                        </div>
                        <div className="info">
                          <h4>
                            <span>From</span>
                            {bus?.price
                              .toFixed(0)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ₮
                          </h4>
                        </div>
                      </div>
                      <div className="info-box mb-20">
                        <div className="icon">
                          <i className="fal fa-clock" />
                        </div>
                        <div className="info">
                          <h4>
                            <span>Хугацаа</span> 1 өдөр
                          </h4>
                        </div>
                      </div>
                      <div className="info-box mb-20">
                        <div className="icon">
                          <i className="fal fa-planet-ringed" />
                        </div>
                        <div className="info">
                          <h4>
                            <span>Жуулчлалын төрөл</span>Орон нутгийн аялал
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*=== Tour Area Nav ===*/}
              <div className="tour-area-nav pt-20 pb-20 wow fadeInUp">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <div className="ratings-box">
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
                        <li>
                          <a href="#">(3k Riviews)</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="share-nav">
                      <a href="#">
                        Share
                        <i className="far fa-share" />
                      </a>
                      <a href="#">
                        Reviews
                        <i className="far fa-share" />
                      </a>
                      <a href="#">
                        Whislist
                        <i className="far fa-heart" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-8">
                  {/*=== Place Content Wrap ===*/}
                  <div className="place-content-wrap pt-45 wow fadeInUp">
                    <h3 className="title">Автобус мэдээлэл</h3>
                    <p>{bus?.description}</p>
                    {/* <h4>Advance Facilities</h4>
                  <p>
                    Neque porro quisquam est dolorem ipsum quia dolor si amet
                    consectetur adipisci velit sed quian numquam eius tempora
                    incidunt labore dolore magnam aliquam quaerat voluptatem.
                  </p> */}
                    <div className="row align-items-lg-center">
                      <div className="col-lg-5">
                        <ul className="check-list">
                          {bus?.adventages.map((e, i) => (
                            <li key={i}>
                              <i className="fas fa-badge-check" />
                              {e.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-lg-7">
                        <img
                          src={bus?.img[0]}
                          className="mb-20 w-100"
                          alt="place image"
                        />
                      </div>
                    </div>
                    {/* <h4>Tour Plan</h4>
                  <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam nihil molestiae consequatur vel eillum qui
                    dolorem eum fugiat quo voluptas nulla pariatur
                  </p> */}
                  </div>
                  {/*=== Days Area ===*/}
                  {/* <Tab.Container defaultActiveKey={"day1"}>
                  <div className="days-area mb-55 wow fadeInUp">
                    <Nav as={"ul"} className="nav nav-tabs mb-35">
                      <Nav.Item as={"li"} className="nav-item">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="day1"
                        >
                          Day 1st
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as={"li"} className="nav-item">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="day2"
                        >
                          Day 2nd
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as={"li"} className="nav-item">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="day3"
                        >
                          Day 3rd
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as={"li"} className="nav-item">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="day4"
                        >
                          Day 4th
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as={"li"} className="nav-item">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="day5"
                        >
                          Day 5th
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content className="tab-content">
                      <Tab.Pane className="tab-pane fade" eventKey="day1">
                        <div className="content-box">
                          <p>
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit sed quia consequuntur
                            magne doloreseos qui ratione voluptatem sequi
                            nesciunt. Neque porro quisquam est, qui dolorem
                            ipsum quia dolor si amet consectetur adipisci velit
                            sed quian numquam eius modi tempora incidunt
                          </p>
                          <ul className="check-list">
                            <li>
                              <i className="fas fa-badge-check" />
                              Parking in the Camp
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              kayaking Sport
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              Mountain Hiking
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane fade" eventKey="day2">
                        <div className="content-box">
                          <p>
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit sed quia consequuntur
                            magne doloreseos qui ratione voluptatem sequi
                            nesciunt. Neque porro quisquam est, qui dolorem
                            ipsum quia dolor si amet consectetur adipisci velit
                            sed quian numquam eius modi tempora incidunt
                          </p>
                          <ul className="check-list">
                            <li>
                              <i className="fas fa-badge-check" />
                              Parking in the Camp
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              kayaking Sport
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              Mountain Hiking
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane fade" eventKey="day3">
                        <div className="content-box">
                          <p>
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit sed quia consequuntur
                            magne doloreseos qui ratione voluptatem sequi
                            nesciunt. Neque porro quisquam est, qui dolorem
                            ipsum quia dolor si amet consectetur adipisci velit
                            sed quian numquam eius modi tempora incidunt
                          </p>
                          <ul className="check-list">
                            <li>
                              <i className="fas fa-badge-check" />
                              Parking in the Camp
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              kayaking Sport
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              Mountain Hiking
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane fade" eventKey="day4">
                        <div className="content-box">
                          <p>
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit sed quia consequuntur
                            magne doloreseos qui ratione voluptatem sequi
                            nesciunt. Neque porro quisquam est, qui dolorem
                            ipsum quia dolor si amet consectetur adipisci velit
                            sed quian numquam eius modi tempora incidunt
                          </p>
                          <ul className="check-list">
                            <li>
                              <i className="fas fa-badge-check" />
                              Parking in the Camp
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              kayaking Sport
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              Mountain Hiking
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane fade" eventKey="day5">
                        <div className="content-box">
                          <p>
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit sed quia consequuntur
                            magne doloreseos qui ratione voluptatem sequi
                            nesciunt. Neque porro quisquam est, qui dolorem
                            ipsum quia dolor si amet consectetur adipisci velit
                            sed quian numquam eius modi tempora incidunt
                          </p>
                          <ul className="check-list">
                            <li>
                              <i className="fas fa-badge-check" />
                              Parking in the Camp
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              kayaking Sport
                            </li>
                            <li>
                              <i className="fas fa-badge-check" />
                              Mountain Hiking
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container> */}
                  {/*=== Map Box ===*/}
                  <div className="map-box mb-60 wow fadeInUp">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4584.10117952351!2d106.9184876062708!3d47.922003668589056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693c7c74617c3%3A0xf69f7d1336167c9f!2sChinggis%20Khaan%20National%20Museum!5e0!3m2!1sen!2smn!4v1720926777967!5m2!1sen!2smn"
                      loading="lazy"
                    ></iframe>
                  </div>
                  {/*=== Calendar Box ===*/}
                  <div className="calendar-wrapper wow fadeInUp">
                    <div className="calendar-container mb-45" />
                  </div>
                  {/*=== Releted Tour Place ===*/}
                  <RelatedTours busList={busList} />
                  {/*=== Reviews Area ===*/}
                  <div className="reviews-wrapper mb-60 wow fadeInUp">
                    <div className="reviews-inner-box">
                      <div className="rating-value">
                        <h4>Clients Reviews</h4>
                        <div className="rate-score">4.9</div>
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
                          <li>
                            <a href="#">(4.9)</a>
                          </li>
                        </ul>
                        <span className="reviews">3k Reviews</span>
                      </div>
                      <div className="reviews-progress">
                        <div className="single-progress-bar">
                          <div className="progress-title">
                            <h6>
                              Quality <span className="rate">4.8</span>
                            </h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow slideInLeft"
                              style={{ width: "85%" }}
                            />
                          </div>
                        </div>
                        <div className="single-progress-bar">
                          <div className="progress-title">
                            <h6>
                              Team Member<span className="rate">4.6</span>
                            </h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow slideInLeft"
                              style={{ width: "75%" }}
                            />
                          </div>
                        </div>
                        <div className="single-progress-bar">
                          <div className="progress-title">
                            <h6>
                              Locations<span className="rate">4.7</span>
                            </h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow slideInLeft"
                              style={{ width: "90%" }}
                            />
                          </div>
                        </div>
                        <div className="single-progress-bar">
                          <div className="progress-title">
                            <h6>
                              Cost<span className="rate">4.9</span>
                            </h6>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow slideInLeft"
                              style={{ width: "95%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*=== Comments Area ===*/}
                  {/* <div className="comments-area wow fadeInUp">
                  <ul className="comment-list">
                    <li>
                      <div className="comment">
                        <div className="comment-avatar">
                          <img
                            src="assets/images/place/comment-1.jpg"
                            alt="comment author"
                          />
                        </div>
                        <div className="comment-wrap">
                          <div className="comment-author-content">
                            <span className="author-name">
                              Glenn M. Whitaker
                              <span className="time">
                                <i className="far fa-clock" />5 Minute Ago
                              </span>
                            </span>
                            <span className="position">CEO &amp; Founder</span>
                            <ul className="comment-rating-ul">
                              <li>
                                <span className="title">Quality</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Location</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Services</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Team</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Price</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                            </ul>
                            <p>
                              At vero eos et accusamus et iusto odio dignissimos
                              ducimus qui blanditiis praesentium voluptatum
                              deleniti atque corrupti quos dolores et quas
                              molestias excepture
                            </p>
                            <a href="#" className="btn-link">
                              Reply
                              <i className="far fa-angle-double-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <ul className="comment-reply">
                        <li>
                          <div className="comment">
                            <div className="comment-avatar">
                              <img
                                src="assets/images/place/comment-2.jpg"
                                alt="comment author"
                              />
                            </div>
                            <div className="comment-wrap">
                              <div className="comment-author-content">
                                <span className="author-name">
                                  Glenn M. Whitaker
                                  <span className="time">
                                    <i className="far fa-clock" />5 Minute Ago
                                  </span>
                                </span>
                                <span className="position">
                                  CEO &amp; Founder
                                </span>
                                <ul className="comment-rating-ul">
                                  <li>
                                    <span className="title">Quality</span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                  </li>
                                  <li>
                                    <span className="title">Location</span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                  </li>
                                  <li>
                                    <span className="title">Services</span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                  </li>
                                  <li>
                                    <span className="title">Team</span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                  </li>
                                  <li>
                                    <span className="title">Price</span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                    <span>
                                      <i className="fas fa-star" />
                                    </span>
                                  </li>
                                </ul>
                                <p>
                                  At vero eos et accusamus et iusto odio
                                  dignissimos ducimus qui blanditiis praesentium
                                  voluptatum deleniti atque corrupti quos
                                  dolores et quas molestias excepture
                                </p>
                                <a href="#" className="btn-link">
                                  Reply
                                  <i className="far fa-angle-double-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="comment">
                        <div className="comment-avatar">
                          <img
                            src="assets/images/place/comment-3.jpg"
                            alt="comment author"
                          />
                        </div>
                        <div className="comment-wrap">
                          <div className="comment-author-content">
                            <span className="author-name">
                              Glenn M. Whitaker
                              <span className="time">
                                <i className="far fa-clock" />5 Minute Ago
                              </span>
                            </span>
                            <span className="position">CEO &amp; Founder</span>
                            <ul className="comment-rating-ul">
                              <li>
                                <span className="title">Quality</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Location</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Services</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Team</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                              <li>
                                <span className="title">Price</span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                                <span>
                                  <i className="fas fa-star" />
                                </span>
                              </li>
                            </ul>
                            <p>
                              At vero eos et accusamus et iusto odio dignissimos
                              ducimus qui blanditiis praesentium voluptatum
                              deleniti atque corrupti quos dolores et quas
                              molestias excepture
                            </p>
                            <a href="#" className="btn-link">
                              Reply
                              <i className="far fa-angle-double-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div> */}
                  {/*===  Comments Form  ===*/}
                  {/* <div className="comments-respond mb-30 wow fadeInUp">
                  <h3 className="comments-heading" style={{ marginBottom: 15 }}>
                    Leave a Comments
                  </h3>
                  <ul className="comment-rating-ul mb-20">
                    <li>
                      <span className="title">Quality</span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="title">Location</span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="title">Services</span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="title">Team</span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="title">Price</span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                      <span>
                        <i className="fas fa-star" />
                      </span>
                    </li>
                  </ul>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="comment-form"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form_group">
                          <input
                            type="email"
                            className="form_control"
                            placeholder="Email Address"
                            name="name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Enter Name"
                            name="email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <textarea
                            name="message"
                            className="form_control"
                            rows={4}
                            placeholder="Write Comments"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <button className="main-btn primary-btn">
                            Send comments
                            <i className="fas fa-angle-double-right" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div> */}
                </div>
                <div className="col-xl-4">
                  {/*=== Sidebar Widget Area ===*/}
                  <div className="sidebar-widget-area pt-60 pl-lg-30">
                    {/*=== Booking Widget ===*/}
                    <div className="sidebar-widget booking-form-widget wow fadeInUp mb-40">
                      <h4 className="widget-title">Booking Tour</h4>
                      <Form
                        name="basic"
                        layout="inline"
                        // labelCol={{
                        //   span: 8,
                        // }}
                        // wrapperCol={{
                        //   span: 16,
                        // }}
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        size="large"
                        style={{ gap: "20px" }}
                      >
                        <Form.Item
                          labelCol={{
                            span: 5,
                          }}
                          wrapperCol={{
                            span: 20,
                            offset: 4,
                          }}
                          label={
                            <div
                              className="fw-bold"
                              style={{ fontFamily: "Roboto Slab, serif" }}
                            >
                              FROM
                            </div>
                          }
                          name="from"
                          rules={[
                            {
                              required: true,
                              message: "Please input your FROM!",
                            },
                          ]}
                        >
                          <Input allowClear size="middle" placeholder="FROM" />
                        </Form.Item>
                        <div
                          style={{
                            borderBottom: "1px solid rgba(29, 35, 31, 0.1)",
                            width: "100%",
                          }}
                        ></div>
                        <Form.Item
                          labelCol={{
                            span: 4,
                          }}
                          wrapperCol={{
                            span: 22,
                            offset: 6,
                          }}
                          label={
                            <label
                              className="fw-bold"
                              style={{ fontFamily: "Roboto Slab, serif" }}
                            >
                              TO
                            </label>
                          }
                          name="to"
                          rules={[
                            {
                              required: true,
                              message: "Please input your TO!",
                            },
                          ]}
                        >
                          <Input allowClear size="middle" placeholder="To" />
                        </Form.Item>
                        <div
                          style={{
                            borderBottom: "1px solid rgba(29, 35, 31, 0.1)",
                            width: "100%",
                          }}
                        ></div>
                        <Form.Item
                          labelCol={{
                            span: 6,
                          }}
                          wrapperCol={{
                            span: 20,
                            offset: 3,
                          }}
                          label={
                            <label
                              className="fw-bold"
                              style={{ fontFamily: "Roboto Slab, serif" }}
                            >
                              PERSON
                            </label>
                          }
                          name="person"
                          rules={[
                            {
                              required: true,
                              message: "Please input your TO!",
                            },
                          ]}
                        >
                          <InputNumber
                            allowClear
                            size="middle"
                            placeholder="Person"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                        <div
                          style={{
                            borderBottom: "1px solid rgba(29, 35, 31, 0.1)",
                            width: "100%",
                          }}
                        ></div>
                        <Form.Item
                          labelCol={{
                            span: 4,
                          }}
                          wrapperCol={{
                            span: 18,
                            offset: 1,
                          }}
                          label={
                            <div
                              className="fw-bold"
                              style={{ fontFamily: "Roboto Slab, serif" }}
                            >
                              WHEN
                            </div>
                          }
                          name="date"
                          rules={[
                            {
                              required: true,
                              message: "Please input your date!",
                            },
                          ]}
                        >
                          <RangePicker onChange={onRangeChange} size="middle" />
                        </Form.Item>
                        <div
                          style={{
                            borderBottom: "1px solid rgba(29, 35, 31, 0.1)",
                            width: "100%",
                          }}
                        ></div>
                        <div
                          className="sidebar-booking-form"
                          style={{ width: "100%" }}
                        >
                          <div className="booking-extra mb-15 wow fadeInUp">
                            <h6 className="mb-10">Aditional Services</h6>
                            <div className="extra">
                              <i className="fas fa-check-circle" />
                              Bus booking{" "}
                              <span>
                                <span className="currency">
                                  {bus?.price
                                    .toFixed(0)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                              </span>
                            </div>
                            <div className="extra">
                              <i className="fas fa-check-circle" />
                              Days
                              <span>
                                <span className="currency"></span>
                                {orderDays}
                              </span>
                            </div>
                          </div>
                          <div className="booking-total mb-20">
                            <div className="total">
                              <label>Total</label>
                              <span className="price">
                                {(bus?.price * orderDays)
                                  .toFixed(0)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                <span className="currency">₮</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Form.Item style={{ width: "100%" }}>
                          <div className="sidebar-booking-form">
                            <div className="submit-button">
                              <button className="main-btn primary-btn">
                                Booking Now
                                <i className="far fa-paper-plane" />
                              </button>
                            </div>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                    {/*=== Booking Info Widget ===*/}
                    {/* <div className="sidebar-widget booking-info-widget wow fadeInUp mb-40">
                    <h4 className="widget-title">Tour Information</h4>
                    <ul className="info-list">
                      <li>
                        <span>
                          <i className="far fa-user-circle" />
                          Max Guests<span>35</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="far fa-user-circle" />
                          Minimum Age<span>12+</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="far fa-map-marker-alt" />
                          Tour Location<span>Thailand</span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="far fa-globe" />
                          Language<span>English</span>
                        </span>
                      </li>
                    </ul>
                  </div> */}
                    {/*=== Recent Place Widget ===*/}
                    <div className="sidebar-widget recent-place-widget mb-40 wow fadeInUp">
                      <h4 className="widget-title">Last Minute Deals</h4>
                      <ul className="recent-place-list">
                        <li className="place-thumbnail-content">
                          <img
                            src="assets/images/place/thumb-1.jpg"
                            alt="post thumb"
                          />
                          <div className="place-content">
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
                                <i className="far fa-star" />
                              </li>
                            </ul>
                            <h5>
                              <Link legacyBehavior href="/tour-details">
                                <a>Infinity Pool Nears Beach</a>
                              </Link>
                            </h5>
                            <span className="price">
                              <span className="text">From :</span>
                              <span className="currency">$</span>45.23
                            </span>
                          </div>
                        </li>
                        <li className="place-thumbnail-content">
                          <img
                            src="assets/images/place/thumb-2.jpg"
                            alt="post thumb"
                          />
                          <div className="place-content">
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
                                <i className="fas fa-star-half-alt" />
                              </li>
                            </ul>
                            <h5>
                              <Link legacyBehavior href="/tour-details">
                                <a>Infinity Pool Nears Beach</a>
                              </Link>
                            </h5>
                            <span className="price">
                              <span className="text">From :</span>
                              <span className="currency">$</span>45.23
                            </span>
                          </div>
                        </li>
                        <li className="place-thumbnail-content">
                          <img
                            src="assets/images/place/thumb-3.jpg"
                            alt="post thumb"
                          />
                          <div className="place-content">
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
                            <h5>
                              <Link legacyBehavior href="/tour-details">
                                <a>Infinity Pool Nears Beach</a>
                              </Link>
                            </h5>
                            <span className="price">
                              <span className="text">From :</span>
                              <span className="currency">$</span>45.23
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/*=== Banner Widget ===*/}
                    <div className="sidebar-widget sidebar-banner-widget wow fadeInUp mb-40">
                      <div className="banner-widget-content">
                        <div className="banner-img">
                          <img
                            src="assets/images/blog/banner-1.jpg"
                            alt="Post Banner"
                          />
                          <div className="hover-overlay">
                            <div className="hover-content">
                              <h4 className="title">
                                <a href="#">Swimming Pool</a>
                              </h4>
                              <p>
                                <i className="fas fa-map-marker-alt" />
                                Marrakesh, Morocco
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*====== End Place Details Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <GallerySection />
      {/*====== End Gallery Section ======*/}
    </Layout>
  );
};
export default BusDetails;
