<script setup>
import { ref } from "vue";
import BtnBase from "../components/BtnBase.vue";
import ModalBase from "../components/ModalBase.vue";

import { useUserStore } from "../store/notes.js";

let openModal = ref(false);

const store = useUserStore();
const { removeItemsNote } = store;

const changeBtn = (id) => {
  removeItemsNote(id);
};

const props = defineProps({
  title: {
    type: String,
  },
  overview: {
    type: String,
  },
  typeNote: {
    type: String,
  },
  image: {
    type: String,
  },
  idx: {
    type: Number,
  },
});
</script>
<template>
  <div class="my__card">
    <router-link
      :to="{
        path: `/note/${idx}`,
      }"
    >
      <div class="my__card-wrap">
        <div class="my__card-block">
          <h2 class="card__title">{{ title }}</h2>
          <p class="card__text">{{ overview }}</p>
        </div>
        <div class="image__content" v-if="typeNote === 'image'">
          <img width="100" :src="image" class="card__image" />
        </div>
      </div>
    </router-link>

    <div class="card__actions">
      <BtnBase
        titleBtn="Удалить"
        @clickBtn="openModal = true"
        :id="idx"
        :typeNote="typeNote"
        typeBtn="btn"
      />
    </div>
  </div>
  <ModalBase
    :isOpen="openModal"
    @closeModal="openModal = false"
    @changeBtn="changeBtn(idx)"
  >
    <div>Remove Note?</div>
  </ModalBase>
</template>

<style lang="scss">
.my__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  &-wrap {
    display: flex;
  }
  &-block {
    width: 300px;
  }
  .card__title,
  .card__text {
    color: #3f51b5;
    margin-bottom: 16px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .card__text {
    color: #757575;
  }

  .card__actions {
    justify-content: flex-start;
    display: flex;
  }
}
</style>
