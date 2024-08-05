import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const Delete = (props) => {
  const deleteFunc = () => {
    const token = localStorage.getItem("idToken");
    axios
      .delete(
        `https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus/${props.data}.json?&auth=${token}`
      )
      .then((res) => {
        message.success("Амжилттай устлаа");
        props.getBus();
      })
      .catch((err) => {
        props.getBus();
      });
  };

  return (
    <div>
      <Popconfirm title="Устгахдаа итгэлтэй байна уу?" onConfirm={deleteFunc}>
        <Button
          type="primary"
          size="small"
          icon={<DeleteOutlined style={{ display: "block" }} />}
          danger
        ></Button>
      </Popconfirm>
    </div>
  );
};
export default Delete;
