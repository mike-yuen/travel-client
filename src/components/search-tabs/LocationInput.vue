<template>
  <div :id="id" v-click-outside="onCloseSelector">
    <Input
      :id="id"
      :label="label"
      :showLabel="isExpanded"
      :placeholder="placeholder"
      type="text"
      :value="valueInput"
      :icon="{ code: 'times', isShown: hasKeyword }"
      @click="onClickInput($event)"
      @keyup="onKeyupInput($event)"
      @actionOnIcon="clearKeyword"
    />
    <div class="relative w-full z-10" v-show="isExpanded && isOpenSelector">
      <div class="box-content absolute w-full">
        <div class="relative w-full">
          <ul
            class="w-full overflow-y-auto top-0 pl-0 mt-0 list-none cursor-pointer 
            border-2 border-t-0 border-gray-50 text-gray-0"
            role="listbox"
            style="max-height: 242px"
          >
            <styled-item
              v-for="(item, index) in cities"
              :key="index"
              @click="selectItem(item)"
            >
              <div>
                <strong>{{ item.name }}</strong>
                <span>, Vietnam</span>
              </div>
            </styled-item>
            <styled-item v-if="!cities.length">
              <div>
                <span>We can't find a matching location for </span>
                <strong>''</strong><span></span>
              </div>
            </styled-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";
import Input from "@/components/core-ui/field/Input";
const StyledItem = styled.li`
  background-color: #f4f5f6;
  border-left: 3px solid transparent;
  border-top: 1px solid #dadada;
  font-size: 18px;
  line-height: 25.5px;
  min-height: 47px;
  padding: 10.5px 21px 10.5px 18px;
  position: relative;
  vertical-align: middle;
  &:first-child {
    border-top: 0;
  }
  &:hover {
    background-color: #fff;
    border-left: 3px solid #90e2df;
    outline: none;
  }
`;
export default {
  name: "LocationInput",
  components: {
    "styled-item": StyledItem,
    Input
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {},
    errors: {
      type: Array
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    cities: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      valueInput: "",
      isOpenSelector: false
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    hasKeyword() {
      return this.valueInput.replace(/\s/g, "").length > 0;
    }
  },
  methods: {
    isValidKeyword(keyword) {
      const validKeywordLength = keyword.replace(/\s/g, "").length;
      return validKeywordLength > -1;
    },
    onClickInput(keyword) {
      this.isOpenSelector = !!this.isValidKeyword(keyword);
    },
    onCloseSelector() {
      this.isOpenSelector = false;
    },
    selectItem(item) {
      this.dataValue = item;
      this.valueInput = item.name + ", VietNam";
      this.isOpenSelector = false;
    },
    onKeyupInput(keyword) {
      this.valueInput = keyword;
      this.isOpenSelector = !!this.isValidKeyword(keyword);
    },
    clearKeyword() {
      this.valueInput = "";
      this.isOpenSelector = false;
    }
  }
};
</script>
