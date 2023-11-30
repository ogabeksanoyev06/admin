import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentRouteName: null,
    facultyList: [],
    facultyType: [],
    educationYear: [],
  },
  getters: {
    facultyList: (state) => state.facultyList,
    facultyType: (state) => state.facultyType,
    educationYear: (state) => state.educationYear,
  },
  mutations: {
    setCurrentRouteName(state, currentRoute) {
      state.currentRouteName = currentRoute;
    },
    setFacultyList: (state, data) => (state.facultyList = data),
    setFacultyType(state, data) {
      state.facultyType = data;
    },
    setEducationYear: (state, data) => (state.educationYear = data),
  },
  actions: {
    async getFacultyList({ commit }) {
      try {
        await this._vm.$api
          .get(`faculty/?limit=12`)
          .then((data) => {
            if (data.results) {
              commit("setFacultyList", data.results);
            }
          })
          .catch((error) => {
            console.log("Error on getting faculty list" + error);
          })
          .finally(() => {});
      } catch (e) {
        console.log(e);
      }
    },
    async getFacultyType({ commit }) {
      try {
        await this._vm.$api
          .get("faculty_type")
          .then((data) => {
            if (data) {
              commit("setFacultyType", data.results);
            }
          })
          .catch((error) => {
            console.log("Error on getting faculty type" + error);
          })
          .finally(() => {});
      } catch (e) {
        console.log(e);
      }
    },
    async getEducationYear({ commit }) {
      try {
        await this._vm.$api
          .get("educationyear/?limit=100")
          .then((data) => {
            if (data) {
              commit("setEducationYear", data.results);
            }
          })
          .catch((error) => {
            console.log("Error on getting faculty type" + error);
          })
          .finally(() => {});
      } catch (e) {
        console.log(e);
      }
    },
  },
});
export default store;
