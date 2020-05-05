<template>
  <div class="information-modal">
    <div class="information-modal__outer">
      <div class="information-modal__heading">
        <slot name="heading"></slot>
      </div>
      <div class="information-modal__description">
        <slot name="description"></slot>
      </div>
      <div class="information-modal__action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationModal"
};
</script>

<style lang="scss" scoped>
.information-modal {
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
  }
  &__heading {
    text-align: center;
    font-weight: 500;
  }
  &__description {
    text-align: center;
    padding-top: 10px;
    a {
      color: #015ba5;
      text-decoration: underline;
    }
  }
  &__action {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }
}
</style>
