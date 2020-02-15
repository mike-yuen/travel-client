<template>
  <div>
    <NavigatorTop />
    <MenuDesktop />
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
