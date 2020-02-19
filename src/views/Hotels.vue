<template>
  <div>
    <NavigatorTop />
    <MenuDesktop />
    <!-- <HotelCard v-bind:hotels="hotels" /> -->
    <DataFrame>
      <div slot-scope="{ data, error, loading }">
        <p v-if="error" class="text-danger">
          There was an error! Please try again.
        </p>
        <div v-else>
          <div v-if="loading">
            <div v-for="n in 2" :key="n">
              <HotelCard loading />
            </div>
          </div>
          <div v-else>
            <HotelCard v-bind:hotels="data" />
          </div>
        </div>
        <HotelCard />
      </div>
    </DataFrame>
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import HotelCard from "@/components/hotel-card/HotelCard";
import DataFrame from "@/components/hotel-card/DataFrame";
export default {
  name: "hotels",
  components: {
    NavigatorTop,
    MenuDesktop,
    HotelCard,
    DataFrame
  }
};
</script>
