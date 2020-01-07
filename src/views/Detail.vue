<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link class="breadcrumb" to="/history">История</router-link>
        <a class="breadcrumb">{{type}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="typeColor">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency("RUB")}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: null,
      record: null,
      type: null,
      typeColor: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.type = record.type === "income" ? "Доход" : "Расход";
    this.typeColor = this.type === "income" ? "green" : "red";
    this.record = {
      ...record,
      categoryName: category.title
    };
  }
};
</script>