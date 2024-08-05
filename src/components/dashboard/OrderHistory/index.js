import { Button, Image, Input, Select, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
// import Paragraph from "antd/es/skeleton/Paragraph";

const OrderHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [getData, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [busList, setBusList] = useState();
  const [filterBus, setFilterBus] = useState("");
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getOrderHistory();
      getBus();
    }
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

  const data = getData
    .filter((item) => {
      return filterBus.toLowerCase() === ""
        ? item
        : item?.busName?.toLowerCase().includes(filterBus.toLowerCase());
    })
    .map((e, i) => ({
      key: i,
      busName: e.busName,
      username: e.username,
      companyName: e.companyName,
      totalPrice: e.totalPrice,
      person: e.person,
      status: e.status,
      startDate: e.startDate,
      endDate: e.endDate,
      from: e.from,
      to: e.to,
      action: e,
      allData: e,
    }));

  const getOrderHistory = () => {
    setLoadingTable(true);
    // const token = localStorage.getItem("idToken");
    axios
      .get(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/orderHistory.json`
      )
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        const mapdata = [];
        data.forEach((element) => {
          mapdata.push({ ...element[1].data, id: element[0] });
        });
        setData(mapdata);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "key",
      width: "50px",
      ellipsis: true,
    },
    {
      title: "Эхлэх огноо",
      dataIndex: "startDate",
      key: "startDate",
      ellipsis: true,
      ...getColumnSearchProps("startDate"),
    },
    {
      title: "Төгсөх огноо",
      dataIndex: "endDate",
      key: "endDate",
      ellipsis: true,
      ...getColumnSearchProps("endDate"),
    },
    {
      title: "Автобус нэр",
      dataIndex: "busName",
      key: "busName",
      ellipsis: true,
      ...getColumnSearchProps("busName"),
    },
    {
      title: "Компани",
      dataIndex: "companyName",
      key: "companyName",
      ellipsis: true,
      ...getColumnSearchProps("companyName"),
    },
    {
      title: "Нэр",
      dataIndex: "username",
      key: "username",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Суудалын тоо",
      dataIndex: "person",
      key: "person",
      width: "150px",
      ellipsis: true,
      ...getColumnSearchProps("person"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
      render: (a) => (
        <div style={{ display: "flex" }}>
          {/* <Paragraph copyable={{text: a }}></Paragraph> */}
          <div style={{ paddingLeft: "5px" }}>{a}</div>
        </div>
      ),
    },
    {
      title: "Ханаас",
      dataIndex: "from",
      key: "from",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("from"),
    },
    {
      title: "Хүртэл",
      dataIndex: "to",
      key: "to",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("to"),
    },

    {
      title: "Үнэ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "150px",
      ellipsis: true,
      // fixed: "right",
      ...getColumnSearchProps("totalPrice"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
      render: (a) => (
        <div style={{ display: "flex" }}>
          {/* <Paragraph copyable={{text: a }}></Paragraph> */}
          <div style={{ paddingLeft: "5px" }}>
            {a?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
          </div>
        </div>
      ),
    },
    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "100px",
      // fixed: "right",
      render: (action) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <Edit data={action} getOrderHistory={getOrderHistory} info={action} /> */}
          <Delete data={action?.id} getOrderHistory={getOrderHistory} />
        </div>
      ),
    },
  ];
  const onChange = (value) => {
    setFilterBus(value ? value : "");
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div>
      {/* <SidebarBreadCumb title="Нохой нэмэх" /> */}
      <section>
        <div>
          {console.log("getData: ", getData)}
          <div>
            <Select
              allowClear
              showSearch
              placeholder="Автобус сонгох"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={busList?.map((e) => ({
                value: e[1].data.busName,
                label: e[1].data.busName,
              }))}
              style={{ width: "200px" }}
            />
          </div>
          <div>
            <Table
              columns={columns}
              bordered
              dataSource={data}
              scroll={{ y: 600, x: 1200 }}
              loading={loadingTable}
              pagination={{
                total: 0,
                showTotal: (total) => `Нийт: ${total} `,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default OrderHistory;
