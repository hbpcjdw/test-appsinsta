<template>
  <ion-page>
    <ion-content class="register-content">
      <div class="register-container">
        <!-- Logo -->
        <div class="logo-section">
          <h1 class="insta-logo">InstaApp</h1>
          <p class="tagline">Daftar untuk melihat foto dan video dari teman-temanmu.</p>
        </div>

        <!-- Form -->
        <div class="form-section">
          <ion-input
            v-model="email"
            type="email"
            placeholder="Nomor telepon atau email"
            class="insta-input"
            fill="outline"
          ></ion-input>

          <ion-input
            v-model="fullName"
            type="text"
            placeholder="Nama Lengkap"
            class="insta-input"
            fill="outline"
          ></ion-input>

          <ion-input
            v-model="username"
            type="text"
            placeholder="Nama pengguna"
            class="insta-input"
            fill="outline"
          ></ion-input>

          <ion-input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Kata sandi"
            class="insta-input"
            fill="outline"
          >
            <ion-button slot="end" fill="clear" @click="showPassword = !showPassword">
              <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" slot="icon-only" />
            </ion-button>
          </ion-input>

          <p class="terms-text">
            Dengan mendaftar, kamu menyetujui
            <span class="link-text">Ketentuan Layanan</span>,
            <span class="link-text">Kebijakan Privasi</span>, dan
            <span class="link-text">Kebijakan Cookie</span> kami.
          </p>

          <ion-button
            expand="block"
            class="register-btn"
            :disabled="!email || !fullName || !username || !password"
            @click="handleRegister"
          >
            Daftar
          </ion-button>
        </div>
      </div>

      <!-- Login link at bottom -->
      <div class="login-section">
        <p>
          Sudah punya akun?
          <span class="login-link" @click="router.push('/login')">Masuk</span>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonContent, IonInput, IonButton, IonIcon,
  toastController
} from '@ionic/vue';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

const router = useRouter();
const email = ref('');
const fullName = ref('');
const username = ref('');
const password = ref('');
const showPassword = ref(false);

const handleRegister = async () => {
  if (!email.value || !fullName.value || !username.value || !password.value) return;

  // TODO: ganti dengan registrasi nyata
  const toast = await toastController.create({
    message: 'Akun berhasil dibuat!',
    duration: 1500,
    color: 'success',
    position: 'bottom'
  });
  await toast.present();

  router.replace('/tabs/home');
};
</script>

<style scoped>
.register-content {
  --background: #ffffff;
}

.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 30px 20px;
  min-height: 85vh;
}

.logo-section {
  text-align: center;
  margin-bottom: 24px;
}

.insta-logo {
  font-family: 'Billabong', cursive;
  font-size: 52px;
  font-weight: 400;
  color: #262626;
  margin: 0 0 12px;
}

.tagline {
  font-size: 17px;
  font-weight: 600;
  color: #8e8e8e;
  text-align: center;
  line-height: 1.4;
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.insta-input {
  --border-color: #dbdbdb;
  --border-radius: 6px;
  --background: #fafafa;
  --padding-start: 12px;
  --padding-end: 12px;
  font-size: 14px;
  color: black;
}

.terms-text {
  font-size: 12px;
  color: #8e8e8e;
  text-align: center;
  line-height: 1.5;
  margin: 4px 0;
}

.link-text {
  color: #00376b;
  font-weight: 600;
}

.register-btn {
  --background: #0095f6;
  --background-activated: #1877F2;
  --border-radius: 8px;
  --color: #ffffff;
  font-weight: 600;
  margin-top: 4px;
  height: 44px;
}

.login-section {
  text-align: center;
  border-top: 1px solid #dbdbdb;
  padding: 16px;
  font-size: 14px;
  color: #262626;
}

.login-link {
  color: #0095f6;
  font-weight: 600;
  cursor: pointer;
}
</style>
