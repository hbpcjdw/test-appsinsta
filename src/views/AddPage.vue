<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New Post</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="add-post-form">
        <ion-item lines="none" class="field-card">
          <ion-label position="stacked">Caption</ion-label>
          <ion-textarea
            v-model="caption"
            placeholder="Tulis sesuatu..."
            :auto-grow="true"
          ></ion-textarea>
        </ion-item>

        <ion-item lines="none" class="field-card">
          <ion-label position="stacked">Image URL (optional)</ion-label>
          <ion-input
            v-model="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
          ></ion-input>
        </ion-item>

        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="hidden-file-input"
          @change="onFileChange"
        />

        <ion-button expand="block" fill="outline" @click="openFilePicker">
          Pilih Gambar dari Device
        </ion-button>

        <div v-if="previewImage" class="preview-card">
          <img :src="previewImage" alt="Preview post" />
        </div>

        <ion-button expand="block" @click="submitPost" :disabled="isSubmitting">
          {{ isSubmitting ? 'Posting...' : 'Post' }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonButton,
  toastController,
} from '@ionic/vue';
import { addPost } from '@/services/data';
import { getCurrentUser, mappedUser } from '@/services/auth';
import { getDeterministicAvatar } from '@/services/avatar';

const router = useRouter();

const caption = ref('');
const imageUrl = ref('');
const uploadedImage = ref('');
const isSubmitting = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const postUsername = ref('you');
const postUserImage = ref(getDeterministicAvatar(postUsername.value));

const previewImage = computed(() => uploadedImage.value || imageUrl.value.trim());

onMounted(async () => {
  const currentUser = mappedUser.value || (await getCurrentUser());
  if (currentUser) {
    postUsername.value = currentUser.username;
    postUserImage.value = getDeterministicAvatar(currentUser.username);
  }
});

const resolvePostAuthor = async () => {
  const currentUser = mappedUser.value || (await getCurrentUser());
  if (currentUser) {
    postUsername.value = currentUser.username;
    postUserImage.value = getDeterministicAvatar(currentUser.username);
  }
};

const openFilePicker = () => {
  fileInputRef.value?.click();
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.value = typeof reader.result === 'string' ? reader.result : '';
  };
  reader.readAsDataURL(file);
};

const showToast = async (message: string, color: 'success' | 'warning') => {
  const toast = await toastController.create({
    message,
    color,
    duration: 1800,
    position: 'bottom',
  });
  await toast.present();
};

const submitPost = async () => {
  isSubmitting.value = true;

  try {
    await resolvePostAuthor();

    addPost({
      caption: caption.value,
      postImage: uploadedImage.value || imageUrl.value,
      username: postUsername.value,
      userImage: postUserImage.value,
      location: 'Indonesia',
    });

    caption.value = '';
    imageUrl.value = '';
    uploadedImage.value = '';
    if (fileInputRef.value) {
      fileInputRef.value.value = '';
    }

    await showToast('Posting berhasil dibuat', 'success');
    await router.push('/tabs/home');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Gagal membuat postingan';
    await showToast(message, 'warning');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.add-post-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field-card {
  --background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
}

.hidden-file-input {
  display: none;
}

.preview-card {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #efefef;
}

.preview-card img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
