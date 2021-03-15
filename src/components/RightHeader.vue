<template>
    <div class="header">
      <!-- 菜单折叠按钮 -->
      <div class="toggle-btn">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
          <a-icon :type="$store.state.isMenuCollapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ currentRoute[0].meta.title }}</a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name:currentRoute[1].name}">
              {{ currentRoute[1].meta.title }}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <!-- 用户信息 -->
      <ul class="user-info">
          <li>
            欢迎，{{ $store.state.user.username }}
            <a-icon type="down" />
          </li>
          <li @click="onLogout">退出</li>
      </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeMenuCollapsed');
    },
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style scoped lang='less'>
.header{
  position: relative;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding-left: 10px;
  padding-right: 20px;
  z-index: 10;

  .toggle-btn{
    display: inline-block;
  }

  .breadcrumb{
    display: inline-block;
    margin-left: 20px;
  }

  .user-info{
    position: fixed;
    right: 20px;
    top: 0;
    cursor: pointer;
    text-align: center;

    li:not(:first-child){
      display: none;
      &:hover{
        background-color: #eee;
        color: #999;
        font-weight: bold;
      }
    }

    &:hover{
      li{
        display: block;
      }
    }
  }
}
</style>
