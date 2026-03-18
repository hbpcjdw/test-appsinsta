<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="search-toolbar">
          <ion-searchbar
            v-model="query"
            placeholder="Cari"
            show-clear-button="focus"
            class="searchbar"
          />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <section class="quick-filters">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="filter-pill"
        >
          {{ filter }}
        </button>
      </section>

      <section class="results-section" v-if="query.trim()">
        <div class="section-header">
          <h2>Hasil pencarian</h2>
          <span>{{ filteredAccounts.length }} akun</span>
        </div>

        <div v-if="filteredAccounts.length" class="account-list">
          <button
            v-for="account in filteredAccounts"
            :key="account.id"
            type="button"
            class="account-item"
          >
            <img :src="account.image" :alt="account.name" class="account-avatar" />
            <div class="account-copy">
              <strong>{{ account.username }}</strong>
              <span>{{ account.name }}</span>
            </div>
            <ion-icon :icon="chevronForwardOutline" />
          </button>
        </div>

        <div v-else class="empty-state">
          <ion-icon :icon="searchOutline" />
          <h3>Tidak ada hasil</h3>
          <p>Coba kata kunci lain untuk menemukan akun atau konten.</p>
        </div>
      </section>

      <section class="results-section" v-else>
        <div class="section-header">
          <h2>Recent</h2>
          <span>Lihat semua</span>
        </div>

        <div class="account-list">
          <button
            v-for="account in recentAccounts"
            :key="account.id"
            type="button"
            class="account-item"
          >
            <img :src="account.image" :alt="account.name" class="account-avatar" />
            <div class="account-copy">
              <strong>{{ account.username }}</strong>
              <span>{{ account.name }}</span>
            </div>
            <ion-icon :icon="ellipseOutline" class="status-icon" />
          </button>
        </div>
      </section>

      <section class="explore-section">
        <div class="section-header">
          <h2>Explore</h2>
          <span>Untuk kamu</span>
        </div>

        <div class="explore-grid">
          <div
            v-for="item in explorePosts"
            :key="item.id"
            class="explore-tile"
            :class="{ featured: item.featured }"
          >
            <img :src="item.postImage" :alt="item.caption" />
            <div class="overlay">
              <div class="overlay-metric">
                <ion-icon :icon="heart" />
                <span>{{ item.likes }}</span>
              </div>
              <div class="overlay-metric">
                <ion-icon :icon="chatbubbleOutline" />
                <span>{{ item.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar } from '@ionic/vue';
import { chatbubbleOutline, chevronForwardOutline, ellipseOutline, heart, searchOutline } from 'ionicons/icons';
import { DUMMY_DATA } from '@/services/data';

const query = ref('');

const filters = ['Accounts', 'Audio', 'Tags', 'Places', 'Reels'];

const accounts = [
  { id: 1, username: 'herlambang_dev', name: 'Herlambang Developer', image: 'https://i.pravatar.cc/150?u=herlambang_dev' },
  { id: 2, username: 'lalat_terbang', name: 'Lalat Terbang', image: 'https://i.pravatar.cc/150?u=3' },
  { id: 3, username: 'dev_vue', name: 'Vue Daily', image: 'https://i.pravatar.cc/150?u=4' },
  { id: 4, username: 'herlambang', name: 'Herlambang', image: 'https://i.pravatar.cc/150?u=2' },
];

const recentAccounts = accounts.slice(0, 3);

const filteredAccounts = computed(() => {
  const keyword = query.value.trim().toLowerCase();

  return accounts.filter(
    (account) =>
      account.username.toLowerCase().includes(keyword) ||
      account.name.toLowerCase().includes(keyword)
  );
});

const explorePosts = computed(() => {
  const basePosts = DUMMY_DATA.posts.map((post, index) => ({
    ...post,
    comments: 24 + index * 17,
    featured: index % 3 === 1,
  }));

  return [
    ...basePosts,
    {
      id: 201,
      username: 'visual_journal',
      userImage: 'https://i.pravatar.cc/150?u=visual_journal',
      location: 'Bandung, Indonesia',
      postImage: 'https://picsum.photos/id/42/800/800',
      caption: 'City frames and soft light.',
      likes: 1540,
      hasLiked: false,
      comments: 81,
      featured: true,
    },
    {
      id: 202,
      username: 'coffee_pixels',
      userImage: 'https://i.pravatar.cc/150?u=coffee_pixels',
      location: 'Yogyakarta, Indonesia',
      postImage: 'https://picsum.photos/id/225/800/800',
      caption: 'Morning setup before shipping.',
      likes: 970,
      hasLiked: false,
      comments: 42,
      featured: false,
    },
    {
      id: 203,
      username: 'design_motion',
      userImage: 'https://i.pravatar.cc/150?u=design_motion',
      location: 'Bali, Indonesia',
      postImage: 'https://picsum.photos/id/1062/800/800',
      caption: 'Textures, shadows, contrast.',
      likes: 2230,
      hasLiked: true,
      comments: 126,
      featured: false,
    },
    {
      id: 204,
      username: 'mobile_builder',
      userImage: 'https://i.pravatar.cc/150?u=mobile_builder',
      location: 'Semarang, Indonesia',
      postImage: 'https://picsum.photos/id/180/800/800',
      caption: 'Polished UI beats flashy UI.',
      likes: 1325,
      hasLiked: false,
      comments: 58,
      featured: true,
    },
  ];
});
</script>

<style scoped>
.search-toolbar {
  padding: 8px 12px 4px;
}

.searchbar {
  --background: #efefef;
  --border-radius: 12px;
  --box-shadow: none;
  --color: #111111;
  --placeholder-color: #6e6e73;
  padding-inline: 0;
}

.quick-filters {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 16px 6px;
  scrollbar-width: none;
}

.quick-filters::-webkit-scrollbar {
  display: none;
}

.filter-pill {
  border: 1px solid #dbdbdb;
  border-radius: 999px;
  background: #ffffff;
  color: #262626;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.results-section,
.explore-section {
  padding: 12px 16px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #111111;
}

.section-header span {
  font-size: 13px;
  font-weight: 600;
  color: #6e6e73;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0;
  color: #111111;
}

.account-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
}

.account-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.account-copy strong {
  font-size: 14px;
}

.account-copy span {
  font-size: 13px;
  color: #6e6e73;
}

.status-icon {
  font-size: 10px;
  color: #00c853;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 28px 0 12px;
  text-align: center;
  color: #6e6e73;
}

.empty-state ion-icon {
  font-size: 34px;
  color: #111111;
}

.empty-state h3,
.empty-state p {
  margin: 0;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 8px;
}

.explore-tile {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f3f3f3;
}

.explore-tile.featured {
  grid-row: span 2;
}

.explore-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(0, 0, 0, 0.28);
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.explore-tile:hover .overlay {
  opacity: 1;
}

.overlay-metric {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
}
</style>
