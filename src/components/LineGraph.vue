<script setup lang="ts">
import { computed } from "vue";
import type { EChartsOption } from "echarts";
import VChart from "vue-echarts";
import { graphic } from "echarts";
import { useWeatherStore } from "@/stores/weather";

const store = useWeatherStore();

const tempsArray = computed(() => {
    return store.daily.map((day) => (day.temp.day - 273).toFixed(2));
});

const feelsArray = computed(() => {
    return store.daily.map((day) => (day.feels_like.day - 273).toFixed(2));
});

const humidityArray = computed(() => {
    return store.daily.map((day) => day.humidity);
});

const uviArray = computed(() => {
    return store.daily.map((day) => day.uvi.toFixed(2));
});

// Dates for the x-axis as an array of strings
const datesArray = computed(() => {
    return store.daily.map((day) => {
        const date = new Date(day.dt * 1000);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    });
});

const option = computed(() => {
    return {
        color: ["#06b6d4", "#8b5cf6", "#ec4899", "#3b82f6"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: ["Temperature", "Feels Like", "Humidity", "UVI"],
        },
        grid: {
            left: "2%",
            right: "1%",
            bottom: "10%",
            containLabel: false,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: datesArray.value,
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "Temperature",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(6, 182, 212)",
                        },
                        {
                            offset: 1,
                            color: "rgb(1, 191, 236)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: tempsArray.value,
            },
            {
                name: "Feels Like",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(139, 92, 246)",
                        },
                        {
                            offset: 1,
                            color: "rgb(77, 119, 255)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: feelsArray.value,
            },
            {
                name: "Humidity",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(236, 72, 153)",
                        },
                        {
                            offset: 1,
                            color: "rgb(116, 21, 219)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: humidityArray.value,
            },
            {
                name: "UVI",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(59, 130, 246)",
                        },
                        {
                            offset: 1,
                            color: "rgb(135, 0, 157)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: uviArray.value,
            },
        ],
    } satisfies EChartsOption;
});
</script>

<template>
    <div class="line-graph">
        <VChart :option="option" autoresize />
    </div>
</template>

<style scoped>
.line-graph {
    @apply h-[400px] w-full;
}
</style>
