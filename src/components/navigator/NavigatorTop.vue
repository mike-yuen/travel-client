<template>
  <header id="header" class="h-auto bg-white relative" role="banner">
    <div class="max-w-5lg mx-auto">
      <div class="flex items-center relative h-18">
        <div class="lg:w-1/4 pr-6">
          <div class="flex items-center">
            <router-link to="/" class="block">
              <img
                alt="Travel"
                src="@/assets/svg/logo-yang.svg"
                class="w-48 mr-5"
              />
            </router-link>
          </div>
        </div>

        <div class="flex flex-grow items-center justify-end lg:w-3/4 h-full">
          <div class="search-top">
            <button
              aria-label="Top search button"
              class="search-top__button"
              type="button"
            ></button>
          </div>

          <a
            class="block flex items-center ml-4 mr-2 hover:opacity-75 hover:underline"
            href="https://github.com/minhnguyen1505"
            target="_blank"
          >
            <img
              alt="github"
              src="@/assets/svg/logo-github.svg"
              class="w-5 h-5 mr-2"
            />
            <span> Github Never Die</span>
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
