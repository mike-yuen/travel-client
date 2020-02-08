<template>
  <div>
    <div
      class="overlay fixed top-0 left-0 w-full h-full cursor-pointer"
      style="background: rgba(0,0,0,0.7)"
      v-show="isExpanded"
    ></div>
    <tabs-wrapper ref="button" v-click-outside="{ handler: 'onCollapseTabs' }">
      <Tabs :isExpanded="isExpanded" @onExpandTabs="onExpandTabs">
        <Tab name="Book a hotel" :selected="true">
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
                  <div class="w-full xl:w-1/3">
                    Date In
                  </div>
                  <div class="w-full xl:w-1/3">
                    Date out
                  </div>
                </div>

                <div class="flex w-full">
                  <div class="w-full xl:w-1/2">
                    Guest Input
                  </div>
                  <div class="w-full xl:w-1/2">
                    <Button>Find your hotel</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Tab>
        <Tab name="Manage booking"
          ><div class="ql-login-column ql-login-12">
            <div class="ql-login-error" name="validationError">
              <svg
                class="ql-login-exclamation-icon"
                width="20px"
                height="20px"
                viewBox="0 0 20 20"
                version="1.1"
              >
                <title>error icon</title>
                <g
                  stroke="none"
                  stroke-width="1.5"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-30.000000, -432.000000)">
                    <g transform="translate(15.000000, 98.000000)">
                      <g transform="translate(0.000000, 318.000000)">
                        <g>
                          <g transform="translate(16.000000, 17.000000)">
                            <path
                              d="M16.601377,8.89555594 C17.1328743,8.40101081 17.1328743,7.59898919 16.601377,7.10444406 C16.4622516,6.974939 3.04502015,-0.825426978 2.96573664,-0.86244336 L2.95573489,-0.868351342 L2.95506062,-0.868037644 C2.77474822,-0.949912862 2.57505042,-1 2.36130521,-1 C1.68736726,-1 1.13176459,-0.543150924 1.02303773,0.0553851516 L1,15.7336006 C1,16.4329383 1.6094323,17 2.36102427,17 C2.57342092,17 2.77177017,16.9508017 2.95067783,16.8702335 L16.601377,8.89555594 Z"
                              stroke="#323232"
                              transform="translate(9.000000, 8.000000) rotate(-90.000000) translate(-9.000000, -8.000000) "
                            ></path>
                            <text
                              font-family="Arial Black, Gadget, sans-serif"
                              font-size="11"
                              fill="#323232"
                              font-weight="600"
                            >
                              <tspan x="7.2" y="13">!</tspan>
                            </text>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <div class="ql-login-error-text" name="validationErrorText">
                <div tabindex="0">
                  <div class="ql-login-error-heading">
                    The details do not match our records
                  </div>
                  <div class="ql-login-error-sub-heading">
                    Please check your details, or select
                    <a class="ql-login-link" href="#">reset your pin</a>
                  </div>
                </div>
              </div>
            </div>
          </div></Tab
        >
        <Tab name="Check-in">aasdkjahshdkasjdhsdsakjhdkasjhdkjas</Tab>
        <Tab name="Hotel status">aasdkjahshdkasjdhsdsakjhdkasjhdkjas</Tab>
      </Tabs>
    </tabs-wrapper>
  </div>
</template>

<script>
import Tabs from "../core-ui/tabs/Tabs";
import Tab from "../core-ui/tabs/Tab";
import Button from "../core-ui/button/Button";
import LocationInput from "./LocationInput";

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
    "tabs-wrapper": TabsWrapper
  },
  data() {
    return {
      isExpanded: false,
      locationData: ""
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
