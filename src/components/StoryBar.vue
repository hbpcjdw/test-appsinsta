<template>
  <div class="story-container">
    <div v-for="story in stories" :key="story.id" class="story-item">
      <div class="story-ring">
        <img :src="story.image" />
      </div>
      <span>{{ story.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ stories: any[] }>();
</script>

<style scoped>
.story-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  border-bottom: 0.5px solid #dbdbdb;
  background: white;
}
.story-container::-webkit-scrollbar { display: none; }
.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
  min-width: 75px;
}
.story-ring {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  padding: 2px;
  border: 2px solid #e1306c; /* Instagram Color */
  margin-bottom: 4px;
}
.story-ring img {
  border-radius: 50%;
  border: 2px solid white;
}
.story-item span { font-size: 11px; color: #262626; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center; white-space: nowrap; }
</style>