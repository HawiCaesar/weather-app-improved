export const getCurrentDateTime = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let numericalDay = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (date.getDate() < 10) {
    numericalDay = "0" + date.getDate();
  }

  if (date.getHours() < 10) {
    hour = "0" + date.getHours();
  }
  if (date.getMinutes() < 10) {
    minute = "0" + date.getMinutes();
  }
  if (date.getSeconds() < 10) {
    second = "0" + date.getSeconds();
  }

  let time = hour + ":" + minute + ":" + second;

  return [date.getFullYear() + "-" + month + "-" + numericalDay, time];
};
