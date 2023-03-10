<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(true);
const username = ref("null");
const email = ref<string | undefined>("");

const user = useSupabaseUser();

async function fetchProfile() {
  loading.value = true;
  if (user.value == null) return "User does not exist";
  const { data, error } = await supabase
    .from("profiles")
    .select(`username`)
    .eq("id", user.value.id)
    .single();

  if (error) {
    alert(error.message);
  } else {
    username.value = data?.username || "";
    email.value = user.value.email;
  }

  loading.value = false;
}

fetchProfile();

async function updateProfile() {
  try {
    loading.value = true;
    if (user.value == null) return "Not existent user";

    const updates: any = [
      {
        id: user.value.id,
        username: username.value,
        updated_at: new Date(),
      },
    ];

    let { error } = await supabase.from("profiles").upsert(updates, {});

    if (error) {
      throw error;
    } else {
      alert("Profile updated successfully");
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    } else {
      user.value = null;
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <LayoutRoundedPage>
    <div class="h-full">
      <form class="form-widget space-y-8" @submit.prevent="updateProfile">
        <InputLabeled
          v-model="email"
          label="Email"
          placeholder="Email"
          disabled
        />
        <InputLabeled
          v-model="username"
          label="Username"
          placeholder="Username"
        />

        <input
          class="primary-button !px-12 !py-3"
          type="submit"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />

        <div>
          <button class="button block" @click="signOut" :disabled="loading">
            Sign Out
          </button>
        </div>
      </form>
    </div>
  </LayoutRoundedPage>
</template>
