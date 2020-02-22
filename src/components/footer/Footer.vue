<template>
  <footer id="footer" class="block relative pt-2 pb-8 bg-white">
    <div
      class="relative py-8 px-0 mb-4 md:mb-12 bg-gray-100 border-t border-b border-gray-300"
    >
      <div class="relative w-full max-w-5lg mx-auto">
        <scroll-top href="#header"
          ><i class="fa fa-chevron-up" />Go to top</scroll-top
        >
        <div class="lg:flex relative">
          <section class="relative w-full lg:w-3/12 px-3 pt-5 md:pt-0">
            <div>
              <h3 class="mb-3 font-normal text-2xl leading-7">
                About LuxTravel
              </h3>
              <ul class="overflow-hidden text-base">
                <li
                  class="block w-1/2 md:w-full float-left md:float-none leading-6 overflow-hidden"
                  v-for="(item, index) in aboutListData"
                  :key="index"
                >
                  <a
                    class="text-gray-600 underline"
                    :href="item.link"
                    target="_blank"
                  >
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section class="relative w-full lg:w-5/12 px-3 pt-5 md:pt-0">
            <div>
              <h3 class="mb-3 font-normal text-2xl leading-7">
                Never miss a deal again
              </h3>
              <p class="w-full md:w-64 text-lg mb-6">
                Create sale alerts with the&nbsp;
                <a class="text-gray-600 underline" href=""
                  >Lux smartphone app</a
                >
                &nbsp;or&nbsp;
                <a class="text-gray-600 underline" href=""
                  >subscribe to Red Email</a
                >.
              </p>
              <form>
                <div class="md:flex relative">
                  <div class="relative w-full md:w-2/3 md:pr-3">
                    <Input
                      id="email-subcribe"
                      placeholder="Enter your email"
                      type="text"
                    />
                  </div>
                  <div class="relative w-full md:w-2/3 mt-2 md:mt-0">
                    <Button
                      className="w-full md:w-40 bg-gray-0 opacity-75 hover:opacity-100"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <section class="relative w-full lg:w-4/12 px-3 pt-5 md:pt-0">
            <div>
              <h3 class="mb-3 font-normal text-2xl leading-7">Follow us</h3>
              <ul class="overflow-hidden">
                <li
                  class="block w-1/2 float-left pb-2"
                  v-for="(item, index) in socialListData"
                  :key="index"
                >
                  <a
                    class="text-gray-600 hover:underline"
                    :href="item.link"
                    target="_blank"
                  >
                    <i
                      :class="'faf fa-' + item.icon"
                      class="w-6 h-6 leading-6 border border-gray-600 text-center rounded-full text-xs"
                    ></i>
                    {{ item.content }}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="footer-lower">
      <div class="hidden md:flex w-full max-w-5lg mx-auto">
        <div class="relative w-full lg:w-3/12 px-3">
          <a
            class="footer__jetstar"
            href="http://www.jetstar.com"
            target="_blank"
            >Jetstar</a
          >
          <a class="footer__accessibility" href="/"
            >eSSENTIAL Accessibility<sup>TM</sup></a
          >
        </div>
        <div class="relative w-full lg:w-9/12 px-3">
          <ul class="flex justify-end">
            <li
              class="mr-2 leading-6"
              v-for="(item, index) in addonListData"
              :key="index"
            >
              <a class="text-gray-600 underline" :href="item.link">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full max-w-5lg mx-auto">
        <div class="relative w-full px-3">
          <p
            class="mb-0 md:mb-3 text-center md:text-right text-gray-600 text-sm"
          >
            Copyright © LuxTravel Limited {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Input from "@/components/core-ui/field/Input";
import Button from "@/components/core-ui/button/Button";
import styled from "vue-styled-components";

const ScrollTop = styled.a`
  position: absolute;
  top: -3.375rem;
  right: 0.9375rem;
  width: 2.25rem;
  height: 2.25rem;
  color: transparent;
  background: #666;
  text-indent: 150%;
  white-space: nowrap;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    top: auto;
    bottom: -3.75rem;
    width: 3rem;
    height: 3rem;
    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  }
  &:hover {
    color: #323232;
    background: #323232;
    font-size: 0.75rem;
    line-height: 7.75rem;
    text-transform: uppercase;
    text-decoration: none;
    text-indent: 0;
    overflow: visible;
  }
`;

export default {
  name: "Footer",
  components: {
    Input,
    Button,
    "scroll-top": ScrollTop
  },
  data() {
    return {
      aboutListData: [
        { title: "Baggage & Optional Service Fees", link: "" },
        { title: "Customer Service Plan", link: "" },
        { title: "LuxTravel Group", link: "" },
        { title: "News Room", link: "" },
        { title: "Careers", link: "" },
        { title: "More about Lux", link: "" },
        { title: "Lux Centenary", link: "" },
        { title: "Modern Slavery Act Statement", link: "" }
      ],
      socialListData: [
        {
          icon: "facebook",
          link: "",
          content: "1.3m+ likes"
        },
        {
          icon: "youtube",
          link: "",
          content: "86k+ views"
        },
        {
          icon: "twitter",
          link: "",
          content: "460k+ followers"
        },
        {
          icon: "instagram",
          link: "",
          content: "725k+ followers"
        },
        {
          icon: "linkedin",
          link: "",
          content: "204k+ followers"
        }
      ],
      addonListData: [
        { title: "FAQs", link: "" },
        { title: "Contacts", link: "" },
        { title: "Privacy & Security", link: "" },
        { title: "Terms of Use", link: "" },
        { title: "Conditions of Carriage", link: "" },
        { title: "Fare types", link: "" },
        { title: "Website Feedback", link: "" }
      ]
    };
  }
};
</script>
