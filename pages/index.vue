<template>
  <div class ="background">
    <div class="md:w-[350px] mx-5">
      <h1 class="text-6xl text-black/90 font-extralight">Create new Habits</h1>
    </div>
    <div class="mx-5 my-2">
      <h2 class="text-purple- text-xl">Start tracking your habits now</h2>
    </div>
    </div>
    <div class="absolute inset-x-0 bottom-0">
      <img src="../assets/images/Vector.svg" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

<style scoped>
.background{
  background-image: url("../assets/images/Background.svg");
  background-repeat: no-repeat;
  height: 320px;
}


</style>
