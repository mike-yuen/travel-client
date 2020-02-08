<template>
  <div>
    <div class="widget-form__group">
      <label class="widget-form__label" for="datepicker-input-checkinDate"
        >Check-in date</label
      ><input
        type="text"
        class="qfa1-input date-picker__input"
        id="datepicker-input-checkinDate"
        autocomplete="off"
        aria-required="false"
        aria-haspopup="false"
        aria-expanded="false"
        aria-invalid="false"
        aria-label="Check-in date, Current date selected is Saturday, the first of February 2020. Select a check-in date from the calendar by using up and down arrow keys to navigate consecutive weeks. Use left and right keys to navigate consecutive days. Use the n key to navigate to the next month. Use the p key to navigate to the previous month. You can only select a check-in date up to 365 days from today inclusive. Text field is disabled"
        value="Sat 1 Feb 2020"
      />
      <div class="date-picker__calendar-icon" tabindex="-1"></div>
      <span
        class="widget-form__element--aria-hidden"
        role="live"
        aria-atomic="true"
        aria-relevant="text"
        aria-label=""
        aria-live="polite"
      ></span>
      <div
        class="date-picker__triangle-container-father widget-form__element--hidden"
      >
        <div class="date-picker__triangle-container">
          <div>
            <span
              class="qfa1-border-triangle__outer"
              style="border-bottom-color: rgb(218, 218, 218); left: 50%; border-bottom-width: 11px; border-right-width: 11px; border-left-width: 11px; margin-left: -11px; z-index: 300;"
            ></span
            ><span
              class="qfa1-border-triangle__inner"
              style="border-bottom-color: rgb(244, 245, 246); left: 50%; border-bottom-width: 9px; border-right-width: 9px; border-left-width: 9px; margin-left: -9px; z-index: 301;"
            >
            </span>
          </div>
        </div>
      </div>
      <div class="form-validation-message widget-form__element--hidden">
        <div class="form-validation-message__container">
          <div>
            <span
              class="qfa1-border-triangle__outer"
              style="border-bottom-color: rgb(252, 235, 205); left: 20px; border-bottom-width: 10px; border-right-width: 10px; border-left-width: 10px; margin-left: -10px; z-index: 0;"
            ></span
            ><span
              class="qfa1-border-triangle__inner"
              style="border-bottom-color: rgb(252, 235, 205); left: 20px; border-bottom-width: 10px; border-right-width: 10px; border-left-width: 10px; margin-left: -10px; z-index: 1;"
            ></span>
          </div>
          <div class="form-validation-message__text"></div>
        </div>
      </div>
    </div>
    <!-- react-empty: 3048 -->
  </div>
</template>
