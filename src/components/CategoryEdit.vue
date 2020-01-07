<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid : ($v.title.$dirty && !$v.title.required)}"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid : ($v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      select: null,
      title: "",
      limit: 10,
      current: null
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(10) }
  },
  props: ["categories"],
  watch: {
    current(id) {
      const { title, limit } = this.categories.find(item => item.id === id);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      };
      try {
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена");
        this.$emit('updatePage', categoryData)
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>