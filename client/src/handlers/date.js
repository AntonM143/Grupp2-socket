const date = () => {
    let today = new Date();
    const hour = today.getHours()
    const minutes = today.getMinutes()
    return `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  export default date;
