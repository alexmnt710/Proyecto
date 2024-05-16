<script setup>
import { RouterLink,RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();
onMounted(() => {
    router.push('/');
});
</script>
<template>
<RouterView />
</template>

<style scoped>

</style>
