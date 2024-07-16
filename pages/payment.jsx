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
        getOrderHistory();
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
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <Layout extraClass={"pt-160"}>
      {/*====== Start Place Details Section ======*/}
      {contextHolder}
      <section className="place-details-section">
        {/*=== Place Slider ===*/}
        <div className="place-slider-area overflow-hidden wow fadeInUp"></div>
        <PageBanner pageTitle={mainContext.language.header.checkout} />
        {console.log("orderHistoryData: ", orderHistoryData)}
        <div className="container">
          <div className="tour-details-wrapper pt-80">
            {/*=== Tour Title Wrapper ===*/}
            <div className="tour-title-wrapper pb-30 wow fadeInUp">
              <div className="row">
                <div className="col-xl-6">
                  <div className="tour-title mb-20">
                    <h3 className="title">Billing Details</h3>
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
                          <span>Durations</span>1 Days
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
                          {bus?.price
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
              <Result status={"success"} title="Tanii zahilaga amjilttai " />
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
