<template>
  <div>
    <NavigatorTop class="z-30" />
    <MenuDesktop class="hidden lg:block z-20" />
    <HotelCard />
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import HotelCard from "@/components/hotel-card/HotelCard";
export default {
  name: "hotels",
  components: {
    NavigatorTop,
    MenuDesktop,
    HotelCard
  }
};
</script>
