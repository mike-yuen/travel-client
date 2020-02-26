<template>
  <div class="Box-Flex flex justify-between">
    <div class="md:flex w-full px-3">
      <div class="css-17fpe6a-Box e902p311">
        <div class="css-k0cg65-Box etkwe9z0" data-loaded="">
          <img
            src="https://i.travelapi.com/hotels/20000000/19480000/19473700/19473638/eb2f7401_b.jpg"
            alt="Standard Studio, 1 Queen Bed, Non Smoking"
            class="css-ny27ux etkwe9z1"
          />
        </div>
        <div class="css-m429vl-Box e902p312">
          <div class="css-16k7n38-Box e902p313">
            <div class="css-phxg8u-Box-Flex e6hqxet0">
              <svg
                color="white"
                class="e16d2er41 css-1y80lx8-StyledSvg-Icon e16d2er40"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                title="image"
                fill="currentcolor"
              >
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                ></path>
              </svg>
              <div class="css-1mn2okd-Box e5f71i10">13</div>
            </div>
          </div>
        </div>
      </div>
      <div class="css-5zp4tv-Box-Flex e6hqxet0">
        <div class="css-1mn2okd-Box e5f71i10">
          <h2 class="css-14u7heq-Heading-Heading-Text e1cffud32">
            {{ data.name }}
          </h2>
          <div class="css-phxg8u-Box-Flex e6hqxet0">
            <svg
              color="greys.steel"
              class="e16d2er41 css-he7d4h-StyledSvg-Icon e16d2er40"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              title="person"
              fill="currentcolor"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path></svg
            ><svg
              color="greys.steel"
              class="e16d2er41 css-he7d4h-StyledSvg-Icon e16d2er40"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              title="person"
              fill="currentcolor"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path></svg
            ><span class="css-g2zum-Text e7qkkfc0">Sleeps 2 guests</span>
          </div>
          <button
            type="button"
            color="inherit"
            class="css-w7t6m5-NakedButton e1tmcgay0"
          >
            <span text-decoration="underline" class="css-xoh9yf-Text e1ucyleq0"
              >View room details</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCardGeneral",
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: "",
          image_url: "",
          adults: 0,
          description: {},
          features: {},
          prices: 0
        };
      }
    }
  }
};
</script>
