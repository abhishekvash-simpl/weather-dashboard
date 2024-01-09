import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/dashboard",
            name: "home-test",
            component: () => import("@/views/HomeView.vue"),
        },
    ],
});

export default router;
