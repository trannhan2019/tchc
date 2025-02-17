import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/main/MainLayout.vue";
import { useAuthStore } from "@/stores/auth";
import NotFound from "@/views/errors/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
      meta: { title: "Đăng nhập", requiresAuth: false },
    },
    {
      path: "/",
      name: "main.layout",
      component: MainLayout,
      meta: { requiresAuth: true, title: "Main Layout" },

      redirect: { name: "dashboard" },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/DashboardView.vue"),
          meta: { title: "Dashboard", requiresAuth: true, roles: ["admin"] },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      meta: { requiresAuth: true, roles: ["admin"] },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/not-found",
      name: "not.found",
      component: NotFound,
      meta: {
        title: "Not Found",
        isRequiredAuth: false,
      },
    },
    { path: "/:pathMatch(.*)*", redirect: { name: "not.found" } },
  ],
});

//middleware
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | MyApp` : "MyApp";

  const auth = useAuthStore();
  const user = auth.user;

  if (to.meta.requiresAuth === false) {
    // Nếu không yêu cầu đăng nhập mà user đã login → chuyển đến dashboard
    if (user) {
      return next("/dashboard");
    }
    return next();
  }

  if (to.meta.requiresAuth) {
    // Nếu yêu cầu đăng nhập mà user chưa login → chuyển đến login
    if (!user) {
      return next("/login");
    }

    // Nếu có yêu cầu role cụ thể
    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      return next("/403"); // Không có quyền → chuyển đến trang 403
    }

    return next(); // Đủ quyền → vào trang
  }

  return next();
});

export default router;
