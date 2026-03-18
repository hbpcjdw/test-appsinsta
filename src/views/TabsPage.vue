<template>
  <ion-page>
    <ion-tabs @ionTabsDidChange="setCurrentTab($event)">
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom" class="insta-tab-bar">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="activeTab === 'home' ? home : homeOutline" />
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="activeTab === 'search' ? search : searchOutline" />
        </ion-tab-button>

        <ion-tab-button tab="add" href="/tabs/add">
          <ion-icon :icon="addCircleOutline" class="add-icon" />
        </ion-tab-button>

        <ion-tab-button tab="activity" href="/tabs/activity">
          <ion-icon :icon="activeTab === 'activity' ? heart : heartOutline" />
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="activeTab === 'profile' ? personCircle : personCircleOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet 
} from '@ionic/vue';
import { 
  homeOutline, home, 
  searchOutline, search, 
  addCircleOutline, 
  heartOutline, heart, 
  personCircleOutline, personCircle 
} from 'ionicons/icons';

const activeTab = ref('home');

const setCurrentTab = (event: any) => {
  activeTab.value = event.tab;
};
</script>

<style scoped>
/* CSS agar TabBar mirip Instagram */
.insta-tab-bar {
  --background: #ffffff;
  --border-top: 0.5px solid #dbdbdb;
  height: 55px;
  contain: none;
}

ion-tab-button {
  --color: #262626;
  --color-selected: #262626;
  transition: transform 0.1s ease;
}

/* Efek sedikit membesar saat ditekan */
ion-tab-button:active {
  transform: scale(0.9);
}

ion-icon {
  font-size: 26px; /* Ukuran icon standar IG */
}

.add-icon {
  font-size: 30px; /* Tombol tambah biasanya sedikit lebih besar */
}

/* Menghilangkan ripple effect bawaan Android agar lebih terasa iOS/Clean */
ion-tab-button::part(native) {
  overflow: visible;
}
</style>