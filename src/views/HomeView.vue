<script setup lang="ts">
import LineGraph from "@/components/LineGraph.vue";
import MetricWidget from "@/components/MetricWidget.vue";
import NavBar from "@/components/NavBar.vue";
import WeatherTable from "@/components/WeatherTable.vue";
import { useWeatherStore } from "@/stores/weather";
import { computed, ref } from "vue";

const store = useWeatherStore();

const showError = ref(false);

const error = await store.getCurrentWeather("12.905144", "77.546554");

if (error) {
    showError.value = true;
}

const exactTemperature = computed(() => `${(store.current.temp - 273).toFixed(2)} °C`);

const feelsLikeTemperature = computed(() => `${(store.current.feels_like - 273).toFixed(2)} °C`);

const humidity = computed(() => `${store.current.humidity} %`);

const uvi = computed(() => `${store.current.uvi.toFixed(2)} %`);
</script>

<template>
    <NavBar />
    <main class="home-view" v-if="!showError">
        <div class="widget-grid">
            <MetricWidget title="Temp" :value="exactTemperature" color="cyan" />
            <MetricWidget title="Feels Like" :value="feelsLikeTemperature" color="violet" />
            <MetricWidget title="Humanity" :value="humidity" color="pink" />
            <MetricWidget title="UVI" :value="uvi" color="blue" />
        </div>
        <div class="graph">
            <LineGraph />
        </div>
        <div class="table">
            <WeatherTable />
        </div>
    </main>
    <div class="error" v-else>
        <p>Something went wrong!</p>
    </div>
</template>

<style lang="scss" scoped>
.home-view {
    @apply grid gap-12 p-4;
    .widget-grid {
        @apply grid grid-cols-4 gap-4;
    }
}
</style>
