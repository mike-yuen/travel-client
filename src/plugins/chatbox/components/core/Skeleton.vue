<template>
  <div class="skeleton"></div>
</template>

<script>
export default {
  name: "Skeleton"
};
</script>

<style lang="scss" scoped>
.skeleton {
  animation: animation-shimmering 1.5s linear infinite;
  background-color: #f6f8f9;
  background-image: linear-gradient(
    -90deg,
    #f6f8f9 0%,
    #e8ecee 50%,
    #f6f8f9 100%
  );
  background-position: -300px 0;
  background-repeat: no-repeat;
  background-size: 300px 100%;
  border-radius: 8px;
  height: 40px;
  width: 40px;
}
@keyframes animation-shimmering {
  0% {
    background-position: -300px 0;
  }
  100% {
    background-position: 800px 0;
  }
}
</style>
