import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "./layouts/MainLayout";
// import TokenService from "./services/TokenService";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/login",
      component: () => import("./views/Login/Login"),
      name: "login",
    },
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "/",
          redirect: { name: "dashboard" },
        },
        {
          path: "/dashboard",
          component: () => import("./views/dashboard/home"),
          name: "dashboard",
        },
        {
          path: "/profile",
          component: () => import("./views/Profile/Profile"),
          name: "profile",
        },
        {
          path: "structure/university",
          component: () => import("./views/structure/structure-university"),
          name: "structure-university",
        },
        {
          path: "structure/faculty",
          component: () => import("./views/structure/structure-faculty"),
          name: "structure-faculty",
        },
        {
          path: "structure/department",
          component: () => import("./views/structure/structure-department"),
          name: "structure-department",
        },
        {
          path: "curriculum/education-year",
          component: () => import("./views/curriculum/education-year"),
          name: "curriculum-education-year",
        },
        {
          path: "curriculum/curriculum",
          component: () => import("./views/curriculum/curriculum"),
          name: "curriculum-curriculum",
        },
        {
          path: "transfer/subject-register",
          component: () => import("./views/curriculum/subject-register"),
          name: "subject-register",
        },
        {
          path: "hemis/otm",
          component: () => import("./views/hemis/otm-hemis"),
          name: "hemis-otm",
        },
        {
          path: "hemis/curriculum",
          component: () => import("./views/hemis/curriculum-hemis"),
          name: "hemis-curriculum",
        },
        {
          path: "hemis/student",
          component: () => import("./views/hemis/student-hemis"),
          name: "hemis-student",
        },
        {
          path: "hemis/teacher",
          component: () => import("./views/hemis/teacher-hemis"),
          name: "hemis-teacher",
        },
        {
          path: "exam/index",
          component: () => import("./views/tests/exam/index"),
          name: "exam-index",
        },
        {
          path: "exam/create",
          component: () => import("./views/tests/exam/create.vue"),
          name: "exam-create",
        },
        {
          path: "exam-detail/:exam_id",
          component: () => import("./views/tests/exam/exam-detail"),
          name: "exam-detail",
        },
        {
          path: "test-list/:exam_id",
          component: () => import("./views/tests/exam/test-list.vue"),
          name: "test-list",
          props: true,
        },
        {
          path: "test-edit/:test_id/:next_id",
          component: () => import("./views/tests/exam/test-edit.vue"),
          name: "test-edit",
          props: true,
        },
        {
          path: "test-add/:exam_id",
          component: () => import("./views/tests/exam/test-add.vue"),
          name: "test-add",
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const isPublic = to.matched.some((record) => record.meta.public);
//   const onlyWhenLoggedOut = to.matched.some(
//     (record) => record.meta.onlyWhenLoggedOut
//   );
//   let hasToken = !!TokenService.getToken();

//   if (!isPublic && !hasToken) {
//     return next({
//       name: "login",
//     });
//   }

//   if (hasToken && onlyWhenLoggedOut) {
//     return next({
//       name: "dashboard",
//     });
//   }

//   next();
// });

export default router;
