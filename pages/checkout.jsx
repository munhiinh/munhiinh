import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { Alert, Typography } from "antd";

const { Paragraph } = Typography;

import emailjs from "emailjs-com";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  notification,
  Result,
  Row,
  Segmented,
  Skeleton,
  Steps,
  theme,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const { TextArea } = Input;
const Checkout = () => {
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const [bus, setBus] = useState();
  const [localData, setLocalData] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [orderDays, setOrderDays] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const [qrData, setQrData] = useState();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [information, setInformation] = useState();
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);
  const [orderNumber, setOrderNumber] = useState(0);
  const [segmentValue, setSegment] = useState(0);
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
  useEffect(() => {}, [current]);
  useEffect(() => {
    // If timer has finished, do nothing
    if (secondsLeft <= 0) return;

    // Update the timer every second
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
      if (current === 1) {
        payCheckFunc();
      }
    }, 3000);

    // Clear the interval when the component is unmounted or timer is finished
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  useEffect(() => {
    getBusDetails();
    // getBus();

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
  }, []);

  useEffect(() => {}, [form]);
  useEffect(() => {}, [paymentType]);

  // const getBus = async () => {
  //   await axios
  //     .get(
  //       `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json`
  //     )
  //     .then((res) => {
  //       const data = Object.entries(res.data).reverse();
  //       setBusList(data);
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // };

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
          status: 1,
        };

        const body = {
          localId: localStorage.getItem("localId"),
          data: valuesUpdate,
        };
        setInformation(body);
        setCurrent(current + 1);
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
    const orderNumber = "MH" + Math.floor(Math.random() * 1000000);
    setOrderNumber(orderNumber);
    const body = {
      invoice_code: "MUNKHIINKH_DAAMBE_INVOICE",
      sender_invoice_no: "A123A1231",
      invoice_receiver_code: orderNumber,
      invoice_description: "MUNHIINH DAAMBE XXK " + orderNumber,
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
  const payCheckFunc = async () => {
    const token = localStorage.getItem("qpay_access_token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const body = {
      object_type: "INVOICE",
      object_id: qrData?.invoice_id,
      offset: {
        page_number: 1,
        page_limit: 100,
      },
    };
    axios.post("/api/check/check", body, { headers: headers }).then((res) => {
      if (res.data.count === 0) {
        return;
      } else {
        setCurrent(current + 1);
        const token = localStorage.getItem("idToken");
        axios
          .post(
            `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json?&auth=${token}`,
            {
              ...information,
              data: {
                ...information.data,
                invoice_id: qrData?.invoice_id,
                orderNumber: orderNumber,
              },
            }
          )
          .then((res2) => {
            if (res2.data.name) {
              email(information.data);
            }
          })
          .catch((err) => {
            message.error("Амжилтгүй сервер дээр алдаа гарлаа!");
          });
      }
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
        (res) => {},
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
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Захиалагчийн мэдээлэл",
      content: (
        <div style={{ padding: "20px 40px" }}>
          <Form
            form={form}
            name="normal_login"
            initialValues={{
              remember: true,
              cartTotals: 0,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onChange={onChangeForm}
            autoComplete="off"
            layout="vertical"
            size="middle"
          >
            <Row gutter={20}>
              <Col xs={24} xl={12}>
                <Form.Item
                  label={<div className="fw-normal fs-6">Захиалагчийн нэр</div>}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    allowClear
                    placeholder="Захиалагчийн нэр"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item
                  label={<div className="fw-normal fs-6">Е-мэйл хаяг</div>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    allowClear
                    placeholder="Е-мэйл хаяг"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} xl={12}>
                <Form.Item
                  label={<div className="fw-normal fs-6">Утасны дугаар</div>}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Утасны дугаар"
                    prefix={<PhoneOutlined rotate={90} />}
                    allowClear
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item
                  label={<div className="fw-normal fs-6">Байгууллагын нэр</div>}
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company name!",
                    },
                  ]}
                >
                  <Input allowClear placeholder="Байгууллагын нэр" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={<div className="fw-normal fs-6">Байршил</div>}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <TextArea
                placeholder="Байршил"
                prefix={<EnvironmentOutlined />}
                allowClear
                style={{ height: "100px" }}
                showCount
              />
            </Form.Item>
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
                Таны хувийн мэдээллийг таны захиалгыг боловсруулах, энэ вэб
                сайтын туршлагыг дэмжих болон манай нууцлалын бодлогод заасан
                бусад зорилгоор ашиглах болно.
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit" size="large">
                Захиалга өгөх
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Төлбөр",
      content: (
        <div style={{ padding: "20px 40px" }}>
          <Row gutter={20}>
            <Col xs={24} xl={12}>
              <div
                style={{
                  fontWeight: "500",
                  color: "#1b231f",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
              >
                Захиалга
              </div>
              <Flex
                gap={15}
                vertical
                style={{
                  fontWeight: "500",
                  paddingRight: "10px",
                  marginBottom: "24px",
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
                    {localData?.[0].date[0] + " - " + localData?.[0].date[1]}
                  </div>
                </Flex>
                <Flex
                  justify="space-between"
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "15px",
                  }}
                >
                  <div>Автобус: </div>
                  <div className="text-uppercase">{bus?.busName}</div>
                </Flex>
                <Flex
                  justify="space-between"
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "15px",
                  }}
                >
                  <div>Өдөр: </div>
                  <div>{orderDays}</div>
                </Flex>

                <Flex
                  justify="space-between"
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "15px",
                  }}
                >
                  <div>Суудлын тоо: </div>
                  <div>{localData?.[0].person}</div>
                </Flex>
                <Flex
                  justify="space-between"
                  style={{
                    paddingBottom: "15px",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  <div>Нийт үнэ: </div>
                  <div>
                    {(bus?.price * orderDays)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ₮
                  </div>
                </Flex>
              </Flex>
            </Col>
            <Col xs={24} xl={12}>
              <div
                style={{
                  color: "#1b231f",
                  borderLeft: "1px solid #ccc",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isWideScreen ? "" : "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        color: "#1b231f",
                        fontSize: "18px",
                        textTransform: "capitalize",
                      }}
                    >
                      QR кодоор төлөх
                    </div>
                    <Image
                      preview={true}
                      src={"data:image/png;base64," + qrData?.qr_image}
                      alt="Munhiinh daambe xxk"
                      width={200}
                      height={200}
                    />
                    <div style={{ color: "#949191", marginTop: "10px" }}>
                      {" "}
                      Захиалгын дүн
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "19px" }}>
                      {(bus?.price * orderDays)
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      ₮
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      marginTop: isWideScreen ? "0px" : "20px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                        color: "#1b231f",
                        lineHeight: "22px",
                        fontSize: "18px",
                        textTransform: "capitalize",
                        marginBottom: "5px",
                      }}
                    >
                      Дансаар шилжүүлэх
                    </div>
                    <div style={{ width: "100%", padding: "5px 10px" }}>
                      <Segmented
                        onChange={(e) => setSegment(e)}
                        block
                        style={{ background: "#e5e5e5" }}
                        options={[
                          {
                            label: (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "2px 0px",
                                }}
                              >
                                <Avatar
                                  src="https://shoppy.mn/6c9e352b03a264120e020b343ccfa2ee.svg"
                                  size={"small"}
                                ></Avatar>
                                <div style={{ fontWeight: "500" }}>
                                  Хаан банк
                                </div>
                              </div>
                            ),
                            value: 0,
                          },
                          {
                            label: (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "2px 0px",
                                }}
                              >
                                <Avatar
                                  size={"small"}
                                  src="https://shoppy.mn/6694474afda69dbb6b09a10c63bd5f9f.svg"
                                />
                                <div style={{ fontWeight: "500" }}>
                                  TDB банк
                                </div>
                              </div>
                            ),
                            value: 1,
                          },
                        ]}
                      />
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Хүлээн авах данс
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {segmentValue === 0
                              ? "530 101 9298"
                              : "456 108 617"}
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: "5301019298",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Хүлээн авагч
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>Амарбаяр</div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: "Амарбаяр",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Захиалгын дүн
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {(bus?.price * orderDays)
                              .toFixed(0)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ₮
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: bus?.price * orderDays,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          padding: "10px 15px",
                          marginTop: "10px",
                          lineHeight: "15px",
                          borderRadius: "10px",
                          border: "1px solid #dfdfdf",
                        }}
                      >
                        <div
                          style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Гүйлгээний утга
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {orderNumber}
                          </div>
                          <Paragraph
                            style={{ marginBottom: "0px" }}
                            copyable={{
                              text: orderNumber,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Alert
                  message={
                    <span>
                      Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг
                      анхаараарай! Төлбөрийг дээрх дансанд шилжүүлэх ба
                      захиалгын <strong>{orderNumber}</strong> дугаарыг
                      гүйлгээний утга дээр бичнэ үү. Мөн та өөрийн банкны
                      аппликейшныг ашиглан QR кодыг уншуулж төлбөр төлөх
                      боломжтой.
                    </span>
                  }
                  type="warning"
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: "400",
                    textAlign: "justify",
                    padding: "15px 30px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "500",
                      color: "#1b231f",
                      fontSize: "18px",
                    }}
                  >
                    Цахим хэтэвчээр төлөх
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {qrData?.urls?.slice(0, 6).map((e, i) => (
                      <a href={e.link} key={i}>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            width: "100%",
                            border: "1px solid #dfdfdf",
                            margin: "5px 0px",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            color: "#475569",
                            background: "#fff",
                            textTransform: "capitalize",
                          }}
                        >
                          <div>
                            <Image
                              src={e.logo}
                              preview={false}
                              alt="obortech"
                              width={25}
                              style={{
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            <div>{e.description}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Баталгаажуулах",
      content: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "20px 40px",
          }}
        >
          <Result
            status="success"
            title="Таны захиалга амжилттай төлөгдлөө!"
            subTitle={`Order number: ${qrData?.invoice_id} Cloud server configuration takes 1-5 minutes, please wait.`}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => router.push("/")}
              >
                Үндсэн цэс руу буцах
              </Button>,
            ]}
          />
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
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
                    <h3 className="title">Төлбөрын хуудас</h3>
                    <p>
                      <i className="far fa-map-marker-alt" />
                      Улаанбаатар хот
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
                          <span>Автобус</span>
                          {!bus ? <Skeleton.Button active /> : null}
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
                          <span>Хугацаа</span>
                          {!bus ? (
                            <Skeleton.Button active />
                          ) : (
                            <>{orderDays ? orderDays : 1} өдөр</>
                          )}
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
                          <span>Үнэ</span>
                          {!bus ? (
                            <Skeleton.Button active />
                          ) : (
                            <>
                              {(bus?.price * orderDays)
                                .toFixed(0)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              ₮
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Steps current={current} items={items} />
              <div style={contentStyle}>
                {steps[current]?.content || (
                  <div>
                    {" "}
                    <Result
                      status="success"
                      title="Таны захиалга амжилттай төлөгдлөө!"
                      subTitle={`Order number: ${qrData?.invoice_id} Cloud server configuration takes 1-5 minutes, please wait.`}
                      extra={[
                        <Button
                          type="primary"
                          key="console"
                          onClick={() => router.push("/")}
                        >
                          Үндсэн цэс руу буцах
                        </Button>,
                      ]}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                {/* {current < steps.length - 1 ||
                  (current === 0 && (
                    <Button type="primary" onClick={() => next()}>
                      Next
                    </Button>
                  ))} */}

                {/* {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )} */}
                {/* {current > 0 && current === 1 && (
                  <Button
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )} */}
              </div>
            </div>
            <div style={{ marginBottom: "140px" }}></div>
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
