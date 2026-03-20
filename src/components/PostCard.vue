<template>
  <div class="post-card">
    <ion-item lines="none">
      <ion-avatar slot="start">
        <img :src="avatarSrc" @error="onAvatarError" />
      </ion-avatar>
      <ion-label>
        <h3 class="username">{{ post.username }}</h3>
        <p class="location">{{ post.location }}</p>
      </ion-label>
      <ion-button slot="end" fill="clear" color="dark">
        <ion-icon :icon="ellipsisHorizontal"></ion-icon>
      </ion-button>
    </ion-item>

    <div class="image-container" @dblclick="handleLike">
      <img :src="postImageSrc" @error="onPostImageError" />
    </div>

    <div class="actions">
      <ion-button fill="clear" @click="handleLike">
        <ion-icon :icon="hasLiked ? heart : heartOutline" :color="hasLiked ? 'danger' : 'dark'"></ion-icon>
      </ion-button>
      <ion-button fill="clear"><ion-icon :icon="chatbubbleOutline" color="dark"></ion-icon></ion-button>
      <ion-button fill="clear"><ion-icon :icon="paperPlaneOutline" color="dark"></ion-icon></ion-button>
    </div>

    <div class="content ion-padding-horizontal">
      <p class="likes-count"><strong>{{ likes }} likes</strong></p>
      <p><strong>{{ post.username }}</strong> {{ post.caption }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from '@ionic/vue';
import { ellipsisHorizontal, heartOutline, heart, chatbubbleOutline, paperPlaneOutline } from 'ionicons/icons';

const props = defineProps<{ post: any }>();

const hasLiked = ref(props.post.hasLiked);
const likes = ref(props.post.likes);
const fallbackAvatar = ref(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`);

const getRandomPostImage = (seed: number | string) => `https://picsum.photos/seed/${seed}/800/800`;

const avatarSrc = computed(() => props.post.userImage?.trim() || fallbackAvatar.value);
const postImageSrc = computed(() =>
  props.post.postImage?.trim() || getRandomPostImage(`home-post-${props.post.id}`)
);

watch(
  () => [props.post.hasLiked, props.post.likes],
  ([nextHasLiked, nextLikes]) => {
    hasLiked.value = nextHasLiked;
    likes.value = nextLikes;
  }
);

const handleLike = () => {
  // Simple logic: Toggle status lokal
  hasLiked.value = !hasLiked.value;
  hasLiked.value ? likes.value++ : likes.value--;
};

const onAvatarError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  image.src = fallbackAvatar.value;
};

const onPostImageError = (event: Event) => {
  const image = event.target as HTMLImageElement;
  if (image.dataset.fallbackApplied === 'true') {
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = getRandomPostImage(`fallback-${props.post.id}-${Date.now()}`);
};
</script>

<style scoped>
.post-card { border-bottom: 0.5px solid #efefef; padding-bottom: 10px; }
.username { font-weight: 600; font-size: 14px; }
.location { font-size: 12px; }
.image-container img { width: 100%; height: auto; object-fit: cover; }
.actions { display: flex; padding: 0 5px; }
.actions ion-button { --padding-start: 8px; --padding-end: 8px; font-size: 24px; }
.content p { margin: 4px 0; font-size: 14px; }
</style>