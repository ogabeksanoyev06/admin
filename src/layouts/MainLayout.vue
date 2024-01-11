<template>
  <div>
    <div
      class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item mr-auto">
            <a @click="openRoute('dashboard')" class="navbar-brand">
              <h2 class="brand-text mb-0">LMS</h2>
            </a>
          </li>
          <li class="nav-item nav-toggle">
            <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
              <i
                class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"
              />
              <i
                class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary"
                data-ticon="icon-disc"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="shadow-bottom"></div>
      <div class="main-menu-content">
        <ul
          class="navigation navigation-main"
          data-menu="menu-navigation"
          id="main-menu-navigation"
        >
          <li class="nav-item has-sub" v-for="(menu, i) in menu" :key="i">
            <a>
              <i class="feather icon-users"></i>
              <span class="menu-title">
                {{ menu.title }}
              </span>
            </a>
            <ul class="menu-content">
              <li
                v-for="(child, index) in menu.children"
                :key="index"
                :class="currentRouteName === child.routeName ? 'active' : ''"
              >
                <a @click.prevent="openRoute(child.routeName)">
                  <i class="feather icon-users"></i>
                  <span class="menu-item">{{ child.title }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="app-content content">
      <!-- BEGIN: Header-->
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <navigation />
      <!-- END: Header-->
      <div class="content-wrapper p-1">
        <div class="content-body">
          <transition mode="out-in" name="fade">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import VueJwtDecode from "vue-jwt-decode";
import TokenService from "../services/TokenService";

export default {
  name: "MainLayout",
  components: { Navigation },
  data() {
    return {
      menu: [
        {
          title: "OTM strukturasi",
          children: [
            {
              title: "OTM haqida",
              routeName: "structure-university",
            },
            {
              title: "Fakultet",
              routeName: "structure-faculty",
            },
            {
              title: "Kafedra",
              routeName: "structure-department",
            },
          ],
        },
        {
          title: "O'quv jarayoni",
          children: [
            {
              title: "O'quv yili",
              routeName: "curriculum-education-year",
            },
            {
              title: "O'quv reja",
              routeName: "curriculum-curriculum",
            },
            // {
            //   title: "Semestrlar",
            //   routeName: "",
            // },
            // {
            //   title: "Fanlar bloklari",
            //   routeName: "",
            // },
            {
              title: "Fanga biriktirish",
              routeName: "subject-register",
            },
          ],
        },
        {
          title: "Hemis baza",
          children: [
            {
              title: "OTM yuklash",
              routeName: "hemis-otm",
            },
            {
              title: "O'quv reja yuklash",
              routeName: "hemis-curriculum",
            },
            {
              title: "Talaba ma'lumotlarni yuklash",
              routeName: "hemis-student",
            },
            {
              title: "O'qituvchi ma'lumotlarni yuklash",
              routeName: "hemis-teacher",
            },
          ],
        },
        {
          title: "Testlar",
          children: [
            // {
            //   title: "Testlarni qo'shish",
            //   routeName: "",
            // },
            // {
            //   title: "Testlarni tahrirlash",
            //   routeName: "",
            // },
            {
              title: "Imtihonlar ro'yxati",
              routeName: "exam-index",
            },
          ],
        },
        {
          title: "Talabalar",
          children: [
            // {
            //   title: "Testlarni qo'shish",
            //   routeName: "",
            // },
            // {
            //   title: "Testlarni tahrirlash",
            //   routeName: "",
            // },
            {
              title: "Talabalar ro'yxati",
              routeName: "student-list",
            },
          ],
        },
      ],
    };
  },
  methods: {
    openRoute(routeName) {
      this.$router.push({ name: routeName });
      this.$store.commit("setCurrentRouteName", routeName);
    },

    getUserByToken() {
      this.$api.get("").then((res) => {
        if (res.statusCode === 200) {
          this.$store.commit("commitCurrentUser", res.result);
        }
      });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {
    $route(to, from) {
      const currentRoute = this.$route.name;
      this.$store.commit("setCurrentRouteName", currentRoute);
    },
  },
  created() {
    let hasToken = !!TokenService.getToken();
    if (hasToken) {
      this.getUserByToken();
      let decodedAuth = VueJwtDecode.decode(TokenService.getToken());
      console.log(decodedAuth, " decoded");
    }
  },
};
</script>

<style scoped></style>

<style>
td{
  font-size: 12px;
}
::-webkit-scrollbar {
  height: 7px;
  width: 7px;
  background: #f8f8f8;
}

::-webkit-scrollbar-thumb:vertical {
  background: #7367f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:horizontal {
  background: #7367f0;
  border-radius: 10px;
}

.header-navbar.floating-nav {
  width: calc(100% - calc(1rem * 2) - 260px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.katex-display {
  text-align: inherit !important;
}

.katex-display > .katex {
  display: block;
  text-align: inherit !important;
  white-space: normal !important;
}
</style>
