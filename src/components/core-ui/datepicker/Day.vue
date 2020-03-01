<template>
  <day-wrapper @mouseover="$emit('mouseover')">
    <tooltip
      v-if="showTooltip && options.hoveringTooltip"
      v-html="tooltipMessageDisplay"
    />
    <div
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white border-2 border-transparent text-gray-0 outline-none"
      :class="dayClass"
      :style="isToday ? currentDateStyle : ''"
      @click.prevent.stop="dayClicked(date)"
      @keyup.enter.prevent.stop="dayClicked(date)"
      :tabindex="tabIndex"
      ref="day"
    >
      <triangle-right v-if="dayClass.includes('checkin')" />
      <triangle-left v-if="dayClass.includes('checkout')" />
      <span class="z-50">{{ dayNumber }}</span>
    </div>
  </day-wrapper>
</template>

<script>
import fecha from "fecha";
import Helpers from "./utils.js";
import styled from "vue-styled-components";

const DayWrapper = styled.div`
  background-color: transparent;
  position: relative
  width: calc(1/7 * 100%);
  border: 1px solid transparent;  
  cursor: pointer;
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;
const Triangle = styled.div`
  height: 0px;
  overflow: hidden;
  padding-bottom: 50%;
  padding-top: 50%;
  position: absolute;
  width: 0px;
  &:after {
    border-bottom: 500px solid transparent;
    border-top: 500px solid transparent;
    border-left: 500px solid #8de2e0;
    content: "";
    display: block;
    height: 0;
    margin-top: -500px;
    margin-left: -500px;
    width: 0;
  }
`;
const TriangleRight = Triangle.extend`
  padding-left: 50%;
  left: 0px;
  &:after {
    border-left: 500px solid #8de2e0;
    margin-left: -500px;
  }
`;
const TriangleLeft = Triangle.extend`
  padding-right: 50%;
  right: 0px;
  &:after {
    border-right: 500px solid #8de2e0;
    margin-right: -500px;
  }
`;
const Tooltip = styled.div`
    background-color: #2d3047;
    border-radius: 2px;
    color: white;
    font-size: 11px;
    text-align: center;
    bottom: 100%;
    width: 100%;
    padding: 5px 5px;
    position: absolute;
    z-index: 50;
    &:after {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #2d3047;
      bottom: -4px;
      content: "";
      left: 50%;
      margin-left: -4px;
      position: absolute;
    }
  }
