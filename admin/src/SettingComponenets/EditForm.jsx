import React from 'react'
import { Button, Form, Input, Space } from 'antd';

const EditForm = () => {
  return (
    <div>
      <Form name="validateOnly" layout="vertical" autoComplete="off">
        <Form.Item
            name="email"
            label="Email"
            rules={[
                { required: true,},
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name=""
            label="Age"
            rules={[
            { required: true, },
            ]}
        >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button >Submit</Button>
          
        </Space>
      </Form.Item>
    </Form>
    </div>
  )
}

export default EditForm
