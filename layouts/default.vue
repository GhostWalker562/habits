<template>
  <div>
    <div v-if="!user">
      <AuthHeader />
      <Auth />
    </div>
    <div v-else>
      <LayoutSidebar>
        <slot />
      </LayoutSidebar>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>

<style scoped></style>
