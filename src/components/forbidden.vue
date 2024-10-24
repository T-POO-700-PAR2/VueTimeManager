<template>
  <div>
    <h1>Accès Interdit</h1>
    <p>Vous n'avez pas la permission d'accéder à cette page.</p>
    <!-- eslint-disable-next-line--> 
    <router-link to="/">Retourner à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'ForbiddenPage',
};
</script>

<style >
</style>