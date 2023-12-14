import { getCurrentWeather } from "@/apis/weather";
import type { Current, Daily } from "@/types/weather";
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("counter", {
    state: () => ({
        current: {} as Current,
        daily: [] as Daily[],
    }),
    actions: {
        async getCurrentWeather(lat: string, long: string) {
            const { data, error } = await getCurrentWeather(lat, long);
            if (error) {
                return error;
            }
            this.current = data.current;
            this.daily = data.daily;
        },
    },
});
