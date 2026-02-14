import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

const iconStyle = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyle} />,
  info: <AiOutlineInfoCircle style={iconStyle} />,
  warning: <AiOutlineWarning style={iconStyle} />,
  error: <AiOutlineClockCircle style={iconStyle} />,
};

const Notification = ({ type = "info", message, onClose }) => {
  return (
    <div className={`notifiation ${type}`}>
      <p>{icons[type]}</p>
      <p>{message}</p>
      <AiOutlineClose color="white" className="closeBtn" onClose={onClose} />
    </div>
  );
};

export default Notification;
