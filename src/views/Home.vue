<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <div class="text-center text-2xl font-bold pt-6">
      <router-link :to="{ name: 'hotel-properties', params: { hotelId: '1' } }">
        Detail Room Demo
      </router-link>
    </div>
    <div class="max-w-xs mx-auto">
      <div id="g-recaptcha" class="g-recaptcha" :data-sitekey="sitekey"></div>
    </div>
    <LinkPreview url="https://vuejs.org/" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import MainSlider from "@/components/slider/MainSlider";
const SearchTabs = () => import("@/components/search-tabs/SearchTabs");
const LinkPreview = () => import("@/components/link-preview/LinkPreview");

export default {
  name: "home",
  components: {
    MainSlider,
    SearchTabs,
    LinkPreview
  },
  data() {
    return {
      sitekey: "6LetMfMUAAAAADkh3b3DCi63-e34-sGzJZX1CQ19",
      widgetId: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "user/userState",
      hotel: "hotel/hotelState"
    })
  },
  methods: {
    testApi() {
      apiServices.authenticate();
    },
    reset(id) {
      window.grecaptcha.reset(id);
    },
    initReCaptcha: function() {
      let self = this;
      setTimeout(function() {
        if (typeof window.grecaptcha === "undefined") {
          self.initReCaptcha();
        } else {
          self.widgetId = window.grecaptcha.render("g-recaptcha", {
            sitekey: self.sitekey,
            size: "checkbox",
            callback: (response) => {
              if (response) {
                // console.log("response", response);
                self.reset(self.widgetId);
              }
            }
          });
        }
      }, 500);
    }
  },
  mounted() {
    this.initReCaptcha();
  }
};
</script>
