import type { WeatherResponse } from "@/types/weather";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

export async function getCurrentWeather(lat: string, long: string) {
    try {
        const response = await axios.get(
            `${BASE_URL}/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`
        );
        return {
            data: response.data as WeatherResponse,
            error: null,
        };
    } catch (e) {
        return {
            data: null,
            error: e as Error,
        };
    }
}
