<template>
  <RadioStyledContainer>
    <label class="container">
      {{ rate.label }}
      <input
        type="radio"
        :checked="rate.checked"
        name="radio"
        :value="rate.value"
        v-model="dataValue"
      />
      <span class="checkmark"></span>
    </label>
  </RadioStyledContainer>
</template>

<script>
import styled from "vue-styled-components";

const RadioStyledContainer = styled.div`
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
      &:checked {
        ~ {
          .checkmark {
            // background-color: #2196f3 !important;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #404147;
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
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
`;

export default {
  name: "Radio",
  components: {
    RadioStyledContainer
  },
  props: {
    rate: {
      type: Object
    },
    value: {
      type: Number
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
