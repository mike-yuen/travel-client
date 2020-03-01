<template>
  <div id="datepicker" v-if="show" v-click-outside="clickOutside">
    <div
      class="md:hidden fixed top-0 right-0 w-6 h-6 bg-gray-0 text-white text-center z-50"
      v-if="isOpen"
      @click="hideDatepicker"
    >
      <i class="faf fa-times" />
    </div>
    <div class="md:flex w-full">
      <div class="w-full md:w-1/2 px-4 pt-2 md:pt-0">
        <Input
          id="checkin"
          :i18n="i18n"
          type="text"
          label="Check-in date"
          :showLabel="isExpanded"
          :value="formatDate(checkIn)"
          input-date-type="check-in"
          :icon="{ code: 'calendar', isShown: true }"
          @click="toggleDatepicker"
          @enter="toggleDatepicker"
          readonly
        />
      </div>
      <div class="w-full md:w-1/2 px-4 pt-2 md:pt-0">
        <Input
          id="checkout"
          :i18n="i18n"
          type="text"
          label="Check-out date"
          :showLabel="isExpanded"
          :value="formatDate(checkOut)"
          input-date-type="check-out"
          :icon="{ code: 'calendar', isShown: true }"
          @click="toggleDatepicker"
          @enter="toggleDatepicker"
          v-if="!singleDaySelection"
          readonly
        />
      </div>
    </div>
    <datepicker :class="{ hidden: !isOpen }">
      <div class="md:hidden">
        <div
          class="flex mt-3"
          @click="toggleDatepicker"
          v-if="isOpen"
          :class="`${isOpen ? 'active' : ''}`"
        >
          <div
            class="w-1/2 text-gray-0 text-center py-3"
            tabindex="0"
            :class="[isOpen && checkIn == null ? 'active' : '']"
            v-text="`${checkIn ? formatDate(checkIn) : i18n['check-in']}`"
          ></div>
          <div
            class="w-1/2 text-gray-0 text-center py-3"
            tabindex="0"
            :class="[
              isOpen && checkOut == null && checkIn !== null ? 'active' : ''
            ]"
            v-text="`${checkOut ? formatDate(checkOut) : i18n['check-out']}`"
          ></div>
        </div>
        <div
          class="h-6 flex mt-3"
          style="box-shadow: 0 13px 18px -8px rgba(0, 0, 0, 0.07)"
        >
          <div
            class="w-1/7 text-center text-gray-600"
            v-for="(dayName, index) in this.i18n['day-names']"
            :key="index"
            v-text="dayName"
          ></div>
        </div>
      </div>
      <div class="py-3 px-0 md:px-8 md:pt-10 md:pb-8">
        <div class="hidden">
          <span
            class="datepicker__month-button datepicker__month-button--prev -hide-up-to-tablet"
            @click="renderPreviousMonth"
            @keyup.enter.stop.prevent="renderPreviousMonth"
            :tabindex="isOpen ? 0 : -1"
          ></span
          ><span
            class="datepicker__month-button datepicker__month-button--next -hide-up-to-tablet"
            @click="renderNextMonth"
            @keyup.enter.stop.prevent="renderNextMonth"
            :tabindex="isOpen ? 0 : -1"
          ></span>
        </div>
        <div class="flex" v-if="screenSize == 'desktop'">
          <div
            class="md:w-1/2 border-box py-0 px-4"
            v-for="n in [0, 1]"
            v-bind:key="n"
          >
            <p
              class="text-base font-bold uppercase text-gray-0 tracking-wider mb-5 text-center"
              v-text="getMonth(months[activeMonthIndex + n].days[15].date)"
            ></p>
            <div
              class="flex border-b border-gray-400 text-gray-0 text-base pb-3 mb-3 -hide-up-to-tablet"
            >
              <div
                class="w-1/7 text-center"
                v-for="(dayName, index) in i18n['day-names']"
                :key="index"
                v-text="dayName"
              ></div>
            </div>
            <div
              class="date-outer flex flex-wrap"
              style="margin-bottom: 2px;  margin-right: 2px;"
            >
              <Day
                :is-open="isOpen"
                :options="$props"
                @day-clicked="handleDayClick($event)"
                :date="day.date"
                :sortedDisabledDates="sortedDisabledDates"
                :nextDisabledDate="nextDisabledDate"
                :activeMonthIndex="activeMonthIndex"
                :hoveringDate="hoveringDate"
                :tooltipMessage="tooltipMessage"
                :dayNumber="getDay(day.date)"
                :belongsToThisMonth="day.belongsToThisMonth"
                :checkIn="checkIn"
                :checkOut="checkOut"
                :currentDateStyle="currentDateStyle"
                @mouseover="hoveringDate = day.date"
                v-for="(day, index) in months[activeMonthIndex + n].days"
                :key="index"
              ></Day>
            </div>
          </div>
        </div>
        <div v-if="screenSize !== 'desktop' && isOpen">
          <div class="relative h-screen overflow-visible">
            <div class="pt-3" v-for="(a, n) in months" v-bind:key="n">
              <p
                class="text-gray-0 text-center text-lg font-bold"
                v-text="getMonth(months[n].days[15].date)"
              />
              <div class="datepicker__week-row -hide-up-to-tablet">
                <div
                  class="datepicker__week-name"
                  v-for="(dayName, index) in i18n['day-names']"
                  :key="index"
                  v-text="dayName"
                ></div>
              </div>
              <div
                class="date-outer flex flex-wrap"
                style="margin-bottom: 2px;  margin-right: 2px;"
              >
                <Day
                  :is-open="isOpen"
                  :options="$props"
                  @day-clicked="handleDayClick($event)"
                  :date="day.date"
                  :sortedDisabledDates="sortedDisabledDates"
                  :nextDisabledDate="nextDisabledDate"
                  :activeMonthIndex="activeMonthIndex"
                  :hoveringDate="hoveringDate"
                  :tooltipMessage="tooltipMessage"
                  :dayNumber="getDay(day.date)"
                  :belongsToThisMonth="day.belongsToThisMonth"
                  :checkIn="checkIn"
                  :checkOut="checkOut"
                  :currentDateStyle="currentDateStyle"
                  @mouseover="hoveringDate = day.date"
                  v-for="(day, index) in months[activeMonthIndex + n].days"
                  :key="index"
                ></Day>
              </div>
            </div>
            <div class="next--mobile" @click="renderNextMonth" type="button">
              Next Month
            </div>
          </div>
        </div>
      </div>
    </datepicker>
  </div>
