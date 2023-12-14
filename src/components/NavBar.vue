<script setup lang="ts"></script>

<template>
    <nav class="nav-bar">
        <div class="logo">
            <img src="@/assets/SimplLogo.svg" alt="logo" />
        </div>
    </nav>
</template>

<style scoped lang="scss">
.nav-bar {
    @apply mb-8 flex w-full items-center justify-center p-4 shadow-lg;

    .logo {
        @apply h-10;
    }
}
</style>
