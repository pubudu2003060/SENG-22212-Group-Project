import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      message.error('New password and confirm new password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/changePassword', {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        message.success('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        message.error('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Failed to change password. Please try again.');
    }
  };

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <Form 
        layout="vertical" 
        onFinish={handlePasswordChange}
        style={{ width: '75%', marginLeft: '2rem' }}
        >
      <Form.Item label="Current Password">
        <Input.Password
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="New Password">
        <Input.Password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Confirm New Password">
        <Input.Password
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '1rem' }}>
          Change Password
        </Button>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ChangePassword;
