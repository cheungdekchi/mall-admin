<template>
  <a-form-model
    ref="priceFrom"
    :model="form"
    :rules="rules"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 14 }"
  >
    <a-form-model-item label="商品售价" required prop="price">
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" required prop="inventory">
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" required prop="unit">
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册" required prop="images">
      <a-upload
        :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传
          </div>
        </div>
      </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button @click="prev"> 上一步 </a-button>
      <a-button type="primary" style="marginLeft: 10px;" @click="onSubmit"> 提交 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      rules: {},
    };
  },
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    onSubmit() {
      this.$refs.priceFrom.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.form);
          return true;
        }
        this.$message.error('提交失败');
        return false;
      });
    },
    prev() {
      this.$emit('prev', this.form);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const ref = file;
      if (!file.url && !file.preview) {
        ref.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
  },
};
</script>
