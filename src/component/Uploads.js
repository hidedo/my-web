import React, {Component} from 'react';
import { Upload, Icon, message, Radio ,Form, Button} from 'antd';
import axios from 'axios'
import BaseUrl from '../baseUrl'



class Uploads extends Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const formData = new FormData();
                for (let i in values.dragger){
                    formData.append('dragger',values.dragger[i].originFileObj)
                }

                formData.append("radio-group",values['radio-group']);
                axios.post(`${BaseUrl.url}/upload`, formData).then( res => {
                    if(res.data.status === 'success'){
                        this.props.form.resetFields();
                        message.success(` file uploaded successfully.`);
                    }
                }).catch( err => console.log(err))
            }
        });

    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const props2 = {
            multiple:true,
            name: 'dragger',
            action: `${BaseUrl.url}/uploadFile`,
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };



        const props1 = {
            multiple:true,
            beforeUpload:()=>{//被form接管提交操作
                return false
            },

        };
        return (
            <div>
                <p>图片上传：</p>
                <Form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                <Form.Item>
                    {getFieldDecorator('radio-group',{ initialValue: 1, })(
                        <Radio.Group >
                            <Radio value={1}>index-pic</Radio>
                            <Radio value={2}>project-pic</Radio>
                            <Radio value={3}>double-pic</Radio>
                            <Radio value={4}>diary-pic</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('dragger', {

                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules:[
                            {
                                required: true,
                                message: '请选择图片',
                            }
                        ]
                    })(
                        <Upload.Dragger {...props1}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 1, offset: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
                <p>conf,text上传：</p>
                <br/>
                <Upload {...props2}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>



        )
    }
}

Uploads = Form.create({})(Uploads)

export default Uploads;