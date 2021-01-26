<template>
  <div class="w-100">
    <div class="relative w-100 my-4">
      <div class="article  ">
        <div class="article-img-overlay">
          <div class="article-img-container">
            <img :src="img" alt="Women in a pool" />
          </div>
        </div>

        <div class="article-content py-4">
          <h3 class="text-xl font-bold">{{ title }}</h3>
          <p>{{ desc }}</p>

          <a class="internal-link text-red-0" href="#">Learn more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  props: {
    img: String,
    title: String,
    desc: String
  }
};
</script>
