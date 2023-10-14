import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("notes", () => {
  let itemsNoteStore = reactive([
    {
      id: 0,
      title: "typeNote-default",
      overview: "sadsadasdsads",
      typeNote: "default",
    },
    {
      id: 1,
      title: "typeNote-image",
      overview: "sadsadasdsads",
      image:
        "https://kartinki.pics/uploads/posts/2022-03/1647525478_1-kartinkin-net-p-kartinki-barta-simpsona-1.png",
      typeNote: "image",
    },
    {
      id: 2,
      title: "typeNote-checkbox",
      overview: "sadsadasdsads",
      typeNote: "checkbox",
      subArr: [
        { id: 0, heading: "Heading", value: true },
        { id: 1, heading: "Heading", value: false },
        { id: 2, heading: "Heading", value: true },
      ],
    },
  ]);
  const findItemNote = (id) => itemsNoteStore.find((item) => item.id == id);

  const addItemsNote = () => {
    const newItem = {
      id: itemsNoteStore.length,
      typeNote: "default",
      title: "New Note",
      overview: "Some overview",
    };
    itemsNoteStore.push(newItem);
  };
  const changeItemsNote = ({ id }, params) => {
    itemsNoteStore.forEach((obj, index) => {
      if (obj.id === id) {
        if (params.typeNote === "checkbox") {
          itemsNoteStore[index] = {
            ...params,
            id,
            subArr: !!params.subArr
              ? params.subArr
              : [{ id: 0, heading: "Your heading" }],
          };
        } else if (params.typeNote === "image") {
          itemsNoteStore[index] = {
            ...params,
            id,
            image: params.image,
          };
        } else {
          itemsNoteStore[index] = {
            ...params,
            id,
          };
        }
      }
    });
  };

  const removeItemsNote = (event) => {
    itemsNoteStore.forEach((item, index) => {
      if (item.id === event) {
        itemsNoteStore.splice(index, 1);
      }
    });
  };

  return {
    changeItemsNote,
    findItemNote,
    removeItemsNote,
    itemsNoteStore,
    addItemsNote,
  };
});
