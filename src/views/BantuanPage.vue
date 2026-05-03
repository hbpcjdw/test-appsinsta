<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/profile" text="" />
        </ion-buttons>
        <ion-title>Bantuan</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bantuan-content">
      <div class="search-wrap">
        <ion-searchbar
          v-model="searchQuery"
          placeholder="Cari topik bantuan..."
          :debounce="200"
          class="bantuan-searchbar"
        />
      </div>

      <section class="section-title">
        <h2>Topik Populer</h2>
      </section>

      <ion-list lines="none" class="topics-list">
        <ion-item
          v-for="topic in filteredTopics"
          :key="topic.id"
          button
          @click="toggleItem(topic.id)"
          class="topic-item"
        >
          <ion-icon :icon="topic.icon" slot="start" class="topic-icon" />
          <ion-label>
            <h3>{{ topic.title }}</h3>
          </ion-label>
          <ion-icon
            :icon="openId === topic.id ? chevronUp : chevronDown"
            slot="end"
            class="chevron-icon"
          />
        </ion-item>

        <div
          v-for="topic in filteredTopics"
          :key="'detail-' + topic.id"
          v-show="openId === topic.id"
          class="topic-detail"
        >
          <p>{{ topic.detail }}</p>
        </div>
      </ion-list>

      <section class="section-title">
        <h2>Hubungi Kami</h2>
      </section>

      <div class="contact-cards">
        <div class="contact-card" @click="openEmail">
          <ion-icon :icon="mailOutline" class="contact-icon" />
          <span>Email Dukungan</span>
          <small>support@appsinsta.com</small>
        </div>
        <div class="contact-card" @click="openReport">
          <ion-icon :icon="flagOutline" class="contact-icon" />
          <span>Laporkan Masalah</span>
          <small>Kirim laporan bug</small>
        </div>
      </div>

      <div class="version-info">
        <p>Versi Aplikasi: <strong>1.0.0</strong></p>
        <p class="copyright">© 2026 Appsinsta. Semua hak dilindungi.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  toastController,
} from '@ionic/vue';
import {
  lockClosedOutline,
  personOutline,
  notificationsOutline,
  imageOutline,
  chatbubbleOutline,
  shieldCheckmarkOutline,
  chevronDown,
  chevronUp,
  mailOutline,
  flagOutline,
} from 'ionicons/icons';

const searchQuery = ref('');
const openId = ref<number | null>(null);

const topics = [
  {
    id: 1,
    icon: lockClosedOutline,
    title: 'Cara mengubah kata sandi',
    detail:
      'Buka Profil → Pengaturan → Keamanan → Ubah Kata Sandi. Masukkan kata sandi lama lalu kata sandi baru dua kali dan simpan.',
  },
  {
    id: 2,
    icon: personOutline,
    title: 'Cara mengedit profil',
    detail:
      'Buka halaman Profil, lalu ketuk tombol "Edit profile". Kamu bisa mengubah nama, bio, dan link profil.',
  },
  {
    id: 3,
    icon: notificationsOutline,
    title: 'Mengatur notifikasi',
    detail:
      'Buka Profil → Pengaturan → Notifikasi. Di sana kamu bisa mengaktifkan atau menonaktifkan notifikasi untuk like, komentar, dan follower baru.',
  },
  {
    id: 4,
    icon: imageOutline,
    title: 'Cara mengunggah foto',
    detail:
      'Ketuk ikon + di tab bar bawah. Pilih foto dari galeri, tambahkan caption, lalu ketuk "Bagikan".',
  },
  {
    id: 5,
    icon: chatbubbleOutline,
    title: 'Cara mengirim pesan',
    detail:
      'Buka profil pengguna yang ingin kamu kirimi pesan, lalu ketuk tombol "Kirim Pesan". Atau buka ikon Direct Message di pojok kanan atas beranda.',
  },
  {
    id: 6,
    icon: shieldCheckmarkOutline,
    title: 'Keamanan & Privasi akun',
    detail:
      'Aktifkan verifikasi dua langkah di Pengaturan → Keamanan. Kamu juga bisa mengatur akun menjadi privat agar hanya pengikut yang menyetujui yang bisa melihat postingan.',
  },
];

const filteredTopics = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return topics;
  return topics.filter(
    (t) => t.title.toLowerCase().includes(q) || t.detail.toLowerCase().includes(q)
  );
});

const toggleItem = (id: number) => {
  openId.value = openId.value === id ? null : id;
};

const openEmail = async () => {
  const toast = await toastController.create({
    message: 'Membuka klien email…',
    duration: 1500,
    position: 'bottom',
  });
  await toast.present();
  window.location.href = 'mailto:support@appsinsta.com';
};

const openReport = async () => {
  const toast = await toastController.create({
    message: 'Fitur laporan akan segera hadir.',
    duration: 2000,
    position: 'bottom',
  });
  await toast.present();
};
</script>

<style scoped>
ion-toolbar {
  --background: #ffffff;
  --color: #000000;
}

.bantuan-content {
  --background: #fafafa;
}

.search-wrap {
  padding: 12px 16px 0;
}

.bantuan-searchbar {
  --background: #efefef;
  --border-radius: 12px;
  --box-shadow: none;
  --placeholder-color: #8e8e8e;
  padding: 0;
}

.section-title {
  padding: 20px 16px 4px;
}

.section-title h2 {
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.topics-list {
  background: transparent;
  padding: 0 16px;
}

.topic-item {
  --background: #ffffff;
  --border-radius: 12px;
  --padding-start: 14px;
  --padding-end: 14px;
  margin-bottom: 8px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.topic-icon {
  color: #0095f6;
  font-size: 20px;
}

.chevron-icon {
  color: #8e8e8e;
  font-size: 16px;
}

.topic-item h3 {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
}

.topic-detail {
  background: #ffffff;
  margin: -4px 16px 10px;
  padding: 12px 16px;
  border-radius: 0 0 12px 12px;
  border-top: 1px solid #efefef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.topic-detail p {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.contact-cards {
  display: flex;
  gap: 12px;
  padding: 8px 16px 0;
}

.contact-card {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.contact-card:active {
  opacity: 0.75;
}

.contact-icon {
  font-size: 26px;
  color: #0095f6;
}

.contact-card span {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  text-align: center;
}

.contact-card small {
  font-size: 11px;
  color: #8e8e8e;
  text-align: center;
}

.version-info {
  text-align: center;
  padding: 28px 16px 32px;
}

.version-info p {
  font-size: 12px;
  color: #8e8e8e;
  margin: 2px 0;
}

.copyright {
  margin-top: 4px !important;
}
</style>
