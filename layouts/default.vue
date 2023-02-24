<template>
  <div>
    <template v-if="!user">
      <AuthHeader />
      <Auth />
    </template>
    <div v-else>
      <LayoutSidebar>
        <slot />
      </LayoutSidebar>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseClient();
</script>

<style scoped></style>
