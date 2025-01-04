import '../styles/headerbar.css';
import { UserOutlined } from '@ant-design/icons';

function Headerbar({ headerTitle, userName }) {
    
  return (
    <div className="header">
      <h1 className="header-title">{headerTitle}</h1>
      <div className="user-info">
      <UserOutlined className="user-icon" />
      <span className="user-name">{userName}</span>
      </div>
    </div>

  );
}

export default Headerbar;
