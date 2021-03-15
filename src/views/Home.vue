<template>
  <div class="home">
    <div class="menu">
      <left-menu :key="renderMenu"/>
    </div>

    <div :class="{'main-app':true,'menu-unfold': $store.state.isMenuCollapsed}">
      <right-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '@/components/LeftMenu.vue';
import RightHeader from '@/components/RightHeader.vue';

export default {
  name: 'Home',
  data() {
    return {
      renderMenu: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.renderMenu = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    RightHeader,
  },
};
</script>

<style scoped lang='less'>
.main-app{
    margin-left: 180px;
    transition: all .3s;

    &.menu-unfold{
      margin-left: 80px;
    }
}
</style>
