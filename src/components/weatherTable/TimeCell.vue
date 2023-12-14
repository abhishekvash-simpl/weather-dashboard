<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    time: number;
}>();

const time = computed(() => {
    const date = new Date(props.time * 1000);

    return `${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
});
</script>

<template>
    <div class="time-cell">{{ time }}</div>
</template>

<style scoped lang="scss"></style>
