<script setup lang="ts">
defineProps<{
    title: string;
    value: string;
    color?: "cyan" | "violet" | "pink" | "blue";
}>();
</script>

<template>
    <div class="metric-widget" :color="color">
        <p class="title">{{ title }}</p>
        <p class="value">{{ value }}</p>
    </div>
</template>

<style scoped lang="scss">
.metric-widget {
    @apply rounded p-4 shadow-lg;
    .title {
        @apply mb-1 text-sm text-gray-500;
    }
    .value {
        @apply text-2xl font-bold text-gray-800;
    }

    &[color="cyan"] {
        @apply bg-cyan-100;

        .value {
            @apply text-cyan-800;
        }
    }

    &[color="violet"] {
        @apply bg-violet-100;

        .value {
            @apply text-violet-800;
        }
    }

    &[color="pink"] {
        @apply bg-pink-100;

        .value {
            @apply text-pink-800;
        }
    }

    &[color="blue"] {
        @apply bg-blue-100;

        .value {
            @apply text-blue-800;
        }
    }
}
</style>
