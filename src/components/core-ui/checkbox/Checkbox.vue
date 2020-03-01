<template>
  <CheckboxStyledContainer>
    <label class="container">
      {{ data.label }}
      <input
        type="checkbox"
        :id="data.value"
        :checked="data.checked"
        :value="data.value"
        v-model="dataValue"
      />
      <span class="checkmark"></span>
    </label>
  </CheckboxStyledContainer>
</template>

<script>
import styled from "vue-styled-components";

const CheckboxStyledContainer = styled.div`
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    // margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked {
        ~ {
          .checkmark {
            // background-color:  !important;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(61, 88, 237, 1);
            -moz-box-shadow: 0px 0px 5px 0px rgba(61, 88, 237, 1);
            box-shadow: 0px 0px 5px 0px rgba(61, 88, 237, 1);
            &:after {
              display: block;
            }
          }
        }
      }
    }
    &:hover {
      input {
        ~ {
          .checkmark {
            background-color: #ccc;
          }
        }
      }
    }
    .checkmark {
      &:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid #404147;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
`;

export default {
  name: "Checkbox",
  components: {
    CheckboxStyledContainer
  },

  props: {
    data: {
      type: Object
    },

    value: {
      type: String || Number || Boolean
    }
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
  }
};
</script>
