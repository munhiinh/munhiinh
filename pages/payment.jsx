import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import RelatedTours from "@/src/components/sliders/RelatedTours";
import Layout from "@/src/layout/Layout";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  notification,
  Radio,
  Result,
  Row,
  Skeleton,
  Space,
} from "antd";
import emailjs from "emailjs-com";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Payment = () => {
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const [bus, setBus] = useState();
  const [busList, setBusList] = useState();
  const [localData, setLocalData] = useState();
  const [formLoad, setFormLoad] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    getBusDetails();
    getBus();
    getOrderHistory();
    if (localStorage.getItem("data")) {
      setLocalData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  const getBus = async () => {
    await axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json`
      )
      .then((res) => {
        console.log("bus");
        const data = Object.entries(res.data).reverse();
        setBusList(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getBusDetails = async () => {
    const token = localStorage.getItem("idToken");
    await axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus/${router.query.id}.json?&auth=${token}`
      )
      .then((res) => {
        setBus(res.data.data);
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
        const orderDataList = [];
        data.forEach((element) => {
          if (element[1].data?.busId === router.query.id) {
            orderDataList.push(element[1]?.data);
          }
        });

        setOrderHistoryData(orderDataList);
        email(orderDataList[0]);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const email = async (data) => {
    const mailData = {
      client_name: "munhiinhdaambe@gmail.com",
      email: data.email,
      name: data.username,
      busName: data.busName,
      day: data.orderDays,
      price: data.totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      message: "Таны захиалга амжилттай төлөгдлөө",
    };
    emailjs
      .send(
        "service_vfeb1rk", // service id service_rq0sez5
        "template_3k9z01y", // template id
        mailData,
        "uZb0rDKmRujoy7mfg" // public api uZb0rDKmRujoy7mfg
      )
      .then(
        (res) => {
          console.log("res ===> ", res);
        },
        (err) => {
          message.error("Амжилтгүй хүсэлт");
        }
      );

    await setTimeout(() => {
      const mailDataAdmin = {
        client_name: data.email,
        email: "munhiinhdaambe@gmail.com",
        name: data.username,
        busName: data.busName,
        day: data.orderDays,
        price: data.totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        message: "Таны захиалга амжилттай төлөгдлөө",
      };
      emailjs
        .send(
          "service_vfeb1rk", // service id service_rq0sez5
          "template_3k9z01y", // template id
          mailDataAdmin,
          "uZb0rDKmRujoy7mfg" // public api uZb0rDKmRujoy7mfg
        )
        .then(
          (res) => {
            console.log("res ===> ", res);
          },
          (err) => {
            message.error("Амжилтгүй хүсэлт");
          }
        );
    }, 2500);
  };
  return (
    <Layout extraClass={"pt-160"}>
      {/*====== Start Place Details Section ======*/}
      {contextHolder}

      <section className="place-details-section">
        {/*=== Place Slider ===*/}
        <div className="place-slider-area overflow-hidden wow fadeInUp"></div>
        <PageBanner pageTitle={mainContext.language.header.checkout} />
        <div className="container">
          <div className="tour-details-wrapper pt-80">
            {/*=== Tour Title Wrapper ===*/}
            <div className="tour-title-wrapper pb-30 wow fadeInUp">
              <div className="row">
                <div className="col-xl-6">
                  <div className="tour-title mb-20">
                    <h3 className="title">Payment Details</h3>
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
                        <i className="far fa-bus" />
                      </div>
                      <div className="info">
                        <h4>
                          <span>Bus name</span>
                          {bus?.busName}
                        </h4>
                      </div>
                    </div>
                    <div className="info-box mb-20">
                      <div className="icon">
                        <i className="fal fa-clock" />
                      </div>
                      <div className="info">
                        <h4>
                          <span>Durations</span>
                          {orderHistoryData?.[0]?.orderDays} Days
                        </h4>
                      </div>
                    </div>
                    <div
                      className="info-box mb-20"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="icon" style={{ margin: 0 }}>
                        <span>₮</span>
                      </div>
                      <div className="info">
                        <h4>
                          <span>Price</span>
                          {orderHistoryData[0]?.totalPrice
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ₮
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "140px" }}>
              <Result
                status="success"
                title="Successfully Purchased Order!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => router.push("/")}
                  >
                    Go back home
                  </Button>,
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      {/*====== End Place Details Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <GallerySection />
      {/*====== End Gallery Section ======*/}
    </Layout>
  );
};
export default Payment;
