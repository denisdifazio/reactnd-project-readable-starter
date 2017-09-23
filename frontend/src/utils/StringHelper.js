export function capitalizeString(str = "") {
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
}

export function intToString(value) {
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.floor(("" + value).slice(1).length / 3);
  var shortValue = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toFixed(1)
  );
  if (shortValue > 100) {
    shortValue = Math.trunc(shortValue);
  }

  return shortValue + suffixes[suffixNum];
}

export function timeSince(timeStamp) {
  const date = new Date();
  const dateTimeStamp = new Date(timeStamp);
  let secondsPast = (date.getTime() - dateTimeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast, 10) + "seconds ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60, 10) + "minutes ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600, 10) + "hours ago";
  }
  if (secondsPast > 86400) {
    const day = dateTimeStamp.getDate();
    const month = dateTimeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
      dateTimeStamp.getFullYear() === date.getFullYear()
        ? ""
        : " " + dateTimeStamp.getFullYear();
    return day + " " + month + year;
  }
}
