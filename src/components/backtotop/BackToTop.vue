<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="back-to-top"
    title="Lên đầu trang"
  >
    ▲
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #00abb8;
  color: #fff;
  border: none;
  border-radius: 7px;
  width: 45px;
  height: 45px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top:hover {
  background-color: #0897a1;
}
</style>