</template>

<script>
import Day from "./Day.vue";
import Input from "../field/Input";
import Helpers from "./utils.js";

import fecha from "fecha";
import throttle from "lodash.throttle";
import styled from "vue-styled-components";

const defaulti18n = {
  night: "Night",
  nights: "Nights",
  "day-names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "check-in": "Check-in",
  "check-out": "Check-out",
  "month-names": [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const Datepicker = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  background-color: #f4f5f6;
  margin-top: 9px;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 40;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    margin: 0;
    background-color: white;
    overflow: scroll;
  }
  @media (min-width: 769px) {
    padding-left: 26px;
    padding-right: 26px;
    margin-left: 15px;
    margin-right: 15px;
    width: calc(100% - 30px);
  }
`;
export default {
  name: "HotelDatePicker",
  components: {
    Day,
    Input,
    datepicker: Datepicker
  },
  props: {
    currentDateStyle: {
      default: () => ({ borderColor: "#90e2df" })
    },
    value: {
      type: Object
    },
    startingDateValue: {
      default: null,
      type: Date
    },
    endingDateValue: {
      default: null,
      type: Date
    },
    format: {
      default: "ddd DD MMM YYYY",
      type: String
    },
    startDate: {
      default: function() {
        return new Date();
      },
      type: [Date, String]
    },
    endDate: {
      default: Infinity,
      type: [Date, String, Number]
    },
    firstDayOfWeek: {
      default: 0,
      type: Number
    },
    minNights: {
      default: 1,
      type: Number
    },
    maxNights: {
      default: null,
      type: Number
    },
    disabledDates: {
      default: function() {
        return [];
      },
      type: Array
    },
    disabledDaysOfWeek: {
      default: function() {
        return [];
      },
      type: Array
    },
    hoveringTooltip: {
      default: true,
      type: [Boolean, Function]
    },
    tooltipMessage: {
      default: null,
      type: String
    },
    i18n: {
      default: () => defaulti18n,
      type: Object
    },
    enableCheckout: {
      default: false,
      type: Boolean
    },
    singleDaySelection: {
      default: false,
      type: Boolean
    },
    showYear: {
      default: false,
      type: Boolean
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkIn: null,
      checkOut: null,
      hoveringDate: null,
      months: [],
      activeMonthIndex: 0,
      nextDisabledDate: null,
      show: true,
      isOpen: false,
      xDown: null,
      yDown: null,
      xUp: null,
      yUp: null,
      sortedDisabledDates: null,
      screenSize: this.handleWindowResize()
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  watch: {
    checkIn(newDate) {
      this.dataValue.checkIn = newDate;
    },
    checkOut(newDate) {
      if (this.checkOut !== null && this.checkOut !== null) {
        this.hoveringDate = null;
        this.nextDisabledDate = null;
        this.show = true;
        this.parseDisabledDates();
        this.reRender();
        this.isOpen = false;
      }
      this.dataValue.checkOut = newDate;
    }
  },
  methods: {
    ...Helpers,
    formatDate(date) {
      if (date) {
        return fecha.format(date, this.format);
      }
      return "";
    },
    handleWindowResize() {
      if (window.innerWidth < 480) {
        this.screenSize = "smartphone";
      } else if (window.innerWidth >= 480 && window.innerWidth < 768) {
        this.screenSize = "tablet";
      } else if (window.innerWidth >= 768) {
        this.screenSize = "desktop";
      }
      return this.screenSize;
    },
    onElementHeightChange(el, callback) {
      let lastHeight = el.clientHeight;
      let newHeight = lastHeight;
      (function run() {
        newHeight = el.clientHeight;
        if (lastHeight !== newHeight) {
          callback();
        }
        lastHeight = newHeight;
        if (el.onElementHeightChangeTimer) {
          clearTimeout(el.onElementHeightChangeTimer);
        }
        el.onElementHeightChangeTimer = setTimeout(run, 1000);
      })();
    },
    emitHeighChangeEvent() {
      this.$emit("height-changed");
    },
    reRender() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    hideDatepicker() {
      this.isOpen = false;
    },
    toggleDatepicker() {
      this.isOpen = !this.isOpen;
    },
    clickOutside() {
      this.hideDatepicker();
    },
    handleDayClick(event) {
      if (this.checkIn == null && this.singleDaySelection == false) {
        this.checkIn = event.date;
      } else if (this.singleDaySelection == true) {
        this.checkIn = event.date;
        this.checkOut = event.date;
      } else if (this.checkIn !== null && this.checkOut == null) {
        this.checkOut = event.date;
      } else {
        this.checkOut = null;
        this.checkIn = event.date;
      }
      this.nextDisabledDate = event.nextDisabledDate;
    },
    renderPreviousMonth() {
      if (this.activeMonthIndex >= 1) {
        this.activeMonthIndex--;
      } else return;
    },
    renderNextMonth: throttle(function throttleRenderNextMonth() {
      if (this.activeMonthIndex < this.months.length - 2) {
        this.activeMonthIndex++;
        return;
      }
      let firstDayOfLastMonth;
      if (this.screenSize !== "desktop") {
        const monthDays = this.months[this.months.length - 1].days;
        firstDayOfLastMonth = monthDays.filter(
          day => day.belongsToThisMonth === true
        );
      } else {
        firstDayOfLastMonth = this.months[
          this.activeMonthIndex + 1
        ].days.filter(day => day.belongsToThisMonth === true);
      }
      if (this.endDate !== Infinity) {
        if (
          fecha.format(firstDayOfLastMonth[0].date, "YYYYMM") ==
          fecha.format(new Date(this.endDate), "YYYYMM")
        ) {
          return;
        }
      }
      this.createMonth(this.getNextMonth(firstDayOfLastMonth[0].date));
      this.activeMonthIndex++;
    }, 200),
    setCheckIn(date) {
      this.checkIn = date;
    },
    setCheckOut(date) {
      this.checkOut = date;
    },
    getDay(date) {
      return fecha.format(date, "D");
    },
    getMonth(date) {
      return (
        this.i18n["month-names"][fecha.format(date, "M") - 1] +
        (this.showYear ? fecha.format(date, " YYYY") : "")
      );
    },
    createMonth(date) {
      const firstDay = this.getFirstDay(date, this.firstDayOfWeek);
      let month = {
        days: []
      };
      for (let i = 0; i < 42; i++) {
        month.days.push({
          date: this.addDays(firstDay, i),
          belongsToThisMonth:
            this.addDays(firstDay, i).getMonth() === date.getMonth(),
          isInRange: false
        });
      }
      this.months.push(month);
    },
    parseDisabledDates() {
      const sortedDates = [];
      for (let i = 0; i < this.disabledDates.length; i++) {
        sortedDates[i] = new Date(this.disabledDates[i]);
      }
      sortedDates.sort((a, b) => a - b);
      this.sortedDisabledDates = sortedDates;
    }
  },
  beforeMount() {
    fecha.i18n = {
      dayNames: this.i18n["day-names"],
      dayNamesShort: this.shortenString(this.i18n["day-names"], 3),
      monthNames: this.i18n["month-names"],
      monthNamesShort: this.shortenString(this.i18n["month-names"], 3),
      amPm: ["am", "pm"],
      // D is the day of the month, function returns something like...  3rd or 11th
      DoFn: function(D) {
        return (
          D +
          ["th", "st", "nd", "rd"][
            D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
          ]
        );
      }
    };
    if (
      this.checkIn &&
      (this.getMonthDiff(
        this.getNextMonth(new Date(this.startDate)),
        this.checkIn
      ) > 0 ||
        this.getMonthDiff(this.startDate, this.checkIn) > 0)
    ) {
      this.createMonth(new Date(this.startDate));
      const count = this.getMonthDiff(this.startDate, this.checkIn);
      let nextMonth = new Date(this.startDate);
      for (let i = 0; i <= count; i++) {
        let tempNextMonth = this.getNextMonth(nextMonth);
        this.createMonth(tempNextMonth);
        nextMonth = tempNextMonth;
      }
      if (this.checkOut && this.getMonthDiff(this.checkIn, this.checkOut) > 0) {
        this.createMonth(this.getNextMonth(nextMonth));
        this.activeMonthIndex = 1;
      }
      this.activeMonthIndex += count;
    } else {
      this.createMonth(new Date(this.startDate));
      this.createMonth(this.getNextMonth(new Date(this.startDate)));
    }
    this.parseDisabledDates();
  },
  mounted() {
    this.$nextTick(() => {
      this.checkIn = this.dataValue.checkIn;
      this.checkOut = this.dataValue.checkOut;
    });
    document.addEventListener("touchstart", this.handleTouchStart, false);
    document.addEventListener("touchmove", this.handleTouchMove, false);
    window.addEventListener("resize", this.handleWindowResize);
    this.onElementHeightChange(document.body, () => {
      this.emitHeighChangeEvent();
    });
  },
  destroyed() {
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>

<style lang="scss">
$white: #fff;
$black: #000;
$gray: #424b53;
$primary-text-color: #35343d;
$lightest-gray: #f3f5f8;
$primary-color: #00ca9d;
$primary-color: $primary-color;
$medium-gray: #999999;
$light-gray: #d7d9e2;
$dark-gray: #2d3047;
$font-small: 14px;
/* =============================================================
     * RESPONSIVE LAYOUT HELPERS
     * ============================================================*/
$tablet: "(min-width: 480px) and (max-width: 767px)";
$phone: "(max-width: 479px)";
$desktop: "(min-width: 768px)";
$up-to-tablet: "(max-width: 767px)";
$extra-small-screen: "(max-width: 23em)";
@mixin focusStyle() {
  &:focus {
    outline: 1px dashed darken($primary-color, 10%);
    outline-offset: -10px;
  }
}
@mixin device($device-widths) {
  @media #{$device-widths} {
    @content;
  }
}
/* =============================================================
     * BASE STYLES
     * ============================================================*/
.datepicker {
  button.next--mobile {
    background: none;
    border: 1px solid $light-gray;
    float: none;
    height: 50px;
    width: 100%;
    position: relative;
    background-position: center;
    appearance: none;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    outline: none;
    box-shadow: 0 5px 30px 10px rgba($black, 0.08);
    background: white;
    &:after {
      transform: rotate(90deg);
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
    }
  }
  &__month-button {
    cursor: pointer;
    display: inline-block;
    height: 60px;
    width: 60px;
    @include focusStyle();
    &--prev {
      transform: rotateY(180deg);
    }
    &--next {
      float: right;
    }
    &--locked {
      opacity: 0.2;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &__month {
    font-size: 12px;
    float: left;
    width: 50%;
    padding-right: 10px;
    @include device($up-to-tablet) {
      width: 100%;
      padding-right: 0;
      padding-top: 60px;
      &:last-of-type {
        margin-bottom: 65px;
      }
    }
    @include device($desktop) {
      &:last-of-type {
        padding-right: 0;
        padding-left: 10px;
      }
    }
  }
  &__week-row {
    border-bottom: 5px solid $white;
    height: 38px;
    @include device($up-to-tablet) {
      box-shadow: 0 13px 18px -8px rgba($black, 0.07);
      height: 25px;
      left: 0;
      top: 65px;
      position: absolute;
      width: 100%;
    }
  }
  &__week-name {
    width: calc(100% / 7);
    float: left;
    font-size: 12px;
    font-weight: 400;
    color: $medium-gray;
    text-align: center;
  }
}
// Modifiers
.-hide-up-to-tablet {
  @include device($up-to-tablet) {
    display: none;
  }
}
</style>
