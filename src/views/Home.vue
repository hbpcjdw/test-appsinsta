<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="insta-logo">{{ homeTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-button><ion-icon :icon="addCircleOutline"></ion-icon></ion-button>
          <ion-button><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <story-bar :stories="stories"></story-bar>

      <div v-if="isLoading">
        <ion-skeleton-text v-for="i in 2" :key="i" :animated="true" style="height: 300px; margin: 20px;"></ion-skeleton-text>
      </div>

      <div v-else>
        <post-card v-for="post in posts" :key="post.id" :post="post"></post-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSkeletonText } from '@ionic/vue';
import { addCircleOutline, paperPlaneOutline } from 'ionicons/icons';
import StoryBar from '@/components/StoryBar.vue';
import PostCard from '@/components/PostCard.vue';
import { posts, DUMMY_DATA } from '@/services/data';
import { getCurrentUser, mappedUser } from '@/services/auth';

defineOptions({ name: 'HomePage' });

const stories = ref([...DUMMY_DATA.stories]);
const isLoading = ref(true);
const homeTitle = computed(() => mappedUser.value?.username || 'InstaApp');

onMounted(() => {
  setTimeout(async () => {
    const currentUser = await getCurrentUser();

    if (currentUser && stories.value.length > 0) {
      stories.value[0] = {
        ...stories.value[0],
        name: currentUser.username,
      };
    }

    isLoading.value = false;
  }, 1500); // Fake loading 1.5 detik
});
</script>

<style scoped>
.insta-logo { font-family: 'Billabong', cursive; font-size: 28px; }
</style>