const Notification = ({ message}) => {
  
    if (!message) {
      return null
    }

    const notificationStyle = {
      color: 'white',
      background: '#4CAF50',
      fontSize: 16,
      border: '2px solid #4CAF50',
      borderRadius: 5,
      padding: '10px 15px',
      margin: '10px 0',
    };

    return (
      <div style={notificationStyle}>
        {message}
     </div>
    )
  }
  export default Notification