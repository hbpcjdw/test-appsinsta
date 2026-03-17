<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>Daftar Mahasiswa</ion-title>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-searchbar 
          placeholder="Cari nama mahasiswa..." 
          v-model="searchQuery"
          :debounce="300">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
ion-avatar {
  --border-radius: 8px;
}
</style>