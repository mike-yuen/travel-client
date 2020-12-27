export const getDurationDate = (self, date) => {
  const toDate = self.$moment();
  const fromDate = self.$moment.utc(date).local();
  formatDateMomemt(self, fromDate);
  return fromDate.locale("en").from(toDate, true);
};
export const formatDateMomemt = (self, formatDate) => {
  self.$moment.locale("en", {
    relativeTime: {
      past: "%s ago",
      s: "Now",
      ss: "Now",
      m: "Now",
      mm: "%d mins ago",
      h: "1 hr ago",
      hh: function() {
        return formatDate.format("HH:mm a");
      },
      d: "Yesterday",
      dd: function(number) {
        if (number >= 2 && number <= 3) {
          return formatDate.format("dddd");
        } else {
          return formatDate.format("MM/DD/YY");
        }
      },
      M: function() {
        return formatDate.format("MM/DD/YY");
      },
      MM: function() {
        return formatDate.format("MM/DD/YY");
      },
      y: function() {
        return formatDate.format("MM/DD/YY");
      },
      yy: function() {
        return formatDate.format("MM/DD/YY");
      }
    }
  });
};
