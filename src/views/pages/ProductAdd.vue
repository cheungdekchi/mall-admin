<template>
  <div class="product-add">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <desc-detail  v-if="current === 0" @next="next" :form="form" />
      <price-detail v-else-if="current === 1" @prev="prev" @onSubmit="onSubmit" :form="form" />
    </div>
  </div>
</template>

<script>
import DescDetail from '@/components/descDetail.vue';
import PriceDetail from '@/components/priceDetail.vue';

export default {
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: [],
        tags: [],
        price: 0,
        price_off: '',
        inventory: 0,
        unit: '',
        images: [],
      },
      steps: [
        {
          title: '填写商品描述信息',
        },
        {
          title: '填写商品价格信息',
        },
      ],
    };
  },
  components: {
    DescDetail,
    PriceDetail,
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      this.$api.getProductDetail(id).then((res) => {
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      this.current += 1;
    },
    prev(form) {
      this.form = {
        ...this.form,
        form,
      };
      this.current -= 1;
    },
    onSubmit(form) {
      const { id } = this.$route.params;
      if (id) {
        this.$api.editProduct(form).then(() => {
          this.$message.success('修改成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
        return true;
      }
      this.$api.addProduct(form).then(() => {
        this.$message.success('提交成功');
        this.$router.push({
          name: 'ProductList',
        });
      });
      return true;
    },
  },
};
</script>
<style scoped lang='less'>
.product-add{
  .product-steps{
    width: 50%;
    margin: 20px auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
