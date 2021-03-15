<template>
  <div class="Product-list">
    <!-- 搜索 -->
    <search @submit="formSubmit" :categoryList="categoryList" />
    <!-- 表格 -->
    <products-table
      :tableData="tableData"
      :pagination="pagination"
      @change="changePage"
      @edit="productEdit"
      @remove="productRemove"
      />
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import ProductsTable from '@/components/productsTable.vue';

export default {
  data() {
    return {
      searchData: {},
      tableData: [],
      pagination: {
        current: 1,
        hideOnSinglePage: true,
        pageSize: 10,
        total: 1,
        pageSizeoptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
      },
      categoryList: [],
      categoryNameObj: {},
    };
  },
  components: {
    Search,
    ProductsTable,
  },
  async created() {
    await this.getCategoryList();
    this.getProductList();
  },
  methods: {
    formSubmit(info) {
      this.searchData = info;
      this.getProductList();
    },
    getProductList() {
      this.$api.getProductList({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...this.searchData,
      }).then((res) => {
        this.pagination.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryNameObj[item.category].name,
        }));
      });
    },
    getCategoryList() {
      this.$api.getCategory().then((res) => {
        this.categoryList = res.data;
        res.data.forEach((item) => {
          this.categoryNameObj[item.id] = item;
          return item;
        });
      });
    },
    changePage(page) {
      this.pagination = page;
      this.getProductList();
    },
    productEdit(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    productRemove(record) {
      this.$confirm({
        title: '确认删除',
        content: `确定删除标题为:${record.title}的商品吗?`,
        onOk: () => {
          this.$api.deleteProduct({
            id: record.id,
          }).then(() => {
            this.getProductList();
          });
        },
        onCancel() {
          return false;
        },
      });
    },
  },
};
</script>
