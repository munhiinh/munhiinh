import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Skeleton,
  message,
  notification,
} from "antd";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import moment from "moment";
import Image from "next/image";

const { RangePicker } = DatePicker;

const OurBus = () => {
  const mainContext = useContext(MainContext);
  const [form] = Form.useForm();
  const [date, setDate] = useState();
  const [busList, setBusList] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      setIsWideScreen(e.matches);
    };

    // Set initial state
    handleChange(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  useEffect(() => {
    getBus();
    getOrderHistory();
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

      busList.forEach((element) => {
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
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={mainContext.language.header.bus} />
      {/*====== Start Booking Section ======*/}
      <section className="booking-form-section pb-100">
        <div className="container-fluid">
          {contextHolder}
          <div className="booking-form-wrapper p-r z-2">
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
              style={{ gap: "10px" }}
            >
              {/* <Form.Item
                label={<div className="fw-medium">FROM</div>}
                name="from"
                labelCol={{
                  xl: { span: 6 },
                  xs: { span: 6 },
                }}
                wrapperCol={{
                  xl: { span: 20 },
                  xs: { span: 21 },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your FROM!",
                  },
                ]}
              >
                <Input
                  allowClear
                  prefix={<EnvironmentOutlined style={{ color: "#ccc" }} />}
                  placeholder="From"
                />
              </Form.Item> */}

              <Form.Item
                label={<div className="fw-medium">Очих газар</div>}
                name="to"
                labelCol={{
                  xl: { span: 8 },
                  xs: { span: 6 },
                }}
                wrapperCol={{
                  xl: { span: 20 },
                  xs: { span: 15 },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your TO!",
                  },
                ]}
              >
                <Input
                  allowClear
                  prefix={<EnvironmentOutlined style={{ color: "#ccc" }} />}
                  placeholder="To"
                />
              </Form.Item>

              <Form.Item
                label={<div className="fw-medium">Хугацаа</div>}
                name="date"
                labelCol={{
                  xl: { span: 8 },
                  xs: { span: 6 },
                }}
                wrapperCol={{
                  xl: { span: 17 },
                  xs: { span: 13 },
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

              <Form.Item style={{ width: isWideScreen ? "" : "100%" }}>
                <Button
                  style={{ width: isWideScreen ? "" : "100%" }}
                  type="primary"
                  htmlType="submit"
                  className="text-uppercase fw-medium"
                >
                  Автобус хайх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
      {/*====== End Booking Section ======*/}
      {/*====== Start Places Section ======*/}
      <section className="places-section pb-100">
        <div className="container">
          {!busList ? (
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
          ) : (
            <>
              <div className="row justify-content-center">
                {busList?.map((e, i) => (
                  <div
                    className="col-xl-4 col-md-6 col-sm-12 places-column"
                    key={i}
                  >
                    {/*=== Single Place Item ===*/}
                    <div className="single-place-item mb-60 wow fadeInUp">
                      <div className="place-img ">
                        <img
                          src={e[1].data.img[0]}
                          alt="Place Image"
                          className=" bg-info-subtle"
                        />
                      </div>
                      <div className="place-content">
                        <div className="info">
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
                          <h4 className="title">
                            <Link legacyBehavior href="/bus-details">
                              <a>{e[1].data.busName}</a>
                            </Link>
                          </h4>
                          <p className="location fw-normal">
                            <i className="fas fa-tv" />
                            television
                          </p>

                          <p className="location fw-normal">
                            <i className="fas fa-wifi" />
                            Free wifi
                          </p>
                          <p className="location fw-normal ">
                            <i className="fas fa-microphone fs-5 " />
                            Karaoke
                          </p>
                          <div className="meta">
                            <span>
                              <span
                                style={{
                                  color: "#004aad",
                                  paddingRight: "5px",
                                }}
                              >
                                ₮{" "}
                              </span>

                              {e[1].data.price
                                .toFixed(0)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <span>
                              <i className="far fa-user" />
                              {e[1].data.chairNumber}
                            </span>
                            <span>
                              <Link
                                legacyBehavior
                                href={`/bus-details?id=${e[0]}`}
                              >
                                <a>
                                  {mainContext.language.ourBus.btn}
                                  <i className="far fa-long-arrow-right" />
                                </a>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="row">
                <div className="col-lg-12"> 
                  <ul className="gowilds-pagination wow fadeInUp text-center">
                    <li>
                      <a href="#">
                        <i className="far fa-arrow-left" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="active">
                        01
                      </a>
                    </li>
                    <li>
                      <a href="#">02</a>
                    </li>
                    <li>
                      <a href="#">03</a>
                    </li>
                    <li>
                      <a href="#">04</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </>
          )}
        </div>
      </section>
      {/*====== End Places Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <GallerySection />
      {/*====== End Gallery Section ======*/}
    </Layout>
  );
};
export default OurBus;
