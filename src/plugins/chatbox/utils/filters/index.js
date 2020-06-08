import Vue from "vue";

const linkifyFunc = function(text) {
  let urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim; // or (?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))
  return text.replace(urlRegex, function(url) {
    return (
      '<a href="' +
      url +
      '" target="_blank" style="color:#0000ee;text-decoration: underline;">' +
      url +
      "</a>"
    );
  });
};

Vue.filter("linkify", function(value) {
  return linkifyFunc(value);
});
