import React, { useContext, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DashboardFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DashboardComponent from "@/src/components/dashboard/DashboardComponent/dashboardCompenent";
import TourComponent from "@/src/components/dashboard/TourComponent/tourComponent";
import { useRouter } from "next/router";
import MainContext from "@/src/components/context/mainContext/mainContext";
import Bus from "@/src/components/dashboard/Bus";
import OrderHistory from "@/src/components/dashboard/OrderHistory";
const { Header, Content, Sider } = Layout;
const items1 = [
  { key: 0, label: "Үндсэн цэс" },
  { key: 1, label: "Test" },
];
const items = [
  { key: 0, icon: DashboardFilled, label: "Хяналтын самбар" },
  { key: 1, icon: "bus", label: "Автобус" },
  { key: 2, icon: DashboardFilled, label: "Захилгын түүх" },
  { key: 3, icon: LogoutOutlined, label: "Гарах" },
];
const items2 = items.map((data, index) => {
  return {
    key: index,
    icon:
      data.icon === "bus" ? (
        <i className="far fa-bus fw-bold " />
      ) : (
        React.createElement(data.icon)
      ),
    label: data.label,
    // children: new Array(4
    //   ).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    // }),
  };
});
const Dashboard = () => {
  const [MenuToogle, setMenuToogle] = useState("0");
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const ClickMenu = (event) => {
    console.log("event: ", event);
    if (event.key === "3") {
      mainContext.logout();
      router.push("/");
    }
    setMenuToogle(event.key);
  };
  const HdrMenu = (event) => {
    if (event.key === "0") {
      router.push("/");
    }
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: " rgba(255,255,255,.2)",
            height: "32px",
            borderRadius: "6px",
            width: "125px",
            marginRight: "25px",
          }}
        ></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          onClick={HdrMenu}
        />
      </Header>

      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={ClickMenu}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "84vh",
              background: colorBgContainer,
            }}
          >
            {MenuToogle === "0" ? (
              <DashboardComponent />
            ) : MenuToogle === "1" ? (
              <Bus />
            ) : MenuToogle === "2" ? (
              <OrderHistory />
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
