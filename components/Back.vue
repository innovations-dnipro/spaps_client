<template>
  <div class="s-back" @click="router.back()">
    <i class="ph-arrow-circle-left ph"></i>
    <div class="s-back-text">
      {{ $t('back_messages.back') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
</script>
