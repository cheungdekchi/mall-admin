<template>
  <a-form-model
    ref="descForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 14 }"
  >
    <a-form-model-item label="副标题" required prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select
        v-model="form.category"
        placeholder="请选择商品类目"
        @change="changeCategory"
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请选择商品子类目">
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
      <a-select
        mode="tags"
        placeholder="请选择或填写商品标签"
        :default-value="['包邮,最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮,最晚次日达">
          包邮,最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="next"> 下一步 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      categoryItems: [],
      rules: {},
    };
  },
  props: ['form'],
  methods: {
    changeCategory(id) {
      const list = this.categoryList;
      for (let i = 0; i < list.length; i += 1) {
        if (id === list[i].id) {
          this.categoryItems = list[i].c_items;
        }
      }
      return true;
    },
    next() {
      this.$refs.descForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        this.$message.error('请正确输入信息');
        return false;
      });
    },
  },
  created() {
    this.$api.getCategory().then((res) => {
      this.categoryList = res.data;
      return true;
    });
  },
};
</script>
