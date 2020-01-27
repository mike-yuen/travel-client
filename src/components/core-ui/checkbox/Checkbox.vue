<template>
  <styled-container>
    <input id="randomId1" type="checkbox" class="absolute" role="checkbox" />
    <label for="randomId1" class="relative text-sm">
      <div class="inline-block absolute mr-2" role="presentation">
        <div class="checkbox-icon__box">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <title>Checkbox</title>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(-1286.000000, -1544.000000)"
                stroke-width="4"
                stroke="#dadada"
                fill="#FFFFFF"
              >
                <g transform="translate(485.000000, 1478.000000)">
                  <rect x="801" y="66" width="24" height="24"></rect>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="absolute top-0 left-0">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 48 48"
            version="1.1"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <title>selected</title>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(-1297.000000, -1557.000000)"
                fill="#4A4A4A"
              >
                <g transform="translate(497.000000, 1490.000000)">
                  <path
                    d="M823.010797,78.5423199 L823.010797,98.365835 L819.170797,98.365835 L819.170797,74.365835 L823.010797,74.365835 L823.010797,74.7023199 L830.10527,74.7023199 L830.10527,78.5423199 L823.010797,78.5423199 Z"
                    transform="translate(824.638034, 86.365835) rotate(-135.000000) translate(-824.638034, -86.365835) "
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <span class="inline-block text-sm pl-8 mt-1">Remember details</span>
    </label>
  </styled-container>
</template>

<script>
import styled from "vue-styled-components";
const StyledContainer = styled.div`
  min-height: 48px;
  padding: 11px 15px 11px 0;
`;

export default {
  name: "Checkbox",
  components: {
    "styled-container": StyledContainer
  }
};
</script>
