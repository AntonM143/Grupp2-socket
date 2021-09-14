const date = () => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    return time;
  }

  export default date;