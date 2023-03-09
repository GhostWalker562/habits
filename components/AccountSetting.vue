<script setup lang="ts">
const supabase = useSupabaseClient()
const loading = ref(true)
const username = ref('null')

const user = useSupabaseUser()

async function fetchProfile() {
  loading.value = true
  if (user.value == null) return ("User does not exist")
  const { data, error } = await supabase
    .from('profiles')
    .select(`username`)
    .eq('id', user.value.id)
    .single()

  if (error) {
    alert(error.message)
  } else {
    username.value = data?.username || ''
  }

  loading.value = false
}

fetchProfile()


async function updateProfile() {
  try {
    loading.value = true
    if (user.value == null) return ("Not existent user")

    const updates: any = [{
      id: user.value.id,
      username: username.value,
      updated_at: new Date(),
    }];

    let { error } = await supabase.from('profiles').upsert(updates, {
    })

    if (error) {
      throw error
    } else {
      alert('Profile updated successfully')
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    } else {
      user.value = null
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user ? user.email : ''" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>
