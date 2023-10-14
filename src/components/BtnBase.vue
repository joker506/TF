<script setup>
import { toRefs } from "vue";

const props = defineProps({
  typeBtn: {
    type: String,
    default: "btn",
    required: true,
  },
  titleBtn: {
    type: String,
  },
  id: {
    type: Number,
  },
});
const { id } = toRefs(props);
</script>
<template>
  <div>
    <button @click="$emit('clickBtn', id)" class="btn-primary">
      {{ titleBtn }} {{ id }}
    </button>
  </div>
</template>
<style lang="scss" scoped>
.btn-primary {
  color: #fff;
  background-color: #3f51b5;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
