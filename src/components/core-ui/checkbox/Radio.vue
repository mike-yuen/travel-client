<template>
  <RadioStyledContainer>
    <label class="container">
      {{ data.label }}
      <input
        type="radio"
        :checked="data.checked"
        name="radio"
        :value="data.value"
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
    padding-left: 25px;
    cursor: pointer;
    font-size: 1.1em;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #404147;
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 18px;
    width: 18px;
    border: 2px solid #ccc;
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
    data: {
      type: Object
    },
    value: {
      type: Number || String || Boolean
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
