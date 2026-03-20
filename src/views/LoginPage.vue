<template>
  <ion-page>
    <ion-content class="login-content">
      <div class="login-container">
        <!-- Logo -->
        <div class="logo-section">
          <h1 class="insta-logo">InstaApp</h1>
        </div>

        <!-- Form -->
        <div class="form-section">
          <ion-input
            v-model="email"
            type="email"
            placeholder="Nomor telepon, nama pengguna, atau email"
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

          <div class="forgot-password">
            <span @click="router.push('/register')">Lupa kata sandi?</span>
          </div>

          <ion-button
            expand="block"
            class="login-btn"
            :disabled="!email || !password"
            @click="handleLogin"
          >
            Masuk
          </ion-button>

          <div class="divider">
            <span class="line"></span>
            <span class="or-text">ATAU</span>
            <span class="line"></span>
          </div>

          <ion-button fill="clear" class="facebook-btn" expand="block">
            <ion-icon :icon="logoFacebook" slot="start" />
            Masuk dengan Facebook
          </ion-button>
        </div>
      </div>

      <!-- Register link at bottom -->
      <div class="register-section">
        <p>
          Belum punya akun?
          <span class="register-link" @click="router.push('/register')">Daftar</span>
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
import { eyeOutline, eyeOffOutline, logoFacebook } from 'ionicons/icons';
import { login } from '@/services/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) return;

  try {
    await login({
      email: email.value,
      password: password.value,
    });

    const toast = await toastController.create({
      message: 'Login berhasil!',
      duration: 1500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    router.replace('/tabs/home');
  } catch (error) {
    const toast = await toastController.create({
      message: error instanceof Error ? error.message : 'Login gagal',
      duration: 1800,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }
};
</script>

<style scoped>
.login-content {
  --background: #ffffff;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 30px 20px;
  min-height: 85vh;
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.insta-logo {
  font-family: 'Billabong', cursive;
  font-size: 52px;
  font-weight: 400;
  color: #262626;
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

.forgot-password {
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #00376b;
  margin-top: -4px;
  cursor: pointer;
}

.login-btn {
  --background: #0095f6;
  --background-activated: #1877F2;
  --border-radius: 8px;
  --color: #ffffff;
  font-weight: 600;
  margin-top: 6px;
  height: 44px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 8px 0;
}

.line {
  flex: 1;
  height: 1px;
  background: #dbdbdb;
}

.or-text {
  font-size: 12px;
  font-weight: 600;
  color: #8e8e8e;
  letter-spacing: 1px;
}

.facebook-btn {
  --color: #385185;
  font-weight: 600;
  font-size: 14px;
}

.register-section {
  text-align: center;
  border-top: 1px solid #dbdbdb;
  padding: 16px;
  font-size: 14px;
  color: #262626;
}

.register-link {
  color: #0095f6;
  font-weight: 600;
  cursor: pointer;
}
</style>
