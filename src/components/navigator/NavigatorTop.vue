<template>
  <header id="header" class="h-auto bg-white relative" role="banner">
    <div class="max-w-5lg mx-auto">
      <div class="flex items-center relative h-16">
        <div class="w-full md:w-1/5 px-3">
          <div class="flex items-center">
            <router-link to="/" class="block">
              <img
                alt="Travel"
                src="@/assets/svg/logo-desktop.svg"
                class="w-32 md:w-40 mr-5"
              />
            </router-link>
          </div>
        </div>
        <div class="flex w-full md:w-1/2">
          <ul class="flex mx-2 text-lg">
            <li
              class="mr-4 text-red-0 font-bold underline hover:text-red-0 hover:font-bold hover:underline"
            >
              <a href="/">Earn points</a>
            </li>
            <li class="mr-4 hover:text-red-0 hover:font-bold hover:underline">
              <a href="/">Use points</a>
            </li>
            <li class="hover:text-red-0 hover:font-bold hover:underline">
              <a href="/">Merchandise</a>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-grow items-center justify-end md:w-1/4 h-full lg:px-3 overflow-hidden md:overflow-visible"
        >
          <div class="search-top">
            <button class="search-top__button" type="button"></button>
          </div>
          <a
            class="block flex items-center ml-4 mr-1 opacity-75 border border-gray-0 rounded-full hover:text-red-0 hover:opacity-100 hover:border-red-0"
            href="https://github.com/minhnguyen1505"
            target="_blank"
          >
            <i
              class="faf fa-github-alt flex items-center justify-center w-6 h-6 "
            ></i>
          </a>

          <nav class="menu-top hidden">
            <ul>
              <li>
                <a class="menu-top__navigation" href="#">Menu<span></span></a>
              </li>
            </ul>
          </nav>
          <LoginRibbon />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LoginRibbon from "./LoginRibbon";

export default {
  name: "NavigatorTop",
  components: {
    LoginRibbon
  }
};
</script>
