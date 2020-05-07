<template>
  <div class="confirmation-modal">
    <div class="confirmation-modal__outer">
      <div class="confirmation-modal__warning">
        <slot name="warning"></slot>
      </div>
      <div class="confirmation-modal__description">
        <slot name="description"></slot>
      </div>
      <div class="confirmation-modal__action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal"
};
</script>

<style lang="scss" scoped>
.confirmation-modal {
  color: #000;
  width: calc(100% - 40px);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -70%);
  &__outer {
    padding: 20px 25px;
    font-size: 14px;
    font-weight: 500;
  }
  &__warning {
    text-align: center;
  }
  &__description {
    padding-top: 10px;
  }
  &__action {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    padding-top: 10px;
  }
}
</style>
