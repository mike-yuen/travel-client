import Vue from "vue";
import { URL_REGEX } from "@/services/constants";
const linkifyFunc = function(text) {
  return text.replace(URL_REGEX, function(url) {
    return (
      '<a href="' +
      url +
      '" target="_blank" style="color:#0000ee;text-decoration: underline;word-break: break-all;">' +
      url +
      "</a>"
    );
  });
};

Vue.filter("linkify", function(value) {
  return linkifyFunc(value);
});
