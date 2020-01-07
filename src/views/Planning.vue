<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      категорий пока нет.
      <router-link to="/categories">Добавить категорию</router-link>
    </p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div class="determinate" :class="category.colors" :style="{width  : `${category.progressPercent}%`}"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "planning",
  data() {
    return {
      loading: true,
      categories: []
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map(category => {
      const spend = records
        .filter(record => record.categoryId == category.id)
        .filter(record => record.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;

      const colors = percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipVal = category.limit - spend
      const tooltip =`${tooltipVal < 0 ? 'Превашение на' : 'Осталось'} ${Math.abs(tooltipVal)}`  

      return {
        ...category,
        progressPercent,
        colors,
        spend,
        tooltip
      };
    });
    this.loading = false;
  }
};
</script>