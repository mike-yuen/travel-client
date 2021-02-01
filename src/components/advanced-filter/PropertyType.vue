<template>
  <div>
    <p class="font-bold my-3">Property Type</p>
    <div class="border-2 lg:border-0">
      <div
        v-for="(roomType, index) in checkboxes"
        :key="index"
        class="px-4 py-2 lg:p-0"
        :class="{
          'border-b-2 px-4 py-2 lg:p-0 lg:border-0': !(
            index == checkboxes.length
          )
        }"
      >
        <Checkbox :data="roomType" v-model="dataValue" />
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "@/components/core-ui/checkbox/Checkbox";
import { mapGetters } from "vuex";
import { GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "HotelRating",
  components: {
    Checkbox
  },
  props: {
    value: { type: Array, default: () => [] }
  },
  data() {
    return {
      checkboxes: []
    };
  },

  computed: {
    ...mapGetters("hotel", {
      roomTypes: GETTERS.GET_ROOM_TYPES
    }),
    dataValue: {
      get() {
        return this.value || [];
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.roomTypes.map((item) => {
        this.checkboxes.push({
          label: item.name,
          checked: this.dataValue.includes(item.id),
          value: item.id
        });
      });
    });
  }
};
</script>
