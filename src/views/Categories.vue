<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :updatePage="updatePage"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: "categories",
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    async refresh() {
      this.loading = true;
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;
    },
    async updatePage(category) {
      const index = this.categories.findIndex(item => item.id == category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
};
</script>