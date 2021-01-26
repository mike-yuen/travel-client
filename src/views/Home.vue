<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <div class="relative w-full max-w-5lg mx-auto">
      <h1 class="text-2xl font-bold px-3 pt-8">Featured Posts</h1>
      <div class="flex">
        <div class="relative w-full lg:w-1/3 px-3 pt-5 md:pt-0">
          <BlogPost
            img="https://www.qantas.com/images/qantas/merchandising/Hotels/QLCS_2978_QH_Deposity_Pay_LP_header_1518x1012_v2/jpg/article.tablet.small.jpg"
            title="Introducing Deposit Pay from Lux"
            desc="You can now book selected Vietnamese stays with a 20% deposit using cash or Lux Points. Then you pay the balance closer to the date of your stay."
          />
        </div>
        <div class="relative w-full lg:w-1/3 px-3 pt-5 md:pt-0">
          <BlogPost
            img="https://www.qantas.com/images/qantas/lifestyle/couple-jumping-into-water/jpg/article.mobile.jpg"
            title="Access incredible value at Lux"
            desc="Discover our new and improved Classic Hotels Rewards, only available when you book using your Lux Points."
          />
        </div>
        <div class="relative w-full lg:w-1/3 px-3 pt-5 md:pt-0">
          <BlogPost
            img="https://www.qantas.com/images/qantas/ancillaries/airbnb/airbnb-jen-portland-elliott/jpg/article.mobile.jpg"
            title="Travel like a local with Airbnb"
            desc="Make yourself at home at over 7 million Airbnb homes in over 191 countries. Plus, earn 500 bonus Lux Points when you make your first ever Airbnb booking."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSlider from "@/components/slider/MainSlider";
const SearchTabs = () => import("@/components/search-tabs/SearchTabs");
const BlogPost = () => import("@/components/blog-post/BlogPost");

export default {
  name: "home",
  components: {
    MainSlider,
    SearchTabs,
    BlogPost
  },
  computed: {},
  methods: {}
};
</script>
