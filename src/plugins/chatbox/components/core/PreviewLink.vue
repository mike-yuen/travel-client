<template>
  <div class="preview-link" v-if="response && !isLoading">
    <div @click="viewMore">
      <div class="preview-wrapper">
        <div class="preview-card-img" v-if="checkImg(response.images[0])">
          <img :src="response.images[0]" @error="imageError()" />
        </div>
        <div
          class="preview-card-info"
          :class="[
            checkImg(response.images[0])
              ? 'preview-bg-white'
              : 'preview-bg-gray'
          ]"
        >
          <div class="preview-card-text">
            <h1>{{ response.title }}</h1>
            <p>{{ response.description }}</p>
          </div>
          <div class="preview-card-btn" v-if="!checkImg(response.images[0])">
            <img
              v-if="response.favicons[0]"
              :src="response.favicons[0]"
              @error="iconError()"
            />
            <a href="javascript:;">{{ url }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-else :size="30" />
</template>

<script>
import { getLinkPreview } from "link-preview-js";
import Spinner from "./Spinner";
export default {
  name: "PreviewLink",
  props: {
    url: String
  },
  data: function() {
    return {
      response: null,
      isLoading: true,
      cors: process.env.LINK_CORS
    };
  },
  components: {
    Spinner
  },
  created() {
    this.getLinkPreview();
  },
  methods: {
    imageError() {
      this.response.images = [];
    },
    iconError() {
      this.response.favicons = [];
    },
    checkImg(img) {
      if (img && img.indexOf(this.cors) != 0) {
        let idxDot = img.lastIndexOf(".") + 1;
        let extFile = img
          .substr(idxDot, img.length)
          .toLowerCase()
          .substr(0, 3);
        if (["png", "jpe", "jpg", "gif"].indexOf(extFile) > -1) {
          return true;
        }
      }
      return false;
    },
    viewMore() {
      const win = window.open(this.url, "_blank");
      win.focus();
    },
    getLinkPreview() {
      this.isLoading = true;
      getLinkPreview(this.cors + this.url)
        .then((response) => {
          this.response = response;
          let urls = this.url.split("/");
          if (!this.response.title) {
            this.response.title = urls[2];
            this.response.favicons = [];
          } else {
            let originUrl = urls[0] + "//" + urls[2] + "/";
            this.response.favicons[0] = response.favicons[0].replace(
              this.cors,
              originUrl
            );
          }
          if (response.mediaType == "image") {
            this.response.images = [this.url];
          }
          if (!this.response.images) {
            this.response.images = [];
          }
          this.isLoading = false;
        })
        .catch(() => {
          this.getSelfMeta();
          this.isLoading = false;
        });
    },
    getSelfMeta() {
      let urls = this.url.split("/");
      let originUrl = urls[2];
      let title = originUrl;
      let favicon = null;
      if (process.env.VUE_APP_BASE_URL.indexOf(originUrl) > -1) {
        title = urls[urls.length - 1] || urls[urls.length - 2];
        if (title != originUrl) {
          title = title.charAt(0).toUpperCase() + title.slice(1);
        }
        let links = document.querySelector("head").querySelectorAll("link");
        for (let i = 0; i < links.length; i++) {
          if (links[i].rel == "icon" || links[i].rel == "shortcut icon") {
            favicon = links[i].href;
            break;
          }
        }
      }
      this.response = {
        images: [],
        favicons: [favicon],
        title: title
      };
    }
  },
  watch: {
    url: function() {
      this.response = null;
      this.getLinkPreview();
    }
  }
};
</script>
<style scoped lang="scss">
.preview-link {
  width: 185px;
  margin: 15px auto 10px;
  cursor: pointer;
  .preview-wrapper {
    overflow: hidden;
    width: 100%;
    border-radius: 7px;
    background-color: #f0f2f5;
    .preview-card-img {
      padding: 10px 0;
      width: 100%;
      background-color: #dfe1e4;
      text-align: center;
      img {
        vertical-align: middle;
        border-style: none;
        width: 90%;
        max-height: 200px;
        max-width: 250px;
        border-radius: 7px 7px 0 0;
      }
    }
  }
  .preview-card-info {
    border-radius: 7px;
  }
  .preview-card-text {
    width: 90%;
    margin: 0 auto;
    line-height: 20px;
    h1 {
      text-align: left;
      font-size: 1.2rem;
      line-height: 1.2;
      color: #293b52;
      padding: 5px 0;
      font-weight: 600;
      word-break: break-word;
    }
    p {
      color: #8d8d8d;
      font-size: 15px;
      margin: 0;
      text-align: left;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
  }
  .preview-card-btn {
    position: relative;
    text-align: left;
    width: 100%;
    padding: 5px 5%;
    font-size: 14px;
    display: inline-flex;
    background-color: #dfe1e4;
    a {
      color: #293b52;
      padding-bottom: 5px;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }
  .preview-bg-gray {
    background-color: #dfe1e4;
  }
  .preview-bg-white {
    background-color: #f0f2f5;
    padding-bottom: 8px;
  }
}

@media only screen and (max-width: 368px) {
  .preview-link {
    width: 195px;
  }
}

@media only screen and (min-width: 369px) and (max-width: 575px) {
  .preview-link {
    width: 235px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 780px) {
  .preview-link {
    width: 260px;
  }
}
</style>
