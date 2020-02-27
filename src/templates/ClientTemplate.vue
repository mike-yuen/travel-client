<template>
  <div class="client">
    <NavigatorTop class="z-30" />
    <MenuDesktop class="hidden lg:block z-20" />
    <main class="block relative bg-white min-h-screen pb-20 outline-none">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
//lazy-loading components && code split
const NavigatorTop = () => import("@/components/navigator/NavigatorTop");
const MenuDesktop = () => import("@/components/menu/MenuDesktop");
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
