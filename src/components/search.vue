<template>
  <div class="search-list">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item>
        <a-input v-model="searchForm.searchWord" placeholder="请输入商品关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="categoryChange"
          allowClear
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>

    <a-button class="add-btn">
      <router-link :to="{name:'ProductAdd'}">新增商品</router-link>
    </a-button>
  </div>
</template>
<script>
export default {
  props: ['categoryList'],
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    categoryChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>

<style scoped lang="less">
.search-list{
  position: relative;
  padding: 10px 30px;

  .add-btn{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
