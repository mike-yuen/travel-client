<template>
  <div class="client">
    <NavigatorTop class="z-30" />
    <MenuDesktop class="hidden lg:block z-20" />
    <main class="block relative bg-white min-h-screen pb-0 outline-none">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";

//lazy-loading components && code split
const Footer = () => import("@/components/footer/Footer");

export default {
  name: "ClientTemplate",
  components: {
    NavigatorTop,
    MenuDesktop,
    Footer
  }
};
</script>
