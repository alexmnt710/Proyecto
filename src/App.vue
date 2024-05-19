<script setup>
import { RouterLink,RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();
onMounted(() => {
    router.push('/');
});
</script>
<template>
    <div class="watermark">
        <RouterView />
    </div>


</template>

<style scoped>
.watermark {
  position: relative;
}

.watermark::before {
  content: '';
  position: absolute;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  background-image: url('./images/LOGO-ULEAM.png'); /* Ruta a tu imagen */
  background-size: 60%;
  background-position: center;
  opacity: 0.1; /* Ajusta la opacidad según tus necesidades */
  z-index: -1; /* Coloca la imagen detrás del contenido */
  pointer-events: none; /* Permite interactuar con los elementos de contenido */
  background-repeat: no-repeat;
}
</style>