import Vue from "vue";
let handleOutsideClick;
Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const { handler } = binding.value;
      // let clickedOnExcludedEl = false
      // exclude.forEach(refName => {
      //     if (!clickedOnExcludedEl) {
      //         const excludedEl = vnode.context.$refs[refName]
      //         console.log('excludedEl', excludedEl)
      //         console.log('e.target', e.target)
      //         // clickedOnExcludedEl = excludedEl.contains(e.target)
      //     }
      // })
      if (!el.contains(e.target)) {
        vnode.context[handler]();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },

  unbind() {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
});
