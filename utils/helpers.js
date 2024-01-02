module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    // const newDate = new Date(date);

    // const day = newDate.getDate().toString().padStart(2, '0');
    // const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    // const year = newDate.getFullYear();

    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
  }
};