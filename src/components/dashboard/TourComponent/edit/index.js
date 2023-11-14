import { Button, Form, Input, InputNumber, Modal, Upload, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
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
const Edit = (props) =>{ 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getInfo, setInfo] = useState({});
    const [fileList, setFileList] = useState([]);
      
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');


    const handleCancelImg = () => setPreviewOpen(false);
    const handlePreview = async (file) => { 
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = (file) => {  
        setFileList(file.fileList) 
    };
    
    function getBasee64(img, callback) { 
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
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
      if(props.info.img.length === 1){
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            thumbUrl:  props.info.img[0],
          }, 
        ]);
      } else if(props.info.img.length === 2){
        console.log("2r dohi: ");
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
        ]);
      }else if(props.info.img.length === 3){
        setFileList([
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
          {
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            thumbUrl:  props.info.img[2],
          }, 
        ]);
      }else if(props.info.img.length === 4){
        setFileList([
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              thumbUrl:  props.info.img[0],
          }, 
          {
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            thumbUrl:  props.info.img[1],
          }, 
          {
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            thumbUrl:  props.info.img[2],
          }, 
          {
            uid: '-4',
            name: 'image4.png',
            status: 'done',
            thumbUrl:  props.info.img[3],
          }, 
        ]);
      }
      
      setInfo(props.info)
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {  
      const token = localStorage.getItem("idToken");
      const img = []; 
      fileList.forEach(element => {   
        if(element.originFileObj){ 
          getBasee64(element.originFileObj, imageUrl =>
            img.push(imageUrl), 
         );
        }else{ 
          img.push(element.thumbUrl)
        } 
      });
        const body = { 
          localId: localStorage.getItem("localId"),
          values: { 
            description: values.description, 
            title: values.title, 
            img: img
          }
        }
        console.log("body: ", body);
      setTimeout(() => { 
        const body = { 
          localId: localStorage.getItem("localId"),
          values: { 
            description: values.description, 
            title: values.title, 
            img: img
          }
      } 
      axios.patch(`https://eagle-festival-2c130-default-rtdb.firebaseio.com/tourList/${props.data}.json?&auth=${token}`, body).then((res)=>{   
        if(res.data.name)
          message.success("Амжилттай") 
          props.getTourList();
          setIsModalOpen(false);
         
      }).catch((err)=>{ 
          console.log("err: ", err);
          message.error("error")
          setIsModalOpen(false);
      }) 
      }, 800); 
     
  
    };
    return<div>
       <Button type="primary" onClick={showModal} size="small" icon={<EditOutlined style={{display: "block"}}/>}></Button>
        <Modal title="Registation add" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form  size="middle" initialValues={{ remember: true,
                  title: getInfo.title,  
                  description: getInfo.description,  
                  img:  getInfo.img ? getInfo.img[0] : "",
                }}  onFinish={onFinish} >
            <Upload 
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange} 
            >
              {fileList.length >= 5 ? null : uploadButton}
          </Upload> 
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
              <img alt="example"style={{width: '100%',}}src={previewImage}/>
          </Modal>  
            <Form.Item label="Гарчиг" name="title" rules={[{ required: true, message: ' Гарчиг гаа оруулна уу!'}]}>
                <Input placeholder="Гарчиг" />
            </Form.Item> 
            <Form.Item label="Дэлгэрэнгуй" name="description" rules={[ { required: true, message: 'Дэлгэрэнгуй мэдээлэлээ оруулна уу!'}]}>
              <TextArea placeholder="Дэлгэрэнгуй" showCount/>
            </Form.Item> 

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}> Хадгалах </Button> 
            </Form.Item>
        </Form>
        </Modal>
    </div>
}
export default Edit;