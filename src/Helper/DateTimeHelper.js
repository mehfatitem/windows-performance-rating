class DateTimeHelper {
  static putLeadingZero(num) {
    if (typeof num !== "number") {
      return num; // Return the input if it's not a number
    }
    
    if (num >= 0 && num <= 9) {
      return "0" + num; // Add a leading zero for single-digit numbers
    }
    
    return num.toString(); // Convert the number to a string otherwise
  }

  static nowToString() {
    const today = new Date();
    const date = this.putLeadingZero(today.getFullYear()) + '-' + this.putLeadingZero(today.getMonth() + 1) + '-' + this.putLeadingZero(today.getDate());
    const time = this.putLeadingZero(today.getHours()) + '.' + this.putLeadingZero(today.getMinutes()) + '.' + this.putLeadingZero(today.getSeconds()) + '.' + this.putLeadingZero(today.getMilliseconds());
    return date + ' ' + time;
  }
}

module.exports = DateTimeHelper;