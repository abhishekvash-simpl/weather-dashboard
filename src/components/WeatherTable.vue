<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import type { Daily } from "@/types/weather";
import {
    useVueTable,
    createColumnHelper,
    getCoreRowModel,
    type SortingState,
    getSortedRowModel,
} from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";
import { h, ref } from "vue";
import TimeCell from "./weatherTable/TimeCell.vue";
import TemperatureCell from "./weatherTable/TemperatureCell.vue";
import ExpandCell from "./weatherTable/ExpandCell.vue";

const store = useWeatherStore();

const columnHelper = createColumnHelper<Daily>();

const columns = [
    columnHelper.display({
        id: "expand",
        cell: ({ cell }) =>
            h(ExpandCell, {
                isExpanded: cell.row.getIsExpanded(),
                onClick: () => cell.row.toggleExpanded(),
            }),
    }),
    columnHelper.display({
        header: "Vibe",
        cell: ({ row }) =>
            h("img", {
                src: `http://openweathermap.org/img/wn/${row.original.weather[0].icon}.png`,
                onClick: () => row.toggleExpanded(),
            }),
    }),
    columnHelper.accessor("dt", {
        header: "Date",
        cell: ({ cell }) => new Date(cell.getValue() * 1000).toLocaleDateString(),
    }),
    columnHelper.accessor("sunrise", {
        header: "Sunrise",
        cell: ({ cell }) => h(TimeCell, { time: cell.getValue() }),
    }),
    columnHelper.accessor("sunset", {
        header: "Sunset",
        cell: ({ cell }) => h(TimeCell, { time: cell.getValue() }),
    }),
    columnHelper.accessor("temp.day", {
        header: "Temperature",
        cell: ({ cell }) => h(TemperatureCell, { temperature: cell.getValue() }),
        enableSorting: true,
    }),
    columnHelper.accessor("feels_like.day", {
        header: "Feels Like",
        cell: ({ cell }) => h(TemperatureCell, { temperature: cell.getValue() }),
        enableSorting: true,
    }),
    columnHelper.accessor("humidity", {
        header: "Humidity",
        cell: ({ cell }) => `${cell.getValue()} %`,
        enableSorting: true,
    }),
    columnHelper.accessor("uvi", {
        header: "UVI",
        cell: ({ cell }) => `${cell.getValue()}`,
        enableSorting: true,
    }),
];

const sorting = ref<SortingState>([]);

const table = useVueTable({
    get data() {
        return store.daily;
    },
    columns,
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    defaultColumn: {
        enableSorting: false,
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value =
            typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
    <table class="weather-table">
        <thead>
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <th
                    v-for="header in headerGroup.headers"
                    :key="header.id"
                    :colSpan="header.colSpan"
                    :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
                    @click="
                        header.column.getCanSort() &&
                            header.column.getToggleSortingHandler()?.($event)
                    "
                >
                    <template v-if="!header.isPlaceholder">
                        <FlexRender
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />

                        {{ { asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] }}
                    </template>
                </th>
            </tr>
        </thead>
        <tbody></tbody>
        <tbody>
            <template v-for="row in table.getRowModel().rows" :key="row.id">
                <tr>
                    <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>

                <tr v-if="row.getIsExpanded()">
                    <td :colSpan="row.getVisibleCells().length">
                        {{ row.original.summary }}
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
.weather-table {
    @apply w-full border;

    thead {
        @apply border-b;

        th {
            @apply bg-slate-200 px-4 py-2 text-left text-lg;
        }
    }

    tbody {
        @apply divide-y;

        tr {
            td {
                @apply p-4;
            }
        }
    }
}
</style>
