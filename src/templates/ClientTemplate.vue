<template>
  <div class="client">
    <NavigatorTop class="z-30" />
    <MenuDesktop class="hidden lg:block z-20" />
    <main class="block relative bg-white min-h-screen pb-20 outline-none z-10">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import Footer from "@/components/footer/Footer";

export default {
  name: "ClientTemplate",
  components: {
    NavigatorTop,
    MenuDesktop,
    Footer
  }
};
</script>
