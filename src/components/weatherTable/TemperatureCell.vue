<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    temperature: number;
}>();

const temperature = computed(() => {
    return `${(props.temperature - 273).toFixed(2)} °C`;
});

const color = computed(() => {
    if (props.temperature - 273 < 14) {
        return "blue";
    } else if (props.temperature - 273 < 26) {
        return "green";
    } else if (props.temperature - 273 < 36) {
        return "yellow";
    } else {
        return "red";
    }
});
</script>

<template>
    <div class="temperature-cell" :class="color">{{ temperature }}</div>
</template>

<style scoped lang="scss">
.temperature-cell {
    @apply w-fit rounded-md px-4 py-2;
    &.blue {
        @apply text-blue-500;
    }
    &.green {
        @apply text-green-500;
    }
    &.yellow {
        @apply text-yellow-500;
    }
    &.red {
        @apply text-red-500;
    }
}
</style>
