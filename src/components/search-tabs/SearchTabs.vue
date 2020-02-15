<template>
  <div>
    <div
      class="overlay fixed top-0 left-0 w-full h-full cursor-pointer"
      style="background: rgba(0,0,0,0.7)"
      v-show="isExpanded"
    ></div>
    <tabs-wrapper ref="button" v-click-outside="{ handler: 'onCollapseTabs' }">
      <Tabs :isExpanded="isExpanded" @onExpandTabs="onExpandTabs">
        <Tab name="Book a hotel" icon="briefcase" :selected="true">
          <div class="block relative text-white">
            <div class="flex items-center px-4 mb-4">
              <div class="w-1/2">
                <a
                  class="relative overflow-visible text-lg font-bold border-b-2 border-red-0 leading-normal"
                >
                  <span class="sprite-hotels"></span>
                  Hotels and Airbnb
                </a>
              </div>
              <div class="w-1/2 flex justify-end">
                <span class="hide-mobile-only right">
                  <a href="#" class="text-lg hover:underline">
                    <i class="fa fa-map-marker"></i>
                    <span class="px-3">Where can I stay</span>
                    <i class="fa fa-long-arrow-right"></i>
                  </a>
                </span>
              </div>
            </div>
            <div class="">
              <form autocomplete="off" novalidate="" class="hotel-form">
                <div class="flex w-full">
                  <div class="w-full xl:w-1/3 pt-1 px-4">
                    <LocationInput
                      id="location-input"
                      label="Location"
                      placeholder="Where would you like to stay?"
                      :isExpanded="isExpanded"
                      v-model="locationData"
                    />
                  </div>
                  <div class="w-full xl:w-1/3 pt-1 px-4">
                    <DateInput
                      id="checkin-input"
                      label="Check-in date"
                      :isExpanded="isExpanded"
                      v-model="date.checkin"
                    />
                  </div>
                  <div class="w-full xl:w-1/3 pt-1 px-4">
                    <DateInput
                      id="checkout-input"
                      label="Check-out date"
                      :isExpanded="isExpanded"
                      v-model="date.checkout"
                    />
                  </div>
                </div>

                <div class="flex w-full">
                  <div class="w-full xl:w-1/2 pt-5 px-4">
                    <GuestInput
                      id="guest-input"
                      label="Guests"
                      :isExpanded="isExpanded"
                      v-model="guestData"
                    />
                  </div>
                  <div class="w-full xl:w-1/2 pt-12 px-4">
                    <Button class="uppercase font-bold">Find your hotel</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Tab>
        <Tab name="Manage booking" icon="clipboard-list-check">
          dasdasdadasdasdadas
        </Tab>
        <Tab name="Check-in" icon="user-check">
          aasdkjahshdkasjdhsdsakjhdkasjhdkjas
        </Tab>
        <Tab name="Hotel status" icon="history"
          >aasdkjahshdkasjdhsdsakjhdkasjhdkjas</Tab
        >
      </Tabs>
      <span
        class="absolute text-white"
        tabindex="0"
        aria-hidden="false"
        style="
      top: 0;
      right: auto;
      left: calc(100% + 2.5rem);"
        >Close</span
      >
    </tabs-wrapper>
  </div>
</template>

<script>
import Tabs from "../core-ui/tabs/Tabs";
import Tab from "../core-ui/tabs/Tab";
import Button from "../core-ui/button/Button";
import LocationInput from "./LocationInput";
import DateInput from "./DateInput";
import GuestInput from "./GuestInput";

import styled from "vue-styled-components";
const TabsWrapper = styled.div`
  position: absolute;
  top: 23rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 64.25rem;
  width: calc(100% - 1.875rem);
`;
export default {
  name: "SearchTabs",
  components: {
    Tabs,
    Tab,
    Button,
    LocationInput,
    DateInput,
    GuestInput,
    "tabs-wrapper": TabsWrapper
  },
  data() {
    return {
      isExpanded: false,
      locationData: "",
      guestData: {
        adults: 2,
        children: 0,
        infants: 0
      },
      date: {
        checkin: "Sun 9 Feb 2020",
        checkout: "Mon 10 Feb 2020"
      }
    };
  },
  methods: {
    onExpandTabs() {
      this.isExpanded = true;
    },
    onCollapseTabs() {
      this.isExpanded = false;
    }
  }
};
</script>
