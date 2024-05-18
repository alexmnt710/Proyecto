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
  top: 0;
  left: 0;
  width: 100%;
  height: 115%;
  background-image: url('./images/LOGO-ULEAM.png'); /* Ruta a tu imagen */
  background-size: contain; /* Ajusta el tamaño de la imagen */
  background-position: center;
  opacity: 0.1; /* Ajusta la opacidad según tus necesidades */
  z-index: -1; /* Coloca la imagen detrás del contenido */
  pointer-events: none; /* Permite interactuar con los elementos de contenido */
}
</style>