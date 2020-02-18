<template>
  <div :id="id" v-show="isExpanded" v-click-outside="onCloseSelector">
    <Input
      :id="id"
      :label="label"
      :placeholder="placeholder"
      :value="valueInput"
      :disableKeyPress="true"
      :icon="{ code: iconCode, isShown: true }"
      type="text"
      @click="onOpenSelector($event)"
      @actionOnIcon="toggleInput"
    />
    <div class="relative w-full z-10" v-show="isOpenSelector">
      <div class="box-content absolute w-full">
        <div class="relative w-full">
          <styled-dropdown>
            <InputNumber
              id="adults-quantity"
              label="Adults"
              v-model="dataValue.adults"
              :min="1"
              :max="9"
            />
            <InputNumber
              id="children-quantity"
              label="Children (3 - 12yrs)"
              v-model="dataValue.children"
              :min="0"
              :max="9"
            />
            <InputNumber
              id="infants-quantity"
              label="Infants (0 - 2yrs)"
              v-model="dataValue.infants"
              :min="0"
              :max="9"
            />
            <div class="relative pt-4">
              <Button
                class="uppercase font-bold"
                type="button"
                @onClick="onCloseSelector()"
              >
                Select
              </Button>
            </div>
          </styled-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";
import Input from "@/components/core-ui/field/Input";
import InputNumber from "@/components/core-ui/field/InputNumber";
import Button from "@/components/core-ui/button/Button";

const StyledDropdown = styled.div`
  background-color: #f4f5f6;
  border-bottom: 2px solid #dadada;
  border-left: 2px solid #dadada;
  border-right: 2px solid #dadada;
  padding: 0 15px 15px;
  position: relative;
  user-select: none;
  width: 100%;
`;
export default {
  name: "GuestInput",
  components: {
    Input,
    InputNumber,
    Button,
    "styled-dropdown": StyledDropdown
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
    valueInput() {
      const dataValue = this.dataValue;
      const adults = dataValue.adults === 1 ? "Adult" : "Adults";
      const children = dataValue.children === 1 ? "Child" : "Children";
      const infants = dataValue.infants === 1 ? "Infant" : "Infants";

      const adultsAmount =
        dataValue.adults > 0
          ? String(this.dataValue.adults) + " " + adults
          : "";
      const childrenAmount =
        dataValue.children > 0
          ? ", " + String(this.dataValue.children) + " " + children
          : "";
      const infantsAmount =
        dataValue.infants > 0
          ? ", " + String(this.dataValue.infants) + " " + infants
          : "";

      return adultsAmount + childrenAmount + infantsAmount;
    },
    iconCode() {
      if (this.isOpenSelector) {
        return "chevron-up";
      }
      return "chevron-down";
    }
  },
  methods: {
    toggleInput() {
      this.isOpenSelector = !this.isOpenSelector;
    },
    onOpenSelector() {
      this.isOpenSelector = true;
    },
    onCloseSelector() {
      this.isOpenSelector = false;
    }
  }
};
</script>
