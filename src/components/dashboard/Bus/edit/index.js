import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Edit = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getInfo, setInfo] = useState({});
  const [fileList, setFileList] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [disTable, setTable] = useState(false);

  const handleCancelImg = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = (file) => {
    setFileList(file.fileList);
  };

  function getBasee64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Зураг
      </div>
    </div>
  );
  const showModal = () => {
    console.log("props: ", props.info);
    if (props.info.img.length === 1) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
      ]);
    } else if (props.info.img.length === 2) {
      console.log("2r dohi: ");
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
      ]);
    } else if (props.info.img.length === 3) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
        {
          uid: "-3",
          name: "image3.png",
          status: "done",
          thumbUrl: props.info.img[2],
        },
      ]);
    } else if (props.info.img.length === 4) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          thumbUrl: props.info.img[0],
        },
        {
          uid: "-2",
          name: "image2.png",
          status: "done",
          thumbUrl: props.info.img[1],
        },
        {
          uid: "-3",
          name: "image3.png",
          status: "done",
          thumbUrl: props.info.img[2],
        },
        {
          uid: "-4",
          name: "image4.png",
          status: "done",
          thumbUrl: props.info.img[3],
        },
      ]);
    }
    console.log("info ", props.info);
    setInfo(props.info);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const token = localStorage.getItem("idToken");
    const img = [];
    fileList.forEach((element) => {
      if (element.originFileObj) {
        getBasee64(element.originFileObj, (imageUrl) => img.push(imageUrl));
      } else {
        img.push(element.thumbUrl);
      }
    });
    const body = {
      localId: localStorage.getItem("localId"),
      data: {
        description: values.description,
        busName: values.busName,
        price: values.price,
        adventages: values.adventages,
        chairNumber: values.chairNumber,
        title: values.title,
        img: img,
      },
    };
    setTable(true);
    setTimeout(() => {
      const body = {
        localId: localStorage.getItem("localId"),
        data: {
          description: values.description,
          busName: values.busName,
          price: values.price,
          adventages: values.adventages,
          chairNumber: values.chairNumber,
          title: values.title,
          img: img,
        },
      };
      axios
        .patch(
          `https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus/${props.data}.json?&auth=${token}`,
          body
        )
        .then((res) => {
          if (res.data.name) message.success("Амжилттай");
          props.getBus();
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log("err: ", err);
          message.error("error");
          setIsModalOpen(false);
        })
        .finally(() => {
          setTable(false);
        });
    }, 800);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="small"
        icon={<EditOutlined style={{ display: "block" }} />}
      ></Button>
      <Modal
        title="Registation add"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          disabled={disTable}
          size="middle"
          initialValues={{
            remember: true,
            busName: getInfo.busName,
            adventages: getInfo.adventages,
            price: getInfo.price,
            chairNumber: getInfo.chairNumber,
            description: getInfo.description,
            img: getInfo.img ? getInfo.img[0] : "",
          }}
          onFinish={onFinish}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImg}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <Form.Item
            label="Автобус нэр"
            name="busName"
            rules={[{ required: true, message: "Автобус нэр ээ оруулна уу!" }]}
          >
            <Input placeholder="Автобус нэр" allowClear />
          </Form.Item>
          <Form.Item
            label="Гарчиг"
            name="title"
            rules={[{ required: true, message: "Гарчиг aa оруулна уу!" }]}
          >
            <Input placeholder="Гарчиг" allowClear />
          </Form.Item>
          <Form.Item
            label="Суудалын тоо"
            name="chairNumber"
            rules={[{ required: true, message: "Суудалын тоо оруулна уу!" }]}
          >
            <InputNumber
              placeholder="Суудалын тоо"
              allowClear
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Үнэ"
            name="price"
            rules={[{ required: true, message: "Үнэ ээ оруулна уу!" }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
          >
            <InputNumber
              style={{ width: "100%" }}
              className="w-full"
              defaultValue={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              placeholder="Үнэ"
            />
          </Form.Item>
          <Form.List name="adventages">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="" key={key}>
                    <Row gutter={22}>
                      <Col span={20}>
                        <Form.Item
                          {...restField}
                          label="Давуу тал"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 22 }}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Missing key" }]}
                          // className="col-span-5"
                        >
                          <Input placeholder="Давуу тал" className="w-full" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  </div>
                ))}
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Давуу тал
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            label="Дэлгэрэнгуй"
            name="description"
            rules={[
              { required: true, message: "Дэлгэрэнгуй мэдээлэлээ оруулна уу!" },
            ]}
          >
            <TextArea
              allowClear
              placeholder="Дэлгэрэнгуй"
              showCount
              style={{ height: "250px" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
              loading={disTable}
            >
              {" "}
              Хадгалах{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Edit;