`;

export default {
  name: "Day",
  components: {
    "day-wrapper": DayWrapper,
    "triangle-right": TriangleRight,
    "triangle-left": TriangleLeft,
    tooltip: Tooltip
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    sortedDisabledDates: {
      type: Array
    },
    options: {
      type: Object
    },
    checkIn: {
      type: Date
    },
    checkOut: {
      type: Date
    },
    hoveringDate: {
      type: Date
    },
    belongsToThisMonth: {
      type: Boolean
    },
    activeMonthIndex: {
      type: Number
    },
    date: {
      type: Date
    },
    dayNumber: {
      type: String
    },
    nextDisabledDate: {
      type: [Date, Number, String]
    },
    hoveringTooltip: {
      default: true,
      type: Boolean
    },
    tooltipMessage: {
      default: null,
      type: String
    },
    currentDateStyle: {
      required: true
    }
  },
  data() {
    return {
      isHighlighted: false,
      isDisabled: false,
      currentDate: new Date()
    };
  },
  computed: {
    tabIndex() {
      if (
        !this.isOpen ||
        !this.belongsToThisMonth ||
        this.isDisabled ||
        !this.isClickable()
      ) {
        return -1;
      }
      return 0;
    },
    nightsCount() {
      return this.countDays(this.checkIn, this.hoveringDate);
    },
    tooltipMessageDisplay() {
      return this.tooltipMessage
        ? this.tooltipMessage
        : `${this.nightsCount} ${
            this.nightsCount !== 1
              ? this.options.i18n["nights"]
              : this.options.i18n["night"]
          }`;
    },
    showTooltip() {
      return (
        !this.isDisabled &&
        this.date == this.hoveringDate &&
        this.checkIn !== null &&
        this.checkOut == null
      );
    },
    isToday() {
      return this.compareDay(this.currentDate, this.date) == 0;
    },
    dayClass() {
      if (this.belongsToThisMonth) {
        // If the calendar has a minimum number of nights
        if (
          !this.isDisabled &&
          this.compareDay(this.date, this.checkIn) == 1 &&
          this.options.minNights > 0 &&
          this.compareDay(
            this.date,
            this.addDays(this.checkIn, this.options.minNights)
          ) == -1
        ) {
          return "datepicker__month-day--selected datepicker__month-day--out-of-range";
        }
        // Highlight the selected dates and prevent the user from selecting
        // the same date for checkout and checkin
        if (
          this.checkIn !== null &&
          fecha.format(this.checkIn, "YYYYMMDD") ==
            fecha.format(this.date, "YYYYMMDD")
        ) {
          if (this.options.minNights == 0) {
            return "bg-cyan-50 border-cyan-100";
          } else {
            return "checkin bg-cyan-50 border-cyan-100";
          }
        }
        if (this.checkOut !== null) {
          if (
            fecha.format(this.checkOut, "YYYYMMDD") ==
            fecha.format(this.date, "YYYYMMDD")
          ) {
            return "checkout bg-cyan-50 border-cyan-100";
          }
        }
        // Only highlight dates that are not disabled
        if (this.isHighlighted && !this.isDisabled) {
          return "bg-cyan-50 hover:border-cyan-100";
        }
        if (this.isDisabled) {
          return "bg-gray-50";
        }
      } else if (!this.belongsToThisMonth) {
        return "hidden";
      } else {
        return "datepicker__month-day--valid";
      }
      return "";
    }
  },
  watch: {
    hoveringDate() {
      if (
        this.checkIn !== null &&
        this.checkOut == null &&
        this.isDisabled == false
      ) {
        this.isDateLessOrEquals(this.checkIn, this.date) &&
        this.isDateLessOrEquals(this.date, this.hoveringDate)
          ? (this.isHighlighted = true)
          : (this.isHighlighted = false);
      }
    },
    activeMonthIndex() {
      this.checkIfDisabled();
      this.checkIfHighlighted();
      if (this.checkIn !== null && this.checkOut !== null) {
        this.isDateLessOrEquals(this.checkIn, this.date) &&
        this.isDateLessOrEquals(this.date, this.checkOut)
          ? (this.isHighlighted = true)
          : (this.isHighlighted = false);
      } else if (this.checkIn !== null && this.checkOut == null) {
        this.disableNextDays();
      } else {
        return;
      }
    },
    nextDisabledDate() {
      this.disableNextDays();
    }
  },
  methods: {
    ...Helpers,
    isClickable() {
      if (this.$refs && this.$refs.day) {
        return getComputedStyle(this.$refs.day).pointerEvents !== "none";
      } else {
        return true;
      }
    },
    compareDay(day1, day2) {
      const date1 = fecha.format(new Date(day1), "YYYYMMDD");
      const date2 = fecha.format(new Date(day2), "YYYYMMDD");
      if (date1 > date2) {
        return 1;
      } else if (date1 == date2) {
        return 0;
      } else if (date1 < date2) {
        return -1;
      }
    },
    dayClicked(date) {
      if (this.isDisabled || !this.isClickable()) {
        return;
      } else {
        let nextDisabledDate =
          (this.options.maxNights
            ? this.addDays(this.date, this.options.maxNights)
            : null) ||
          this.getNextDate(this.sortedDisabledDates, this.date) ||
          this.nextDateByDayOfWeekArray(
            this.options.disabledDaysOfWeek,
            this.date
          ) ||
          Infinity;
        if (this.options.enableCheckout) {
          nextDisabledDate = Infinity;
        }
        this.$emit("day-clicked", { date, nextDisabledDate });
      }
    },
    compareEndDay() {
      if (this.options.endDate !== Infinity) {
        return this.compareDay(this.date, this.options.endDate) == 1;
      }
    },
    checkIfDisabled() {
      this.isDisabled =
        // If this day is equal any of the disabled dates
        (this.sortedDisabledDates
          ? this.sortedDisabledDates.some(
              i => this.compareDay(i, this.date) == 0
            )
          : null) ||
        // Or is before the start date
        this.compareDay(this.date, this.options.startDate) == -1 ||
        // Or is after the end date
        this.compareEndDay() ||
        // Or is in one of the disabled days of the week
        this.options.disabledDaysOfWeek.some(
          i => i == fecha.format(this.date, "dddd")
        );
      // Handle checkout enabled
      if (this.options.enableCheckout) {
        if (
          this.compareDay(this.date, this.checkIn) == 1 &&
          this.compareDay(this.date, this.checkOut) == -1
        ) {
          this.isDisabled = false;
        }
      }
    },
    checkIfHighlighted() {
      if (
        this.checkIn !== null &&
        this.checkOut !== null &&
        this.isDisabled == false
      ) {
        this.isDateLessOrEquals(this.checkIn, this.date) &&
        this.isDateLessOrEquals(this.date, this.checkOut)
          ? (this.isHighlighted = true)
          : (this.isHighlighted = false);
      }
    },
    disableNextDays() {
      if (
        !this.isDateLessOrEquals(this.date, this.nextDisabledDate) &&
        this.nextDisabledDate !== Infinity
      ) {
        this.isDisabled = true;
      } else if (this.isDateLessOrEquals(this.date, this.checkIn)) {
        this.isDisabled = true;
      }
      if (
        this.compareDay(this.date, this.checkIn) == 0 &&
        this.options.minNights == 0
      ) {
        this.isDisabled = false;
      }
      if (
        this.isDateLessOrEquals(this.checkIn, this.date) &&
        this.options.enableCheckout
      ) {
        this.isDisabled = false;
      } else {
        return;
      }
    }
  },
  beforeMount() {
    this.checkIfDisabled();
    this.checkIfHighlighted();
  }
};
</script>
