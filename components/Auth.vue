<template>
  <div class="center login-container">
    <div class="py-12 px-32 border-2 rounded-xl">
      <form class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="space-y-6 col-6 text-center w-full">
          <h1 class="header text-4xl text-purple">Welcome Back!</h1>
          <p class="description text-xl text-purple">Sign in with magic link</p>
          <div>
            <input
              class="inputField !py-2 !px-4 border-2 rounded-xl"
              type="email"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div>
            <input
              type="submit"
              class="primary-button my-4 !py-2 !px-4 !text-xl"
              :value="loading ? 'Loading' : 'Login via email'"
              :disabled="loading"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container{
  background-image: url("../assets/images/Login.png");
  background-size: cover;
  background-position: center;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: window.location.href.includes("localhost")
          ? "http://localhost:3000/dashboard"
          : "https://css-habits.vercel.app/dashboard",
      },
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error: any) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
