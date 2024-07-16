import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Upload,
  message,
} from "antd";
import { useState } from "react";

import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Add = ({ getBus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [btnLoad, setBtnLoad] = useState(false);

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
      <div style={{ marginTop: 8 }}>Зураг</div>
    </div>
  );
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (fileList.length === 0) {
      message.error("Зураг заавал оруулна уу!");
    } else {
      setBtnLoad(true);
      const token = localStorage.getItem("idToken");
      const img = [];
      fileList.forEach((element) => {
        getBasee64(element.originFileObj, (imageUrl) => img.push(imageUrl));
      });

      const body = {
        localId: localStorage.getItem("localId"),
        data: {
          busName: values.busName,
          description: values.description,
          price: values.price,
          adventages: values.adventages,
          chairNumber: values.chairNumber,
          title: values.title,
          img: img,
        },
      };
      setTimeout(() => {
        axios
          .post(
            `https://eagle-festival-2c130-default-rtdb.firebaseio.com/bus.json?&auth=${token}`,
            body
          )
          .then((res) => {
            if (res.data.name) message.success("Амжилттай");
            getBus();
            setIsModalOpen(false);
          })
          .catch((err) => {
            message.error("Амжилтгүй");
            setIsModalOpen(false);
          })
          .finally(() => {
            setBtnLoad(false);
          });
      }, 800);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        size="middle"
        style={{ marginBottom: "10px", marginLeft: "10px", marginTop: "10px" }}
      >
        + Автобус нэмэх
      </Button>
      <Modal
        title="Нэмэх"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          disabled={btnLoad}
          size="middle"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
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
              {
                required: true,
                message: "Дэлгэрэнгуй мэдээлэл ээ оруулна уу!",
              },
            ]}
          >
            <TextArea
              placeholder="Дэлгэрэнгуй"
              showCount
              allowClear
              style={{ height: "300px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
              loading={btnLoad}
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
export default Add;
