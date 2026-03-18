<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="activity-title">Activity</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <section v-for="section in activitySections" :key="section.title" class="activity-section">
        <div class="section-header">
          <h2>{{ section.title }}</h2>
        </div>

        <div class="activity-list">
          <article v-for="item in section.items" :key="item.id" class="activity-card">
            <img class="activity-avatar" :src="item.avatar" :alt="item.username" />

            <div class="activity-copy">
              <p>
                <strong>{{ item.username }}</strong>
                {{ item.message }}
                <span class="activity-time">{{ item.time }}</span>
              </p>
            </div>

            <ion-button
              v-if="item.action === 'follow'"
              size="small"
              :fill="item.following ? 'outline' : 'solid'"
              class="activity-action-button"
            >
              {{ item.following ? 'Following' : 'Follow' }}
            </ion-button>

            <img
              v-else
              class="activity-preview"
              :src="item.preview"
              :alt="item.username"
            />
          </article>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

const activitySections = [
  {
    title: 'Hari ini',
    items: [
      {
        id: 1,
        username: 'lalat_terbang',
        avatar: 'https://i.pravatar.cc/150?u=3',
        message: 'menyukai foto Anda.',
        time: '2j',
        action: 'preview',
        preview: 'https://picsum.photos/id/30/120/120',
      },
      {
        id: 2,
        username: 'dev_vue',
        avatar: 'https://i.pravatar.cc/150?u=4',
        message: 'mulai mengikuti Anda.',
        time: '5j',
        action: 'follow',
        following: false,
      },
    ],
  },
  {
    title: 'Minggu ini',
    items: [
      {
        id: 3,
        username: 'mobile_builder',
        avatar: 'https://i.pravatar.cc/150?u=mobile_builder',
        message: 'mengomentari: Keren banget setup-nya.',
        time: '3h',
        action: 'preview',
        preview: 'https://picsum.photos/id/20/120/120',
      },
      {
        id: 4,
        username: 'coffee_pixels',
        avatar: 'https://i.pravatar.cc/150?u=coffee_pixels',
        message: 'mulai mengikuti Anda.',
        time: '4h',
        action: 'follow',
        following: true,
      },
      {
        id: 5,
        username: 'visual_journal',
        avatar: 'https://i.pravatar.cc/150?u=visual_journal',
        message: 'menyebut Anda dalam komentar.',
        time: '6h',
        action: 'preview',
        preview: 'https://picsum.photos/id/42/120/120',
      },
    ],
  },
  {
    title: 'Bulan ini',
    items: [
      {
        id: 6,
        username: 'design_motion',
        avatar: 'https://i.pravatar.cc/150?u=design_motion',
        message: 'menyukai reels Anda.',
        time: '2m',
        action: 'preview',
        preview: 'https://picsum.photos/id/1062/120/120',
      },
      {
        id: 7,
        username: 'herlambang',
        avatar: 'https://i.pravatar.cc/150?u=2',
        message: 'mulai mengikuti Anda.',
        time: '3m',
        action: 'follow',
        following: false,
      },
    ],
  },
];
</script>

<style scoped>
.activity-title {
  font-size: 22px;
  font-weight: 700;
}

.activity-section {
  padding: 18px 16px 4px;
}

.section-header {
  margin-bottom: 12px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.activity-card {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  align-items: center;
  gap: 12px;
}

.activity-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.activity-copy p {
  margin: 0;
  color: #111111;
  font-size: 14px;
  line-height: 1.4;
}

.activity-copy strong {
  font-weight: 700;
}

.activity-time {
  color: #8e8e93;
}

.activity-preview {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
}

.activity-action-button {
  --background: #0095f6;
  --background-activated: #0081d6;
  --border-color: #dbdbdb;
  --border-radius: 8px;
  --color: #ffffff;
  font-weight: 600;
  min-width: 92px;
}

.activity-action-button[fill='outline'] {
  --background: #ffffff;
  --color: #111111;
}
</style>
