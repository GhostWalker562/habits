<template>
  <div class="background">
    <div class="md:w-[350px] mx-10 my-4">
      <h1 class="text-6xl text-black/90 font-extralight" v-motion-slide-top>
        Create new Habits
      </h1>
    </div>
    <div class="mx-10">
      <h2 class="text-purple- text-xl" v-motion-slide-top>
        Start tracking your habits now
      </h2>
    </div>
  </div>
  <div class="absolute inset-x-0 bottom-0" v-motion-slide-left>
    <img src="../assets/images/Vector.svg" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

<style scoped>
.background {
  background-image: url("../assets/images/Background.svg");
  background-repeat: no-repeat;
  height: 320px;
}
</style>
