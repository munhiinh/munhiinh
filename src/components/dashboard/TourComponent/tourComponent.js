import { Button, Image, Input, Space, Table } from "antd"; 
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons"; 
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
// import Paragraph from "antd/es/skeleton/Paragraph";


const TourComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [getData, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    const localId = localStorage.getItem("localId");
    if (localId) {
      getTourList();
    }
  }, []);
  const data = getData.map((e, i) => ({
    key: i,
    title: e[1].values ? e[1].values.title : "", 
    description: e[1].values ? e[1].values.description : "", 
    img: e[1].values ? (e[1].values.img ? e[1].values.img[0] : "") : "",
    action: e,
    allData: e,
  }));
  const getTourList = () => {
    setLoadingTable(true);
    // const token = localStorage.getItem("idToken"); 
    axios
      .get(`https://eagle-festival-2c130-default-rtdb.firebaseio.com/tourList.json`)
      .then((res) => {
        const data = Object.entries(res.data).reverse();
        setData(data);
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
      title: "Гарчиг",
      dataIndex: "title",
      key: "title",
      width: "100px",
      ellipsis: true,
      ...getColumnSearchProps("title"),
    },
    
    {
      title: "Зураг",
      dataIndex: "img",
      key: "img",
      width: "80px",
      render: (img) => (
        <div>
          <Image src={img} width={50} />
        </div>
      ),
      ellipsis: true,
    },  
    {
      title: "Дэлгэрэнгуй",
      dataIndex: "description",
      key: "description",
      width: "150px",
      ellipsis: true,
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
        render: (a)=> <div style={{display: "flex"}}>
                        {/* <Paragraph copyable={{text: a }}></Paragraph> */}
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
    },
    {
      title: "Үйлдэл",
      dataIndex: "allData",
      key: "allData",
      width: "100px",
      fixed: "right",
      render: (action) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Edit
            data={action[0]}
            getTourList={getTourList}
            info={action[1].values}
          />
          <Delete data={action[0]} getTourList={getTourList} />
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* <SidebarBreadCumb title="Нохой нэмэх" /> */}
      <section  >
        <div> 
            <div> 
              <Add getTourList={getTourList}/>
              <Table
                columns={columns}
                bordered
                dataSource={data}
                scroll={{ y: 600, x: 1200 }}
                loading={loadingTable}
                pagination={{
                  total: 0,
                  showTotal: (total) => `Нийт: ${total} - Нохой`,
                }}
              />
            </div> 
        </div>
      </section>
    </div>
  );
};
export default TourComponent;
