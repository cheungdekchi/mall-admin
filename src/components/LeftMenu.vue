<template>
  <div class="menu">
    <div class="menu-list">
      <a-menu
        :default-selected-keys="[$router.currentRoute.matched[1] ?
                                  $router.currentRoute.matched[1].name
                                  : '']"
        :default-open-keys="[$router.currentRoute.matched[0].name]"
        mode="inline"
        theme="dark"
        :inline-collapsed="$store.state.isMenuCollapsed"
      >
        <template  v-for="route in $store.state.routes" >
          <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
            <span slot="title">
              <a-icon :type="route.meta.icon" />
              <span>{{ route.meta.title  }}</span>
            </span>
            <template v-for="children in route.children">
              <a-menu-item v-if="!children.meta.hidden" :key="children.name">
                <router-link :to="{ name: children.name }">
                  <a-icon :type="children.meta.icon" />
                  {{ children.meta.title }}
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="less">
  .menu{
    .menu-list{
      height: 100%;
      width: 180px;
      position: fixed;
      .ant-menu{
        height: 100%;
      }
    }
  }
</style>
