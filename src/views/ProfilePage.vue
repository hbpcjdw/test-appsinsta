<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="profile-title">herlambang_dev</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="addCircleOutline" />
          </ion-button>
          <ion-button>
            <ion-icon :icon="menuOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <section class="profile-header">
        <img
          class="avatar"
          :src="avatarSrc"
          :alt="profile.name"
          @error="onAvatarError"
        />

        <div class="stats-row">
          <div class="stat-item">
            <strong>{{ profilePosts.length }}</strong>
            <span>posts</span>
          </div>
          <div class="stat-item">
            <strong>{{ profile.followers }}</strong>
            <span>followers</span>
          </div>
          <div class="stat-item">
            <strong>{{ profile.following }}</strong>
            <span>following</span>
          </div>
        </div>
      </section>

      <section class="profile-meta">
        <h2>{{ profile.name }}</h2>
        <p class="bio">{{ profile.bio }}</p>
        <p class="link">{{ profile.link }}</p>
      </section>

      <section class="profile-actions">
        <ion-button expand="block" fill="outline" class="action-button">
          Edit profile
        </ion-button>
        <ion-button expand="block" fill="outline" class="action-button secondary-button">
          Share profile
        </ion-button>
        <ion-button
          expand="block"
          fill="outline"
          class="action-button logout-button"
          @click="handleLogout"
        >
          Logout
        </ion-button>
      </section>

      <section class="highlights">
        <div v-for="highlight in highlights" :key="highlight.id" class="highlight-item">
          <div class="highlight-ring">
            <img :src="highlight.image" :alt="highlight.label" />
          </div>
          <span>{{ highlight.label }}</span>
        </div>
      </section>

      <div class="content-tabs">
        <div class="content-tab active">
          <ion-icon :icon="gridOutline" />
        </div>
        <div class="content-tab">
          <ion-icon :icon="personOutline" />
        </div>
      </div>

      <section class="posts-grid">
        <div v-for="post in profilePosts" :key="post.id" class="post-tile">
          <img
            :src="getPostImageSrc(post.id, post.postImage)"
            :alt="post.caption"
            @error="onPostImageError"
          />
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  alertController,
} from '@ionic/vue';
import { addCircleOutline, gridOutline, menuOutline, personOutline } from 'ionicons/icons';
import { DUMMY_DATA } from '@/services/data';
import { logout } from '@/services/auth';

const router = useRouter();

const profile = {
  username: 'herlambang_dev',
  name: 'Herlambang Developer',
  image: '',
  bio: 'Mobile developer. Ionic Vue enthusiast. Building UI that feels fast and clean.',
  link: 'herlambang.dev',
  followers: '12.4K',
  following: 312,
};

const randomDummyAvatar = ref(
  `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`
);

const avatarSrc = computed(() => profile.image?.trim() || randomDummyAvatar.value);

const onAvatarError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  image.src = randomDummyAvatar.value;
};

const getRandomPostImage = (seed: number | string) =>
  `https://picsum.photos/seed/${seed}/600/600`;

const getPostImageSrc = (postId: number, postImage: string) =>
  postImage?.trim() || getRandomPostImage(`post-${postId}`);

const onPostImageError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  if (image.dataset.fallbackApplied === 'true') {
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = getRandomPostImage(`fallback-${Date.now()}`);
};

const highlights = [
  { id: 1, label: 'Work', image: 'https://picsum.photos/seed/work/120/120' },
  { id: 2, label: 'Setup', image: 'https://picsum.photos/seed/setup/120/120' },
  { id: 3, label: 'Travel', image: 'https://picsum.photos/seed/travel/120/120' },
  { id: 4, label: 'Coffee', image: 'https://picsum.photos/seed/coffee/120/120' },
];

const profilePosts = computed(() =>
  DUMMY_DATA.posts.value.filter((post) => post.username === profile.username)
);

const handleLogout = async () => {
  const alert = await alertController.create({
    header: 'Logout',
    message: 'Yakin ingin logout?',
    buttons: [
      {
        text: 'Batal',
        role: 'cancel',
      },
      {
        text: 'Logout',
        role: 'destructive',
        handler: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ],
  });

  await alert.present();
};
</script>

<style scoped>
.profile-title {
  font-size: 20px;
  font-weight: 700;
}

.profile-header {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 20px;
  align-items: center;
  padding: 20px 16px 12px;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #262626;
}

.stat-item strong {
  font-size: 18px;
}

.stat-item span {
  font-size: 14px;
}

.profile-meta {
  padding: 0 16px 16px;
  color: #262626;
}

.profile-meta h2 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
}

.bio {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 1.5;
}

.link {
  margin: 0;
  color: #00376b;
  font-size: 14px;
  font-weight: 600;
}

.profile-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 16px 18px;
}

.action-button {
  --border-color: #dbdbdb;
  --border-radius: 8px;
  --color: #262626;
  font-weight: 600;
  min-height: 36px;
}

.logout-button {
  grid-column: 1 / -1;
  --color: #d93025;
}

.secondary-button {
  --background: #ffffff;
}

.highlights {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 0 16px 16px;
  scrollbar-width: none;
}

.highlights::-webkit-scrollbar {
  display: none;
}

.highlight-item {
  min-width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #262626;
  font-size: 12px;
}

.highlight-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  padding: 3px;
  border: 1px solid #dbdbdb;
}

.highlight-ring img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.content-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #efefef;
}

.content-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  color: #8e8e8e;
}

.content-tab.active {
  color: #262626;
  border-top: 1px solid #262626;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #ffffff;
}

.post-tile {
  aspect-ratio: 1 / 1;
  background: #f4f4f4;
}

.post-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
