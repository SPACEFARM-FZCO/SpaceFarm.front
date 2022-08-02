<template>
  <div class="container">
    <div
      class="container-sidebar"
      :class="[opened ? 'container-sidebar--open' : null]"
    >
      <img src="/logo.svg" class="container-sidebar__logo" />
      <div>
        <nuxt-link to="/" exact-active-class="container-sidebar__link--active">
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/Farm.svg" />
            Farm
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/Farm.svg" />
            Farm
          </div>
        </nuxt-link>
        <nuxt-link
          to="/climateandzone"
          exact-active-class="container-sidebar__link--active"
        >
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/Climate and zone settings.svg" />
            Climate and zone settings
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/Climate and zone settings.svg" />
            Climate and zone settings
          </div>
        </nuxt-link>
        <nuxt-link
          @click="opened = !opened"
          to="/handcontrol"
          exact-active-class="container-sidebar__link--active"
        >
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/Hand control.svg" />
            Hand control
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/Hand control.svg" />
            Hand control
          </div>
        </nuxt-link>
        <nuxt-link
          @click="opened = false"
          to="/scada"
          exact-active-class="container-sidebar__link--active"
        >
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/SCADA.svg" />
            SCADA
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/SCADA.svg" />
            SCADA
          </div>
        </nuxt-link>
        <nuxt-link
          @click.prevent="opened = false"
          to="/orders"
          exact-active-class="container-sidebar__link--active"
        >
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/Orders.svg" />
            Orders
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/Orders.svg" />
            Orders
          </div>
        </nuxt-link>
        <nuxt-link
          @click="opened = !opened"
          to="/tasks"
          exact-active-class="container-sidebar__link--active"
        >
          <div class="container-sidebar__link-mobile" @click="opened = !opened">
            <img src="/icons/Tasks.svg" />
            Tasks
          </div>
          <div class="container-sidebar__link-desk">
            <img src="/icons/Tasks.svg" />
            Tasks
          </div>
        </nuxt-link>
      </div>
      <div></div>
    </div>
    <div class="container-content">
      <div class="container-header">
        <div class="container-header__content">
          <nuxt-link to="/">Showroom Dubai</nuxt-link>
          <span> Working zones: {{ $store.state.workingZones.zones }} </span>
        </div>
        <button type="button" @click="opened = !opened">
          <div class="bar" :class="{ topopen: opened }"></div>
          <div class="bar" :class="{ botopen: opened }"></div>
        </button>
      </div>
      <div class="container-main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
    };
  },
};
</script>

<style lang="scss">
$sidebarwidth: 280px;
.container {
  width: 100%;
  display: flex;

  &-sidebar {
    position: sticky;
    height: 100vh;
    min-width: $sidebarwidth;
    width: $sidebarwidth;
    //   position: fixed;
    //   z-index: 1;
    top: 0;
    //   left: -500px;
    padding: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    transition: all ease 0.5s;

    @include less-than(tablet) {
      left: -500px;
      position: fixed;
      z-index: 1;
    }

    img {
      width: 100%;
      transform: scale(0.85);
    }

    a {
      text-decoration: none;
      font-size: 14px;
      display: block;
      transition: 0.3s;
      padding: 10px;
      margin: 10px 0;
      border-radius: 10px;
      &:hover {
        background: #edf4e7;
        color: #77a648;
      }
    }
  }
  &-sidebar__logo {
    margin-bottom: 40px;
  }
  &-sidebar__link--active {
    background: #edf4e7;
    color: #77a648;
    position: relative;

    img {
      filter: brightness(0) saturate(100%) invert(60%) sepia(32%) saturate(725%)
        hue-rotate(47deg) brightness(94%) contrast(80%);
    }
  }
  &-sidebar__link-mobile {
    display: none;
    @include less-than(tablet) {
      display: flex;
      align-items: center;
    }

    img {
      width: 18px;
      margin-right: 10px;
    }
  }
  &-sidebar__link-desk {
    display: flex;
    align-items: center;
    @include less-than(tablet) {
      display: none;
    }

    img {
      width: 18px;
      margin-right: 10px;
    }
  }
  &-sidebar--open {
    left: 0;
  }

  &-content {
    width: calc(100% - $sidebarwidth);
    @include less-than(tablet) {
      width: 100%;
    }
  }

  &-header {
    transition: margin-left 0.3s;
    padding: 20px 30px 0px;
    display: flex;
    justify-content: space-between;

    button {
      background: #f0f0f0;
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }

    .bar {
      display: block;
      height: 0px;
      width: 50%;
      border: 1px solid #000000;
      margin: 5px auto;
    }
    .midopen {
      width: 0;
    }
    .bar {
      transition: all 0.3s ease;
    }
    .topopen {
      transform: translateY(2px) rotateZ(45deg);
    }
    .botopen {
      transform: translateY(-5px) rotateZ(-45deg);
    }

    @include less-than(tablet) {
      padding: 20px 20px 0px;
    }

    @include more-than(tablet) {
      button {
        display: none;
      }
    }
  }
  &-header__content {
    display: flex;
    align-items: flex-end;
    width: fit-content;

    @include less-than(tablet) {
      flex-direction: column;
      align-items: flex-start;
    }

    a {
      font-weight: 500;
      font-size: 24px;
      line-height: 1;
    }
    span {
      margin-left: 14px;
      font-size: 14px;
      opacity: 0.5;
      @include less-than(tablet) {
        margin-top: 10px;
        margin-left: 0px;
      }
    }
  }

  &-main {
    margin-top: 20px;
    padding: 0 30px 20px;
    @include less-than(tablet) {
      padding: 0 20px 20px;
    }
  }
}
</style>
