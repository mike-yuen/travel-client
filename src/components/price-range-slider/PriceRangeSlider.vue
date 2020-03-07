<template>
  <div>
    <p class="font-bold mb-3">Price per night [AUD]</p>
    <PriceRangeStyledContainer>
      <div class="track-container">
        <span class="range-value">${{ minValue }} - ${{ maxValue }}</span>
        <!-- <span class="range-value max">{{ max }}</span> -->
        <div class="track" ref="_vpcTrack" @click.stop="setClickMove"></div>
        <div class="track-highlight" ref="trackHighlight"></div>
        <button
          class="track-btn track1 tooltip"
          ref="trackMin"
          :title="'$' + minValue"
          :style="trackWidthMin"
          @mouseup.stop.prevent="mouseup('trackMin')"
          @mousemove.stop.prevent="mousemove('trackMin')"
          @mousedown.stop="mousedown('trackMin')"
          @touchstart.stop="mousedown('trackMin')"
          @touchmove.stop="mousemove('trackMin')"
          @touchend.stop="mouseup('trackMin')"
        ></button>
        <button
          class="track-btn track2 tooltip"
          ref="trackMax"
          :title="'$' + (maxValue < max ? maxValue : maxValue + '+')"
          :style="trackWidthMax"
          @mouseup.stop.prevent="mouseup('trackMax')"
          @mousemove.stop.prevent="mousemove('trackMax')"
          @mousedown.stop="mousedown('trackMax')"
          @touchstart.stop="mousedown('trackMax')"
          @touchmove.stop="mousemove('trackMax')"
          @touchend.stop="mouseup('trackMax')"
        ></button>
      </div>
    </PriceRangeStyledContainer>
  </div>
</template>

<script>
import styled from "vue-styled-components";

const PriceRangeStyledContainer = styled.div`
  padding: 15% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
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
    -webkit-appearance: none;
    -moz-appearance: none;
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
    -ms-touch-action: pan-x;
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

    moveTrack(track) {
      // console.log(ev);
      let percentInPx = this.getPercentInPx;
      let trackX = Math.round(
        this.$refs._vpcTrack.getBoundingClientRect().left
      );
      let clientX = event.clientX;
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

      this.$refs[track].style.left = moveInPercent + "%";
      this.setTrackHightlight();
      // console.log(value);
    },

    mouseup() {
      // console.log(track);
      if (!this.isDragging) return;
      this.isDragging = false;
      // alert('mouseup');
    },

    mousedown(track) {
      if (this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
      // console.log(track)
    },

    mousemove(track) {
      if (!this.isDragging) return;
      this.moveTrack(track);
    },
    setClickMove() {
      // alert(event.clientX);
      let track1Left = this.$refs.track1.getBoundingClientRect().left;
      // let track2Left = this.$refs.track2.getBoundingClientRect().left;
      console.log(track1Left);
      // if(event.clientX < track1Left){
      //   this.moveTrack('trackMin')
      // }else if((event.clientX - track1Left) < (track2Left - event.clientX) ){
      //   this.moveTrack('trackMin')
      // }else{
      //   this.moveTrack('trackMax')
      // }
      this.setTrackHightlight();
    }
  },

  mounted() {
    this.minValue = this.min;
    this.maxValue = this.max;
    // this.setTrackHightlight();
  }
};
</script>
