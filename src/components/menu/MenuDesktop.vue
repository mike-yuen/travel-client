<template>
  <nav class="relative" style="background-color: #323232">
    <div class="max-w-5lg mx-auto">
      <ul
        class="relative table w-full m-0 p-0 border-0 border-t border-transparent px-3"
        role="menubar"
      >
        <li
          class="table-cell w-auto h-15"
          role="menuitem"
          v-for="item in mock"
          :key="item.path"
        >
          <router-link
            :to="{ path: item.path }"
            class="flex items-center justify-center text-white text-lg font-bold h-full px-4             
            hover:bg-white hover:text-red-0"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuDesktop",
  data() {
    return {
      mock: [
        { name: "Hotels", path: "/hotels" },
        { name: "Destinations", path: "/destinations" },
        { name: "Hotel Deals", path: "/hotel-deals" },
        { name: "Book", path: "/book" },
        { name: "Frequent Customer", path: "/frequent-customer" },
        { name: "Business Essentials", path: "/business-essentials" },
        { name: "Blog", path: "/blog" },
        { name: "Help", path: "/help" }
      ]
    };
  }
};
</script>
