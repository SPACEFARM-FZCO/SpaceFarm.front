<template>
  <div>
    <div
      class="toggle-wrapper"
      role="checkbox"
      :aria-checked="value.toString()"
      tabindex="0"
      @click.stop="toggle"
    >
      <!-- @click.stop="value = !value" -->
      <div class="toggle-background" :class="backgroundStyles" />
      <div class="toggle-indicator" :style="indicatorStyles" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    backgroundStyles() {
      return {
        "gold-mid": this.value,
        "gray-lighter": !this.value,
      };
    },
    indicatorStyles() {
      return {
        transform: this.value ? "translateX(0)" : "translateX(14px)",
        left: this.value ? "2px" : "0px",
      };
    },
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.gold-mid {
  background-color: #ababab;
}

.gray-lighter {
  background-color: #77a648;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 34px;
  height: 22px;
  border-radius: 9999px;
}

.toggle-wrapper:focus {
  outline: 0;
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 18px;
  width: 18px;
  // left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;
}
</style>
