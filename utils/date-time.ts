export function dateTime() {
  // Get the current date and time
  let currentDate = new Date();

  // Get the individual components
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since months are zero-based
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hours = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  let seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Concatenate the components
  let formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

  //return formatted date
  return formattedDate;
}
