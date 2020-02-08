<template>
  <div :id="id" v-click-outside="{ handler: 'onBlurInput' }">
    <div class="relative w-full">
      <label
        class="block text-white text-base pb-1"
        :for="id"
        v-show="isExpanded"
      >
        {{ label }}
      </label>
      <styled-input
        :id="id"
        :name="id"
        :placeholder="placeholder"
        type="text"
        class="w-full text-lg rounded-0"
        autocomplete="off"
        :errors="errors"
        :value="valueInput"
        @focus="onFocusInput()"
      />
    </div>
    <div class="relative w-full" v-show="isExpanded && isFocusedInput">
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
                <strong>{{ item }}</strong
                ><span>, Vietnam</span>
              </div>
            </styled-item>
            <styled-item>
              <div>
                <span>We can't find a matching location for </span
                ><strong>''</strong><span></span>
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
const inputProps = { errors: Array };
const StyledInput = styled("input", inputProps)`
  height: 48px;
  color: #323232;
  font-size: 1rem;
  line-height: 25.5px;
  padding: 10.5px 14px 12px;
  border: 2px solid #fff;
  &::placeholder {
    font-size: 1.125rem;
  }
  &:focus {
    outline: none;
    border-color: #90e2df;
    box-shadow: inset 0 0 0 1px #8de2e0;
  }
  ${props =>
    props.errors &&
    props.errors.length > 0 &&
    `border-color: #ed710b!important;
    box-shadow: none!important;`}
`;
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
  name: "Input",
  components: {
    "styled-input": StyledInput,
    "styled-item": StyledItem
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
    }
  },
  data() {
    return {
      cities: ["Ha Noi City", "Ho Chi Minh City"],
      valueInput: "",
      isFocusedInput: false
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
    }
  },
  methods: {
    onFocusInput() {
      this.isFocusedInput = true;
    },
    onBlurInput() {
      this.isFocusedInput = false;
    },
    selectItem(item) {
      this.dataValue = item;
      this.valueInput = item + ", VietNam";
      this.isFocusedInput = false;
    }
  }
};
</script>
