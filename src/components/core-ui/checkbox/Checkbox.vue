<template>
  <CheckboxStyledContainer>
    <label class="container">
      {{ data.label }}
      <input type="checkbox" :value="data.value" v-model="dataValue" />
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
    padding-left: 25px;
    cursor: pointer;
    font-size: 1.1em;
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
            border: 2px solid #8de2e0;
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
            border: 2px solid #8de2e0;
          }
        }
      }
    }
    .checkmark {
      &:after {
        left: 22%;
        top: 50%;
        width: 5px;
        height: 10px;
        border: solid #404147;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg) translate(-50%, -50%);
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 18px;
    width: 18px;
    border: 2px solid #ccc;
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
      type: Array
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
