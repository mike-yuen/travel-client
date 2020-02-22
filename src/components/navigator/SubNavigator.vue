<template>
  <ul class="flex md:mx-2 text-lg" :class="{ 'bg-gray-200': mobile }">
    <li
      v-for="(item, index) in mock"
      :key="index"
      class="md:mr-4 flex last:mr-0 hover:text-red-0 hover:font-bold hover:underline"
      :class="{
        'text-red-0 font-bold underline': activeLink(item.path),
        'h-10 text-base flex-auto items-center justify-center': mobile,
        'bg-white': activeLink(item.path) && mobile
      }"
    >
      <a :href="item.path">{{ item.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SubNavigator",
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mock: [
        { name: "Earn points", path: "/" },
        { name: "Use points", path: "/use-point" },
        { name: "Merchandise", path: "/merchandise" }
      ]
    };
  },
  methods: {
    activeLink(link) {
      if (window.location.pathname === link) {
        return true;
      }
      return false;
    }
  }
};
</script>
