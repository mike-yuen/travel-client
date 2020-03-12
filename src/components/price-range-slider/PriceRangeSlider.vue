<template>
  <div>
    <p class="font-bold mb-3">Price per night [AUD]</p>
    <PriceRangeStyledContainer
      class="border-2 w-full px-8 pt-15 pb-10 lg:px-0 lg:pt-10  lg:pb-10 lg:border-0 lg:w-10/12"
    >
      <div class="track-container">
        <span class="range-value">${{ minValue }} - ${{ maxValue }}</span>
        <div class="track" ref="_vpcTrack" @click.stop="setClickMove"></div>
        <div
          class="track-highlight"
          ref="trackHighlight"
          @click.stop="setClickMove"
        ></div>
        <button
          class="track-btn track1 tooltip"
          ref="trackMin"
          :title="'$' + minValue"
          :style="trackWidthMin"
          @mouseup.stop="mouseup()"
          @mousemove.stop="mousemove('trackMin')"
          @mousedown.stop="mousedown('trackMin')"
          @touchstart.stop="mousedown('trackMin')"
          @touchmove.stop="mousemove('trackMin', true)"
          @touchend.stop="mouseup()"
        ></button>
        <button
          class="track-btn track2 tooltip"
          ref="trackMax"
          :title="'$' + (maxValue < max ? maxValue : maxValue + '+')"
          :style="trackWidthMax"
          @mouseup.stop="mouseup()"
          @mousemove.stop="mousemove('trackMax')"
          @mousedown.stop="mousedown('trackMax')"
          @touchstart.stop="mousedown('trackMax')"
          @touchmove.stop="mousemove('trackMax', true)"
          @touchend.stop="mouseup()"
        ></button>
      </div>
    </PriceRangeStyledContainer>
  </div>
</template>

<script>
import styled from "vue-styled-components";

const PriceRangeStyledContainer = styled.div`
  // padding: 15% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 80%;
  flex-direction: column;
  .range-value {
    position: absolute;
    top: -3rem;
  }
  .range-value.min {
    left: 0;
  }

  .range-value.max {
    right: 0;
  }
  .track-container {
    width: 100%;
    position: relative;
    cursor: pointer;
    height: 0.5rem;
  }

  .track,
  .track-highlight {
    display: block;
    position: absolute;
    width: 100%;
    height: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .track {
    background-color: #ddd;
  }

  .track-highlight {
    background-color: red;
    z-index: 2;
  }

  .track-btn {
    appearance: none;
    outline: none;
    cursor: pointer;
    display: block;
    position: absolute;
    z-index: 2;
    width: 1.5rem;
    height: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    margin-left: -1rem;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
    background-color: red;
    touch-action: pan-x;
    transition: box-shadow 0.3s ease-out, background-color 0.3s ease,
      -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
      background-color 0.3s ease;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
      background-color 0.3s ease, -webkit-transform 0.3s ease-out;
    &:hover:before {
      content: attr(title);
      background: #ccc;
      padding: 1px 5px;
      font-size: 1rem;
      border-radius: 5px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      position: absolute;
    }
    &:hover:after {
      border: solid;
      border-color: #ccc transparent;
      border-width: 12px 6px 0 6px;
      content: "";
      left: 50%;
      transform: translateX(-50%);
      bottom: 25px;
      position: absolute;
    }
  }
`;

export default {
  name: "price-range-slider",
  components: {
    PriceRangeStyledContainer
  },
  data() {
    return {
      minValue: 0,
      maxValue: 100,
      trackWidth: null,
      isDragging: false,
      pos: {
        curTrack: null
      }
    };
  },

  props: {
    hotels: {
      type: Array
    },
    step: {
      type: Number
    },
    priceMin: {
      type: Number
    },
    priceMax: {
      type: Number
    }
  },

  computed: {
    priceArray() {
      let priceArr = [];
      this.$props.hotels.forEach(room => {
        priceArr.push(room.price);
      });
      return priceArr;
    },
    min() {
      return Math.min.apply(null, this.priceArray);
    },
    max() {
      return Math.max.apply(null, this.priceArray);
    },

    totalSteps() {
      return (this.max - this.min) / this.step;
    },

    percentPerStep() {
      return 100 / this.totalSteps;
    },

    trackWidthMin() {
      return "left:" + this.valueToPercent(this.minValue) + "%";
    },

    trackWidthMax() {
      return "left:" + this.valueToPercent(this.maxValue) + "%";
    },

    getPercentInPx() {
      let trackWidth = this.$refs._vpcTrack.offsetWidth;
      let oneStepInPX = trackWidth / this.totalSteps;
      // 1 percent in px
      let percentInPx = oneStepInPX / this.percentPerStep;
      return percentInPx;
    }
  },

  methods: {
    valueToPercent(value) {
      return ((value - this.min) / this.step) * this.percentPerStep;
    },

    setTrackHightlight() {
      this.$refs.trackHighlight.style.left =
        this.valueToPercent(this.minValue) + "%";
      this.$refs.trackHighlight.style.width =
        this.valueToPercent(this.maxValue) -
        this.valueToPercent(this.minValue) +
        "%";
    },

    moveTrack(track, touchStatus) {
      let percentInPx = this.getPercentInPx;
      let trackX = Math.round(
        this.$refs._vpcTrack.getBoundingClientRect().left
      );
      let clientX;

      if (touchStatus == true) {
        clientX = event.changedTouches[0].clientX;
      } else {
        clientX = event.clientX;
      }

      let moveDiff = clientX - trackX;
      let moveInPercent = moveDiff / percentInPx;

      if (moveInPercent < 1 || moveInPercent > 100) return;
      let value =
        Math.round(moveInPercent / this.percentPerStep) * this.step + this.min;

      if (track === "trackMin") {
        if (value >= this.maxValue - this.step) return;
        this.minValue = value;
      }

      if (track === "trackMax") {
        if (value <= this.minValue + this.step) return;
        this.maxValue = value;
      }
      this.valueBack(this.minValue, this.maxValue);
      this.$refs[track].style.left = moveInPercent + "%";
      this.setTrackHightlight();
    },

    mouseup() {
      if (!this.isDragging) return;
      this.isDragging = false;
    },

    mousedown(track) {
      if (this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
    },

    mousemove(track, touchStatus = false) {
      if (!this.isDragging) return;
      this.moveTrack(track, touchStatus);
    },
    setClickMove() {
      let track1Left = this.$refs.trackMin.getBoundingClientRect().left;
      let track2Left = this.$refs.trackMax.getBoundingClientRect().left;
      if (event.clientX < track1Left) {
        this.moveTrack("trackMin");
      } else if (event.clientX - track1Left < track2Left - event.clientX) {
        this.moveTrack("trackMin");
      } else {
        this.moveTrack("trackMax");
      }
      this.setTrackHightlight();
    },

    valueBack(...value) {
      this.$emit("priceReceive", ...value);
    }
  },

  mounted() {
    this.minValue = this.min;
    this.maxValue = this.max;
    var self = this;

    ["mouseup", "mousemove"].forEach(type => {
      document.body.addEventListener(type, () => {
        if (self.isDragging && self.pos.curTrack) {
          self[type](self.pos.curTrack);
        }
      });
    });
  }
};
</script>
