import MainContext from "@/src/components/context/mainContext/mainContext";
import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { Button, DatePicker, Form, Input } from "antd";
import Link from "next/link";
import { useContext, useState } from "react";

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

const OurBus = () => {
  const mainContext = useContext(MainContext);
  const [form] = Form.useForm();
  const [date, setDate] = useState();

  const onRangeChange = (dates, dateStrings) => {
    setDate(dateStrings);
  };

  const onFinish = (values) => {
    console.log("object", values);
    if (date && date.length === 2) {
      const startDateRange = date[0];
      const endDateRange = date[1];

      // Function to check if a date is within any booked interval
      const isDateBooked = (checkDate) => {
        return data.some((item) => {
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
        console.log("zahialagdsan bn");
        // Handle accordingly, e.g., show a message or disable further actions
      } else {
        console.log("zahialagdaaq.");
        // Proceed with your logic for an available date range
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
          <div className="booking-form-wrapper p-r z-2">
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
            >
              <Form.Item
                label={<div className="fw-medium">FROM</div>}
                name="from"
                rules={[
                  {
                    required: true,
                    message: "Please input your FROM!",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>

              <Form.Item
                label={<div className="fw-medium">TO</div>}
                name="to"
                rules={[
                  {
                    required: true,
                    message: "Please input your TO!",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>

              <Form.Item
                label={<div className="fw-medium">DATE</div>}
                name="date"
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
                >
                  find my journey
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
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6 col-sm-12 places-column">
              {/*=== Single Place Item ===*/}
              <div className="single-place-item mb-60 wow fadeInUp">
                <div className="place-img ">
                  <img
                    src="assets/images/hero/bus2.png"
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
                        <a>Sitting on Boat Spreading Her Arms</a>
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
                        <i className="far fa-usd-circle" />
                        403.000₮
                      </span>
                      <span>
                        <i className="far fa-user" />
                        60
                      </span>
                      <span>
                        <Link legacyBehavior href="/bus-details">
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
            <div className="col-xl-4 col-md-6 col-sm-12 places-column">
              {/*=== Single Place Item ===*/}
              <div className="single-place-item mb-60 wow fadeInUp">
                <div className="place-img ">
                  <img
                    src="assets/images/hero/bus2.png"
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
                        <a>Sitting on Boat Spreading Her Arms</a>
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
                        <i className="far fa-usd-circle" />
                        403.000₮
                      </span>
                      <span>
                        <i className="far fa-user" />
                        60
                      </span>
                      <span>
                        <Link legacyBehavior href="/bus-details">
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
            <div className="col-xl-4 col-md-6 col-sm-12 places-column">
              {/*=== Single Place Item ===*/}
              <div className="single-place-item mb-60 wow fadeInUp">
                <div className="place-img ">
                  <img
                    src="assets/images/hero/bus2.png"
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
                        <a>Sitting on Boat Spreading Her Arms</a>
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
                        <i className="far fa-usd-circle" />
                        403.000₮
                      </span>
                      <span>
                        <i className="far fa-user" />
                        60
                      </span>
                      <span>
                        <Link legacyBehavior href="/bus-details">
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
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/*=== Gowilds Pagination ===*/}
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
          </div>
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
