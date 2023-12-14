<script setup lang="ts">
defineProps<{
    isExpanded: boolean;
}>();
</script>

<template>
    <button>
        {{ isExpanded ? "v" : ">" }}
    </button>
</template>

<style scoped></style>
