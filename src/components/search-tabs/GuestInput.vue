<template>
  <div>
    <div class="widget-form__group">
      <label class="widget-form__label" for="guestSelector">Guests</label
      ><input
        type="text"
        class="qfa1-input qfa1-people-selector__input"
        value="2 Adults"
        id="guestSelector"
        autocomplete="off"
        aria-required="false"
        aria-haspopup="false"
        aria-expanded="false"
        aria-invalid="false"
        aria-label="Guests, Select the number of guests. You can navigate to the adults, children and infants fields by using the tab and shift tab keys when the guest selector is expanded. The guest selector can be expanded or collapsed by using the space key. Text field is disabled"
      />
      <div
        class="qfa1-arrow-icon__dropdown qfa1-arrow-icon"
        tabindex="-1"
        role="button"
      ></div>
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
    <span
      class="widget-form__element--aria-hidden"
      role="status"
      aria-live="polite"
    ></span>
    <div
      class="qfa1-dropdown-list__items-container-father widget-form__element--hidden"
    >
      <div class="qfa1-dropdown-list__items-container">
        <div class="widget-form__group">
          <div class="qfa1-dropdown">
            <div class="qfa1-numberpicker__group widget-form__group">
              <label
                class="widget-form__label"
                for="number-picker-input-16wai50gn6z"
                >Adults</label
              ><!-- react-empty: 190 --><input
                type="number"
                class="qfa1-input qfa1-numberpicker__input"
                value="2"
                aria-label="Adults (thirteen years old and above). Select the number of adults between one to nine. Press up and down arrow keys to increase and decrease the number of adults selected"
                id="number-picker-input-16wai50gn6z"
                aria-valuemin="1"
                aria-valuemax="9"
                aria-valuenow="2"
                role="spinbutton"
              />
              <div class="qfa1-numberpicker__minus-icon" tabindex="-1"></div>
              <div class="qfa1-numberpicker__plus-icon" tabindex="-1"></div>
              <span
                class="widget-form__element--aria-hidden"
                role="status"
                aria-live="polite"
              ></span>
            </div>
            <div class="qfa1-numberpicker__group widget-form__group">
              <label
                class="widget-form__label"
                for="number-picker-input-14gpd6fa4qqi"
                >Children (3 - 12yrs)</label
              ><!-- react-empty: 211 --><input
                type="number"
                class="qfa1-input qfa1-numberpicker__input"
                value="0"
                aria-label="Children (three to twelve years old inclusive). Select the number of children between zero to nine. Press up and down arrow keys to increase and decrease the number of children selected"
                id="number-picker-input-14gpd6fa4qqi"
                aria-valuemin="0"
                aria-valuemax="9"
                aria-valuenow="0"
                role="spinbutton"
              />
              <div
                class="qfa1-numberpicker__minus-icon qfa1-numberpicker__minus-icon--disabled"
                tabindex="-1"
              ></div>
              <div class="qfa1-numberpicker__plus-icon" tabindex="-1"></div>
              <span
                class="widget-form__element--aria-hidden"
                role="status"
                aria-live="polite"
              ></span>
            </div>
            <div class="qfa1-numberpicker__group widget-form__group">
              <label
                class="widget-form__label"
                for="number-picker-input-fl7o7tj5ee"
                >Infants (0 - 2yrs)</label
              ><!-- react-empty: 232 --><input
                type="number"
                class="qfa1-input qfa1-numberpicker__input"
                value="0"
                aria-label="Infants (zero to two years old inclusive). Select the number of infants between zero to nine. Press up and down arrow keys to increase and decrease the number of infants selected"
                id="number-picker-input-fl7o7tj5ee"
                aria-valuemin="0"
                aria-valuemax="9"
                aria-valuenow="0"
                role="spinbutton"
              />
              <div
                class="qfa1-numberpicker__minus-icon qfa1-numberpicker__minus-icon--disabled"
                tabindex="-1"
              ></div>
              <div class="qfa1-numberpicker__plus-icon" tabindex="-1"></div>
              <span
                class="widget-form__element--aria-hidden"
                role="status"
                aria-live="polite"
              ></span>
            </div>
            <div class="qfa1-people-selector__button">
              <div class="widget-form__group">
                <button
                  class="qfa1-submit-button__button"
                  type="button"
                  aria-label="Select button. Click this button to confirm you have selected 2 Adults"
                >
                  SELECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
