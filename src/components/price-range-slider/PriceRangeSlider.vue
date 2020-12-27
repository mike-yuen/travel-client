<template>
  <div>
    <span class="relative">${{ minValue }} - ${{ maxValue }} </span>
    <div class="border-2 w-full lg:border-0 pt-4 pb-4 mb-4">
      <div class="track-container w-full relative cursor-pointer h-2">
        <Track
          class="track block absolute w-full bg-gray-500 top-1/2"
          ref="_vpcTrack"
          @click.stop="setClickMove"
        />
        <TrackHighlight
          class="track-highlight block absolute w-full bg-red-0 z-2 top-1/2"
          ref="trackHighlight"
          @click.stop="setClickMove"
        />
        <TrackButton
          class="track1 appearance-none cursor-pointer block absolute w-6 h-6 -ml-4 border-0 rounded-full bg-red-0 outline-none focus:outline-none z-2 top-1/2"
          ref="trackMin"
          :title="'$' + minValue"
          :style="trackWidthMin"
          @mouseup.stop="mouseup()"
          @mousemove.stop="mousemove('trackMin')"
          @mousedown.stop="mousedown('trackMin')"
          @touchstart.stop="mousedown('trackMin')"
          @touchmove.stop="mousemove('trackMin', true)"
          @touchend.stop="mouseup()"
        ></TrackButton>
        <TrackButton
          class="track2 appearance-none cursor-pointer block absolute w-6 h-6 -ml-4 border-0 rounded-full bg-red-0 outline-none focus:outline-none z-2 top-1/2"
          ref="trackMax"
          :title="'$' + (maxValue < max ? maxValue : maxValue + '+')"
          :style="trackWidthMax"
          @mouseup.stop="mouseup()"
          @mousemove.stop="mousemove('trackMax')"
          @mousedown.stop="mousedown('trackMax')"
          @touchstart.stop="mousedown('trackMax')"
          @touchmove.stop="mousemove('trackMax', true)"
          @touchend.stop="mouseup()"
        ></TrackButton>
      </div>
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";

const Track = styled.div`
  height: 0.3rem;
  transform: translateY(-50%);
`;

const TrackHighlight = Track.extend``;

const TrackButton = styled.button`
  transform: translateY(-50%);
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
  touch-action: pan-x;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
    background-color 0.3s ease;
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
`;

export default {
  name: "price-range-slider",

  components: {
    Track,
    TrackHighlight,
    TrackButton
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
      this.$props.hotels.forEach((room) => {
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
      return "left: calc(" + this.valueToPercent(this.minValue) + "%  + 12px)";
    },

    trackWidthMax() {
      return "left:" + this.valueToPercent(this.maxValue) + "%";
    },

    getPercentInPx() {
      let trackWidth = this.$refs._vpcTrack.$el.offsetWidth;
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
      this.$refs.trackHighlight.$el.style.left =
        this.valueToPercent(this.minValue) + "%";
      this.$refs.trackHighlight.$el.style.width =
        this.valueToPercent(this.maxValue) -
        this.valueToPercent(this.minValue) +
        "%";
    },

    moveTrack(track, touchStatus) {
      let percentInPx = this.getPercentInPx;
      let trackX = Math.round(
        this.$refs._vpcTrack.$el.getBoundingClientRect().left
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
      this.$refs[track].$el.style.left = moveInPercent + "%";
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
      let track1Left = this.$refs.trackMin.$el.getBoundingClientRect().left;
      let track2Left = this.$refs.trackMax.$el.getBoundingClientRect().left;
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

    ["mouseup", "mousemove"].forEach((type) => {
      document.body.addEventListener(type, () => {
        if (self.isDragging && self.pos.curTrack) {
          self[type](self.pos.curTrack);
        }
      });
    });
  }
};
</script>
