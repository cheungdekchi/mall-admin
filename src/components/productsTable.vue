<template>
  <a-table
    :columns="columns"
    :data-source="computedData"
    :pagination="pagination"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="productEdit(record)">编辑</a-button>
      <a-button @click="productRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '限制购买量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, recorde) {
      return recorde.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: ['tableData', 'pagination'],
  data() {
    return {
      columns,
    };
  },
  computed: {
    computedData() {
      return this.tableData.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    productEdit(record) {
      this.$emit('edit', record);
    },
    productRemove(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
