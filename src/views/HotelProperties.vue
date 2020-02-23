<template>
  <div :id="'hotel-properties' + hotelId">
    {{ hotelId }}
  </div>
</template>

<script>
export default {
  name: "HotelProperties",
  data() {
    return {
      hotelId: ""
    };
  },
  created() {
    const params = this.$route.params;
    this.hotelId = params.hotelId;
  }
};
</script>
