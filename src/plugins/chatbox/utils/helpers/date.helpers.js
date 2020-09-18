export const formatDateMomemt = (self) => {
  const _this = self;
  self.$moment.locale("en", {
    relativeTime: {
      past: "%s ago",
      s: "Now",
      ss: "Now",
      m: "Now",
      mm: "%d mins ago",
      h: "1 hr ago",
      hh: function(number) {
        return _this
          .$moment()
          .subtract(number, "hours")
          .format("HH:mm a");
      },
      d: "Yesterday",
      dd: function(number) {
        if (number >= 2 && number <= 3) {
          return _this
            .$moment()
            .subtract(number, "days")
            .format("dddd");
        } else {
          return _this
            .$moment()
            .subtract(number, "hours")
            .format("MM/DD/YY");
        }
      },
      M: function(number) {
        return _this
          .$moment()
          .subtract(number, "months")
          .format("MM/DD/YY");
      },
      MM: function(number) {
        return _this
          .$moment()
          .subtract(number, "months")
          .format("MM/DD/YY");
      },
      y: function(number) {
        return _this
          .$moment()
          .subtract(number, "years")
          .format("MM/DD/YY");
      },
      yy: function(number) {
        return _this
          .$moment()
          .subtract(number, "years")
          .format("MM/DD/YY");
      }
    }
  });
};
