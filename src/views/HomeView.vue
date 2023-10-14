<script setup>
import { storeToRefs } from "pinia";
import BtnBase from "../components/BtnBase.vue";
import NoteItem from "../components/NoteItem.vue";
import { useUserStore } from "../store/notes.js";
const store = useUserStore();
const { itemsNoteStore } = storeToRefs(store);
const { addItemsNote } = store;
</script>

<template>
  <div>
    <BtnBase typeBtn="btn" titleBtn="Добавить" @clickBtn="addItemsNote" />
    <div>
      <div v-for="i in itemsNoteStore" :key="i.id">
        <NoteItem
          :title="i.title"
          :overview="i.overview"
          :typeNote="i.typeNote"
          :image="i.image"
          :idx="i.id"
        />
      </div>
    </div>
  </div>
</template>
