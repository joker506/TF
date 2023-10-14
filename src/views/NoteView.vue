<script setup>
import { ref } from "vue";
import BtnBase from "../components/BtnBase.vue";
import ModalBase from "../components/ModalBase.vue";
import { useUserStore } from "../store/notes.js";
import { useRouter } from "vue-router";
const router = useRouter();

let arr = ref([]);

let isModalOpen = ref(false);
const store = useUserStore();
const props = defineProps({
  id: {
    type: String,
  },
});
const { findItemNote, changeItemsNote } = store;

arr = findItemNote(props.id);

const optSelect = ["default", "image", "checkbox"];
let selectOpt = ref("");
let selectTitle = ref("");
let selectOverview = ref("");
let selectImage = ref("");

selectOverview.value = arr.overview;
selectTitle.value = arr.title;
selectOpt.value = arr.typeNote;
selectImage.value = arr.image;

const handleFileChange = (e) => {
  selectImage.value = e.target.files[0];
  arr.image = selectImage.value;
};

const addSubArr = () => {
  if (!!arr.subArr) {
    arr.subArr.push({
      id: arr.subArr.length + 1,
      heading: "Heading",
      value: true,
    });
  } else {
    arr.subArr = [
      {
        id: 1,
        heading: "Heading",
        value: true,
      },
    ];
  }
};

const changeBtn = () => {
  let params = {
    typeNote: selectOpt.value,
    title: selectTitle.value,
    overview: selectOverview.value,
  };
  if (selectOpt.value === "image") {
    params = {
      ...params,
      image: selectImage.value,
    };
  }
  if (selectOpt.value === "checkbox") {
    params = {
      ...params,
      subArr: arr.subArr,
    };
  }
  changeItemsNote({ id: arr.id }, params);
  router.push("/");
};
</script>

<template>
  <div class="my__card">
    <ul>
      <li class="card__title">Title: {{ arr.title }}</li>
      <li class="card__text">Overview: {{ arr.overview }}</li>
      <li class="card__text">Type: {{ arr.typeNote }}</li>
    </ul>
    <div v-if="arr.typeNote === 'checkbox'">
      <ul>
        <li v-for="(i, idx) in arr.subArr">
          <input disabled type="checkbox" name="" :id="idx" v-model="i.value" />
          <span class="card__text"> {{ i.heading }}</span>
        </li>
      </ul>
    </div>
    <div>
      <div class="image__content" v-if="arr.typeNote === 'image' && !!arr.image">
        <img width="100" :src="arr.image" alt="Image description" class="card__image" />
      </div>
    </div>
  </div>

  <ModalBase
    :isOpen="isModalOpen"
    @closeModal="isModalOpen = false"
    @changeBtn="changeBtn"
    :param="id"
    @update:title="title = $event"
  >
    <div>
      <span>Type:</span>
      <select v-model="selectOpt">
        <option :value="item" v-for="(item, index) in optSelect" :key="index">
          <span> {{ item }}</span>
        </option>
      </select>
    </div>
    <div>
      <span>Title: <input type="text" v-model="selectTitle" /></span>
    </div>
    <div>
      <span>Overview: <input type="text" v-model="selectOverview" /></span>
    </div>

    <div v-if="selectOpt === 'checkbox'">
      <ul>
        <li v-for="(i, idx) in arr.subArr">
          <input type="checkbox" name="" id="" v-model="i.value" />
          <span> {{ i.heading }} {{ i }}</span>
        </li>
      </ul>
      <BtnBase typeBtn="btn" titleBtn="add ..." @clickBtn="addSubArr" />
    </div>

    <div v-if="selectOpt === 'image'">
      add file
      <input type="file" name="" id="" @change="handleFileChange" />
    </div>
  </ModalBase>

  <div>
    <BtnBase typeBtn="btn" titleBtn="correct" @clickBtn="isModalOpen = true" />
  </div>
</template>
