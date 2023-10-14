<script setup>
import { toRefs } from "vue";
import BtnBase from "../components/BtnBase.vue";

const props = defineProps({
  isOpen: Boolean,
  param: { type: String },
});

const emit = defineEmits(["closeModal", "changeBtn"]);

const { isOpen, param } = toRefs(props);

const changeNote = (e) => {
  emit("changeBtn", false);
  emit("closeModal", false);
};
</script>
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal__content">
      <span class="close" @click="$emit('closeModal', false)">&times;</span>

      <slot></slot>
      <div class="modal__actions">
        <BtnBase typeBtn="btn" titleBtn="Save" @clickBtn="changeNote" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  &__actions {
    margin: 10px;
  }
  &__content {
    background-color: grey;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
