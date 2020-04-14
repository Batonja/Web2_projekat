export function parseDateToString(date) {
  var dateFormat = new Date(date);
  var dateString =
    (dateFormat.getDate() < 10 ? "0" : "") +
    dateFormat.getDate().toString() +
    "/" +
    (dateFormat.getMonth() < 10 ? "0" : "") +
    (dateFormat.getMonth() + 1).toString() +
    "/" +
    dateFormat.getFullYear().toString();

  return dateString;
}
export function parseStringToDate(string) {
  var splitedString = string.split("/");
  var date = new Date(
    splitedString[2] + "-" + splitedString[1] + "-" + splitedString[0]
  );
  return date;
}
