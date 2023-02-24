<template>
  <div>
    <AuthHeader />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const router = useRouter();

watch(user, (user) => {
  if (user) router.push("/dashboard");
});
</script>
