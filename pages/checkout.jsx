import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import QpayInvoice from "@/src/components/qpay-invoice";
import RelatedTours from "@/src/components/sliders/RelatedTours";
import Layout from "@/src/layout/Layout";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  message,
  notification,
  Radio,
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

const Checkout = () => {
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const [bus, setBus] = useState();
  const [busList, setBusList] = useState();
  const [localData, setLocalData] = useState();
  const [formLoad, setFormLoad] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [orderDays, setOrderDays] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const [qrData, setQrData] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    return () => {
      getBusDetails();
      getBus();

      if (localStorage.getItem("data")) {
        setLocalData(JSON.parse(localStorage.getItem("data")));
        const dates = JSON.parse(localStorage.getItem("data"));
        const startDate = new Date(dates[0].date[0]);
        const endDate = new Date(dates[0].date[1]);

        // Calculate the difference in milliseconds
        const differenceMs = endDate - startDate;

        // Convert milliseconds to days
        const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

        setOrderDays(differenceDays + 1);
      }
    };
  }, []);

  useEffect(() => {}, [form]);
  useEffect(() => {}, [paymentType]);

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
        getQpayInvoice();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const onFinish = (values) => {
    if (localData?.[0].date && localData?.[0].date.length === 2) {
      const startDateRange = localData?.[0].date[0];
      const endDateRange = localData?.[0].date[1];
      const localDatas = localData?.[0];
      // Function to check if a date is within any booked interval
      const isDateBooked = (checkDate) => {
        return orderHistoryData?.some((item) => {
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
        // console.log("Selected date range contains booked dates.");
        api["error"]({
          message: <div className="fw-bold">Захиалгатай байна!!!</div>,
          description: (
            <div className="fw-normal">
              Тухай нь сонгосон өдөр захиалгатай байна. Та дахин оролдоно уу!
            </div>
          ),
          duration: 10,
        });

        // Handle accordingly, e.g., show a message or disable further actions
      } else {
        const token = localStorage.getItem("idToken");
        const valuesUpdate = {
          ...values,
          startDate: startDateRange,
          endDate: endDateRange,
          from: localDatas.from,
          to: localDatas.to,
          person: localDatas.person,
          busId: router.query.id,
          busName: bus?.busName,
          orderDays: orderDays,
          totalPrice: bus?.price * orderDays,
          status: 0,
        };

        const body = {
          localId: localStorage.getItem("localId"),
          data: valuesUpdate,
        };

        setFormLoad(true);
        axios
          .post(
            `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json?&auth=${token}`,
            body
          )
          .then((res) => {
            if (res.data.name) {
              message.success("Амжилттай");
              router.push(`/payment?id=${router.query.id}`);
            }
          })
          .catch((err) => {
            message.error("Амжилтгүй");
          })
          .finally(() => {
            setFormLoad(false);
          });
      }
    } else {
      console.warn("Invalid date range selected.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeForm = () => {
    setPaymentType(form?.getFieldValue("paymentMethod"));
  };
  const getQpayInvoice = async () => {
    const token = localStorage.getItem("qpay_access_token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const body = {
      invoice_code: "MUNKHIINKH_DAAMBE_INVOICE",
      sender_invoice_no: "A123A1231",
      invoice_receiver_code: "MH821212291",
      invoice_description: "Munhiinh daambe xxk",
      sender_branch_code: "Munhiinh daambe xxk",
      amount: 100,
      callback_url: "https://korean-exam.vercel.app/payment=123",
    };
    await axios
      .post("api/invoicePost/invoice", body, { headers: headers })
      .then((res) => {
        setQrData(res.data);
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
                          <span>Durations</span>
                          {orderDays ? orderDays : 1} Days
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
                          {(bus?.price * orderDays)
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
              <Form
                form={form}
                name="basic"
                initialValues={{
                  remember: true,
                  cartTotals: 0,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onChange={onChangeForm}
                autoComplete="off"
                layout="vertical"
                size="large"
              >
                <Row gutter={20}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={<div className="fw-normal fs-5">Username</div>}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={<div className="fw-normal fs-5">Email</div>}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={<div className="fw-normal fs-5">Phone</div>}
                      name="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Phone!",
                        },
                      ]}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={<div className="fw-normal fs-5">Company name</div>}
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Company name!",
                        },
                      ]}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={<div className="fw-normal fs-5">Address</div>}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <TextArea allowClear style={{ height: "150px" }} showCount />
                </Form.Item>
                <Row gutter={20}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={
                        <div className="fw-normal fs-5">Payment method</div>
                      }
                      name="paymentMethod"
                      rules={[
                        {
                          required: true,
                          message: "Please input your payment method!",
                        },
                      ]}
                    >
                      <Radio.Group
                        style={{ paddingLeft: "10px", fontWeight: "500" }}
                      >
                        <Space direction="vertical" size={"middle"}>
                          <Radio value={"qpay"}>Qpay</Radio>
                          <Radio value={"checkPayment"}>Check payment</Radio>
                          <Radio value={"Chash"}>Chash on delivery</Radio>
                          <Radio value={"Paypal"}>Paypal</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <div>
                      {console.log("paymentType: ", paymentType)}
                      {paymentType === "qpay" ? (
                        <div>
                          Qr code
                          <Image
                            preview={true}
                            src={"data:image/png;base64," + qrData?.qr_image}
                            alt="Munhiinh daambe xxk"
                            width={200}
                            height={200}
                          />
                          <div>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                flexFlow: "wrap",
                              }}
                            >
                              {qrData?.urls.map((e, i) => (
                                <a href={e.link} key={i}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      width: "112px",
                                      margin: "10px 0px",
                                    }}
                                  >
                                    <Image
                                      src={e.logo}
                                      preview={false}
                                      alt="obortech"
                                      width={50}
                                      style={{ borderRadius: "24px" }}
                                    />
                                    <div
                                      style={{
                                        fontWeight: "600",
                                        marginTop: "5px",
                                        textAlign: "center",
                                      }}
                                    >
                                      {e.description}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      label={<div className="fw-normal fs-5">Cart Totals</div>}
                      name="cartTotals"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Flex
                        gap={15}
                        vertical
                        style={{
                          paddingLeft: "10px",
                          fontWeight: "500",
                        }}
                      >
                        <Flex
                          justify="space-between"
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "15px",
                          }}
                        >
                          <div>Pick dates: </div>
                          <div className="text-uppercase">
                            {localData?.[0].date[0] +
                              " - " +
                              localData?.[0].date[1]}
                          </div>
                        </Flex>
                        <Flex
                          justify="space-between"
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "15px",
                          }}
                        >
                          <div>Bus name: </div>
                          <div className="text-uppercase">{bus?.busName}</div>
                        </Flex>
                        <Flex
                          justify="space-between"
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "15px",
                          }}
                        >
                          <div>Days: </div>
                          <div>{orderDays}</div>
                        </Flex>

                        <Flex
                          justify="space-between"
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "15px",
                          }}
                        >
                          <div>Chair number: </div>
                          <div>{localData?.[0].person}</div>
                        </Flex>
                        <Flex
                          justify="space-between"
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "15px",
                            fontSize: "17px",
                            fontWeight: "600",
                          }}
                        >
                          <div>Order total: </div>
                          <div>
                            {(bus?.price * orderDays)
                              .toFixed(0)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ₮
                          </div>
                        </Flex>
                      </Flex>
                      <Input hidden />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="confirm"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirm!",
                    },
                  ]}
                >
                  <Checkbox>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Place order
                  </Button>
                </Form.Item>
              </Form>
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
export default Checkout;
