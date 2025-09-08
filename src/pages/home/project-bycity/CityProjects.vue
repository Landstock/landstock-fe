<template>
  <div class="container py-5">
    <h2 class="mb-4">Dự án tại {{ cityName }}</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div v-else>
      <div v-if="projects.length > 0" class="row g-4">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="col-lg-4 col-md-6"
        >
          <div class="card shadow-sm">
            <img
              :src="project.image || defaultImage"
              class="card-img-top"
              alt="project"
            />
            <div class="card-body">
              <h5 class="card-title">{{ project.name }}</h5>
              <p class="card-text">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="alert alert-warning">
        Hiện chưa có dự án nào tại {{ cityName }}.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CityProjects",
  data() {
    return {
      projects: [],
      cityName: "",
      loading: false,
      defaultImage: "https://via.placeholder.com/400x220?text=Chưa+có+hình+ảnh",
    };
  },
  async created() {
    this.loading = true;
    const cityCode = this.$route.params.cityCode;

    try {
      const res = await axios.get(
        `http://localhost:3000/api/projects?city=${cityCode}`
      );
      this.projects = res.data.projects;
      this.cityName = res.data.cityName;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
