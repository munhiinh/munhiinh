import { Button, Form, Input, InputNumber, Modal, Upload, message  } from "antd";  
import { useState } from "react"; 
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
 
const Add = ({getTourList}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState(''); 
    const [fileList, setFileList] = useState([]);

    const [btnLoad, setBtnLoad] = useState(false);

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
      
    const uploadButton = (<div><PlusOutlined /><div style={{marginTop: 8}}>Зураг</div></div>);
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {    
    if(fileList.length === 0){
        message.error("Зураг заавал оруулна уу!")
    }else{ 
      setBtnLoad(true); 
      const token = localStorage.getItem("idToken");
      const img = []; 
      fileList.forEach(element => { 
         getBasee64(element.originFileObj, imageUrl =>
           img.push(imageUrl), 
        );
      });
        const body = {
            localId: localStorage.getItem("localId"),
            values: {
                title: values.title, 
                description: values.description, 
                img: img
            }
        } 
        console.log("body: ", body);
        setTimeout(()=>{
          axios.post(`https://eagle-festival-2c130-default-rtdb.firebaseio.com/tourList.json?&auth=${token}`, body).then((res)=>{
            if(res.data.name)
            message.success("Амжилттай") 
            getTourList();
            setIsModalOpen(false);
            //   props.getRegistrationList()
        }).catch((err)=>{ 
            message.error("Амжилтгүй")
            setIsModalOpen(false);
        }).finally(()=>{
          setBtnLoad(false);
        })
        },800) 
    } 
    };
    
    return<div>
       <Button type="primary" onClick={showModal} size="middle" style={{marginBottom: "10px", marginLeft: "10px", marginTop: "10px"}}>
            + нэмэх
      </Button> 
      <Modal title="Нэмэх" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form size="middle"  initialValues={{ remember: true, }}  onFinish={onFinish} style={{marginTop: "20px"}}>
          <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange} 
            >
              {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
              <img alt="example"style={{width: '100%',}}src={previewImage}/>
          </Modal>  
          <Form.Item label="Гарчиг" name="title" rules={[{ required: true, message: 'Гарчиг аа оруулна уу!'}]}>
              <Input placeholder="Гарчиг" allowClear/>
          </Form.Item>
        
          <Form.Item label="Дэлгэрэнгуй" name="description" rules={[ { required: true, message: 'Дэлгэрэнгуй мэдээлэл ээ оруулна уу!'}]}>
              <TextArea placeholder="Дэлгэрэнгуй" showCount allowClear />
          </Form.Item> 
          <Form.Item>
              <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}} loading={btnLoad}> Хадгалах </Button> 
          </Form.Item>
      </Form>
      </Modal>
    </div>
}
export default Add;