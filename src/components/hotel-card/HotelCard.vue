<template>
  <div class="max-w-full mx-auto p-2">
    <div class="border-solid border-1 shadow-lg rounded mt-6">
      <div class="lg:flex">
        <div class="lg:w-1/4">
          <skeleton-box v-if="loading" width="100%" height="200px" />
          <slot v-else name="figure" />
        </div>
        <div class="lg:w-3/4 relative">
          <div class="p-6">
            <div class="float-left w-2/4">
              <div v-if="loading">
                <skeleton-box width="100%" height="20px" borderRadius="10px" />
              </div>
              <slot v-else name="title" />
              <div v-if="loading">
                <skeleton-box width="25%" height="12px" borderRadius="10px" />
              </div>
              <slot v-else name="country" />
              <div class="lg:flex">
                <div class="lg:flex self-center">
                  <skeleton-box v-if="loading" borderRadius="10px" width="100px" class="mr-2" />
                  <slot v-else name="numberOfRank" />
                </div>
                <skeleton-box v-if="loading" borderRadius="10px" width="100px" class="mr-2" />
                <slot v-else name="tripadvisorImage" />
                <skeleton-box v-if="loading" borderRadius="10px" width="100px" class="mr-2" />
                <slot v-else name="numberOfReviews" />
              </div>
              <div class="lg:flex">
                <slot name="icon" />
              </div>
            </div>
            <div class="float-right text-right w-2/4">
              <div v-if="loading" class="text-right block">
                <skeleton-box width="50%" height="20px" borderRadius="10px" />
              </div>
              <slot v-elese name="numberOfNights" />
              <div v-if="loading" class="text-right block">
                <skeleton-box width="30%" height="12px" borderRadius="10px" />
              </div>
              <slot v-elese name="discount" />
              <div v-if="loading" class="text-right block">
                <skeleton-box width="40%" borderRadius="10px" />
              </div>
              <slot v-elese name="price" />
              <slot name="points" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonBox from "@/components/skeleton/SkeletonBox.vue";

export default {
  name: "HotelCard",
  components: {
    SkeletonBox
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  }
};
</script>
