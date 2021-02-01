<template>
  <div class="search-tabs">
    <div
      class="overlay fixed top-0 left-0 w-full h-full cursor-pointer z-10"
      style="background: rgba(0,0,0,0.7)"
      v-show="isExpanded"
    ></div>
    <tabs-wrapper
      ref="button"
      :class="[isExpanded ? 'z-50' : 'z-20']"
      v-click-outside="onCollapseTabs"
    >
      <Tabs
        :isExpanded="isExpanded"
        :collapsible="true"
        @onExpandTabs="onExpandTabs"
      >
        <Tab name="Book a hotel" icon="briefcase" :selected="isSelectedTab">
          <div class="block relative text-white bg-gray-0 pt-3 pb-8 md:py-0">
            <div class="items-center px-4 mb-4 md:mb-6 md:flex">
              <div class="w-full md:w-1/2">
                <a
                  class="relative overflow-visible text-lg font-bold border-b-2 border-red-0 leading-normal"
                >
                  <span class="sprite-hotels"></span>
                  Hotels and Airbnb
                </a>
              </div>
              <div class="hidden w-1/2 md:flex justify-end">
                <span class="hide-mobile-only right">
                  <a href="#" class="text-lg hover:underline">
                    <i class="fa fa-map-marker"></i>
                    <span class="px-3">Where can I stay</span>
                    <i class="fa fa-long-arrow-right"></i>
                  </a>
                </span>
              </div>
            </div>
            <form
              autocomplete="off"
              novalidate=""
              class="hotel-form"
              @submit="handleSubmit"
            >
              <div class="search-wrapper">
                <div class="md:flex w-full">
                  <div class="w-full md:w-1/3 pt-1 px-4">
                    <LocationInput
                      id="location-input"
                      label="Location"
                      placeholder="Where would you like to stay?"
                      :isExpanded="isExpanded"
                      v-model="locationData"
                      :cities="cityList"
                    />
                  </div>
                  <div class="w-full md:w-2/3 pt-1">
                    <DatePicker
                      showYear
                      :isExpanded="isExpanded"
                      :maxNights="21"
                      v-model="dateData"
                    />
                  </div>
                  <div
                    class="w-full hidden md:block md:w-1/8 pt-1 px-4"
                    v-if="!isExpanded"
                  >
                    <Button class="uppercase font-bold">
                      <i class="faf fa-chevron-right text-sm" />
                    </Button>
                  </div>
                </div>
                <div class="md:flex w-full">
                  <div class="w-full xl:w-1/2 md:pt-5 pt-2 px-4">
                    <GuestInput
                      id="guest-input"
                      label="Guests"
                      :isExpanded="isExpanded"
                      v-model="guestData"
                    />
                  </div>
                  <div class="w-full xl:w-1/2 md:pt-12 pt-6 px-4">
                    <Button class="uppercase font-bold">
                      Find your hotel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Tab>
        <Tab name="Manage booking" icon="clipboard-list-check">
          <div class="px-4">
            This function is not available.
          </div>
        </Tab>
        <Tab name="Check-in" icon="user-check">
          <div class="px-4">
            This function is not available.
          </div>
        </Tab>
        <Tab name="Hotel status" icon="history">
          <div class="px-4">
            This function is not available.
          </div>
        </Tab>
      </Tabs>
      <div
        class="lg:block hidden absolute text-white font-bold text-center top-0 right-auto cursor-pointer outline-none"
        tabindex="0"
        aria-hidden="false"
        style="left: calc(100% + 2.5rem)"
        v-if="isExpanded"
        @click="onCollapseTabs"
      >
        <i class="fa fa-times"></i>
        Close
      </div>
    </tabs-wrapper>
  </div>
</template>

<script>
import Tabs from "../core-ui/tabs/Tabs";
import Tab from "../core-ui/tabs/Tab";
import Button from "../core-ui/button/Button";
import DatePicker from "../core-ui/datepicker/DatePicker";
import LocationInput from "./LocationInput";
import GuestInput from "./GuestInput";
import fecha from "fecha";

import styled from "vue-styled-components";
import { mapGetters, mapActions } from "vuex";
import { GETTERS, ACTIONS } from "@/store/modules/hotel/const";

const TabsWrapper = styled.div`
  position: absolute;
  @media (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    margin: 1.5rem auto;
    padding: 0;
    width: calc(100% - 3rem);
    min-width: 90%;
  }
  @media (min-width: 769px) {
    top: 23rem;
    left: 50%;
    transform: translateX(-50%);
    max-width: 64.25rem;
    width: calc(100% - 1.875rem);
  }
`;
export default {
  name: "SearchTabs",
  components: {
    Tabs,
    Tab,
    Button,
    LocationInput,
    GuestInput,
    DatePicker,
    "tabs-wrapper": TabsWrapper
  },
  data() {
    return {
      isExpanded: false,
      isSelectedTab: false,
      locationData: {},
      guestData: {
        adults: 2,
        children: 0,
        infants: 0
      },
      dateData: {
        checkIn: new Date(),
        checkOut: new Date(new Date().valueOf() + 1000 * 3600 * 24)
      }
    };
  },
  created() {
    if (window.innerWidth > 768) {
      this.isSelectedTab = true;
    } else {
      this.isSelectedTab = false;
    }
  },
  computed: {
    ...mapGetters("hotel", {
      cityList: GETTERS.GET_CITIES
    })
  },
  methods: {
    ...mapActions("hotel", {
      setBaseQuery: ACTIONS.SET_BASE_QUERY
    }),
    onExpandTabs() {
      this.isExpanded = true;
    },
    onCollapseTabs() {
      this.isExpanded = false;
    },
    formatDate(date) {
      if (date) {
        return fecha.format(date, "YYYY-MM-DD");
      }
      return "";
    },
    handleSubmit(e) {
      e.preventDefault();
      const query = {
        cityId: this.locationData.id || this.cityList[0].id,
        date: JSON.stringify(this.dateData),
        guestCount: JSON.stringify(this.guestData)
      };
      this.setBaseQuery(query);
      this.$router.push({ path: "/hotels", query: query });
    }
  }
};
</script>
