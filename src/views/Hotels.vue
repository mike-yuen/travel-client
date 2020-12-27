<template>
  <div id="hotels" style="background-color: #f4f5f6">
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="block py-8 min-h-20">
        <h1 class="text-3xl font-bold m-0 mb-2">
          Hotels in Saint-Aunes, France
        </h1>
        <div class="css-d785tk-Box e5f71i10">
          <div class="css-l6j7gi-Box-Flex em8yo161">
            <div data-testid="result-count" class="css-bx7fxa-Box e5f71i10">
              Showing 1 available out of 3 properties
            </div>
          </div>
          <div class="css-1ev36eu-Box e5f71i10">
            <div class="css-72bb8v-Box-Flex em8yo160">
              <div class="css-18aidf3-Box e1sqdzo10"></div>
              <div class="css-iczpqk-Box e1sqdzo10"></div>
              <div class="css-c4dzg2-Box e1sqdzo10"></div>
              <div class="css-wiinfk-Box e1sqdzo10"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:flex">
        <div class="w-full lg:w-3/10 p-0 lg:pr-8 lg:mr-12">
          <div class="hidden lg:block">
            <div class="p-0 mb-4 border-b border-gray-50">
              <div class="mb-4">
                <div class="flex justify-between">
                  <div>
                    <h2 class="font-bold m-0 p-0">
                      Filter properties
                    </h2>
                  </div>
                  <div>
                    <button type="button" class="focus:outline-none">
                      <span class="underline">Reset all filters</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-0 mb-4 border-b border-gray-50">
              <p class="font-bold mb-3">Price per night [AUD]</p>
              <PriceRangeSlider
                :hotels="hotels"
                :step="5"
                v-on:priceReceive="(...price) => this.priceReceive(...price)"
              />
            </div>
            <div class="p-0 pb-4 mb-4 border-b border-gray-50">
              <HotelRatingFilter />
            </div>
            <div class="p-0 pb-4 mb-4 border-b border-gray-50">
              <TripAdvisorRating />
            </div>
            <div class="p-0 pb-4 mb-4 border-b border-gray-50">
              <HotelPropertyFilter />
            </div>
            <div class="p-0 pb-4 mb-4">
              <Facilities />
            </div>
          </div>
        </div>
        <div class="w-full lg:w-7/10">
          <SortType
            :optionsSelect="optionsSelectSort"
            :optionsRadio="optionsRadioSort"
            v-on:sortValue="(...value) => this.sortValue(...value)"
          />
          <HotelCard
            v-for="(hotel, index) in hotels"
            :key="index"
            :hotel="hotel"
            :loading="loading"
          />
        </div>
        <Pagination
          v-model="page"
          :page-count="hotels.length"
          :margin-pages="2"
          :page-range="5"
        />
      </div>
    </div>
  </div>
</template>

<script>
const HotelCard = () => import("@/components/hotel-card/HotelCard");
const HotelRatingFilter = () =>
  import("@/components/advanced-filter/HotelRating");
const TripAdvisorRating = () =>
  import("@/components/advanced-filter/TripAdvisorRating");
const HotelPropertyFilter = () =>
  import("@/components/advanced-filter/PropertyType");
const Facilities = () => import("@/components/advanced-filter/Facilities");
const SortType = () => import("@/components/advanced-filter/SortType");
const PriceRangeSlider = () =>
  import("@/components/price-range-slider/PriceRangeSlider");
const Pagination = () => import("@/components/pagination/Pagination");

export default {
  name: "Hotels",
  components: {
    HotelCard,
    Pagination,
    PriceRangeSlider,
    HotelRatingFilter,
    TripAdvisorRating,
    HotelPropertyFilter,
    Facilities,
    SortType
  },
  data() {
    return {
      SortArray: null,
      optionsSelectSort: [
        { label: "Best Deal", value: "promotion" },
        { label: "Popularity", value: "popularity" },
        { label: "Highest Price", value: "price_desc" },
        { label: "Lowest Price", value: "price_asc" },
        { label: "TripAdvisor Rating", value: "tripadvisor" }
      ],
      optionsRadioSort: [
        { label: "Use Cash", value: "cash" },
        { label: "Use Points", value: "points" }
      ],
      page: 1,
      loading: true,
      priceRange: null,
      hotels: [
        {
          title: "The Westin Resort & Spa Cancun",
          country: "VietNam",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 100,
          numberOfNights: 1,
          numberOfReviews: 3000,
          numberOfRank: 4.5,
          points: 90,
          isDeal: true,
          icons: ["phone", "car"]
        },
        {
          title: "The Westin Resort & Spa Cancun",
          country: "US",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 800,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        },
        {
          title: "The Westin Resort & Spa Cancun",
          country: "US",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 2800,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        }
      ]
    };
  },

  methods: {
    skeletonLoading() {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 2000);
    },

    priceReceive(...price) {
      this.priceRange = price;
    },

    sortValue(...value) {
      this.SortArray = value;
    },

    showFilter() {
      this.filter = !this.filter;
    }
  },

  mounted() {
    this.skeletonLoading();
  }
};
</script>
