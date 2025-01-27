import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Row, Col } from 'antd';
import axios from 'axios';

function Profile() {
  const loggedInEmail = 'admin@fuelapp.com'; // Example logged-in user email
  const [form] = Form.useForm(); // Ant Design Form instance
  const [loading, setLoading] = useState(false); // To show loading state
  const [adminData, setAdminData] = useState(null); // To store fetched admin data

  useEffect(() => {
    // Fetch admin data when component mounts
    axios.get('http://localhost:8080/api/v1/getadmin')
      .then((response) => {
        const admin = response.data.find(admin => admin.email === loggedInEmail);
        if (admin) {
          setAdminData(admin); // Save the fetched data to the state
          form.setFieldsValue({
            userName: admin.userName, // Set username
            email: admin.email, // Set email
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
        message.error('Failed to fetch data');
      });
  }, [loggedInEmail, form]);

  // Handle form submission (to update data)
  const handleSubmit = (values) => {
    setLoading(true); // Set loading state while updating
    const updatedAdmin = { ...values };

    // Send PUT request to update the admin data
    axios.put(`http://localhost:8080/api/v1/updateadmin/${loggedInEmail}`, updatedAdmin)
      .then(() => {
        message.success('Profile updated successfully!');
        setAdminData(updatedAdmin); // Update the stored data after successful update
      })
      .catch(() => {
        message.error('Failed to update profile');
      })
      .finally(() => setLoading(false)); // Stop loading after update
  };

  // Reset the form to its initial state (fetched data)
  const handleReset = () => {
    if (adminData) {
      form.setFieldsValue({
        userName: adminData.userName,
        email: adminData.email,
      });
    }
  };

  return (
    <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        size="middle"
        style={{ width: "75%", marginLeft: "3rem", gap: "2rem" }}
      >
        <Form.Item
          name="userName"
          label="Username"
          labelCol={{ span: 8 }} 
          wrapperCol={{ span: 16 }} 
          style={{ marginBottom: '2rem' }} 
          rules={[{ required: true, message: 'Username is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          labelCol={{ span: 8 }} 
          wrapperCol={{ span: 16 }} 
          style={{ marginBottom: '2rem' }}
          rules={[
            { required: true, message: 'Email is required!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{marginTop: "4rem"}}
        >
          <Row gutter={30}>
            <Col>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Col>
            <Col>
              <Button type="default" onClick={handleReset} loading={loading}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

  );
}

export default Profile;
