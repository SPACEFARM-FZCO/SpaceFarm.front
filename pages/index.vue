<template>
  <div class="farm" v-if="response">
    <div class="farm-solution">
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/Thermometr.svg" />
          </div>
          <div class="farm-solution__content">
            <span> Air temperature </span>
            <p>{{ response.zone_air_temperature }} °C</p>
          </div>
          <img class="farm-solution__item-img" src="/icons/Thermometr.svg" />
        </div>
      </div>
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="farm-solution__content">
            <span> Humidity </span>
            <p>
              {{ response.zone_humidity }}
            </p>
          </div>
          <img class="farm-solution__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/C02.svg" />
          </div>
          <div class="farm-solution__content">
            <span> Co2 </span>
            <p>
              {{ response.zone_c02 }}
            </p>
          </div>
          <img class="farm-solution__item-img" src="/icons/C02.svg" />
        </div>
      </div>
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="farm-solution__content">
            <span>Electrical conductivity</span>
            <p>
              {{ response.ec.value }} ЕС
              <span :style="{ color: response.ec.color }">
                <i
                  :class="[
                    'bx',
                    response.ec.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="farm-solution__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="farm-solution__content">
            <span>
              PH (potential <br />
              of hydrogen)
            </span>
            <p>
              {{ response.ph.value }}
              <span :style="{ color: response.ph.color }">
                <i
                  :class="[
                    'bx',
                    response.ph.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="farm-solution__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
      <div class="farm-solution__wrapper">
        <div class="farm-solution__item">
          <div class="farm-solution__sphere">
            <img src="/icons/Thermometr.svg" />
          </div>
          <div class="farm-solution__content">
            <span>
              Solution <br />
              temperature
            </span>
            <p>
              {{ response.temp_solution.value }} °C
              <span :style="{ color: response.temp_solution.color }">
                <i
                  :class="[
                    'bx',
                    response.temp_solution.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="farm-solution__item-img" src="/icons/Thermometr.svg" />
        </div>
      </div>
    </div>

    <div class="farm-zones">
      <div
        v-for="item in response.zones"
        :key="item.modbus_id"
        class="farm-zones__wrapper"
      >
        <div class="farm-zones__title">
          <p>{{ item.name }}</p>
          <span>Zone №{{ item.number_zone }}</span>
        </div>
        <div class="farm-zones__items-wrapper">
          <div class="farm-zones__item">
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/Light.svg" />
              </div>
              <p>Light</p>
            </div>
            <div class="farm-zones__data">
              {{ item.light ? "ON" : "OFF" }}
            </div>
            <img class="farm-zones__item-img" src="/icons/Light.svg" />
          </div>
          <div class="farm-zones__item">
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/Floors.svg" />
              </div>
              <p>Working floors</p>
            </div>
            <div class="farm-zones__data">{{ item.working_floors }}</div>
            <img class="farm-zones__item-img" src="/icons/Floors.svg" />
          </div>
          <NuxtLink
            :to="`/C02/${item.number_zone}`"
            class="farm-zones__item"
            style="cursor: pointer"
          >
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/C02.svg" />
              </div>
              <p>CO2</p>
            </div>
            <div class="farm-zones__data">{{ item.c02 }} РРМ</div>
            <img class="farm-zones__item-img" src="/icons/C02.svg" />
          </NuxtLink>
          <NuxtLink
            :to="`/temperature/${item.number_zone}`"
            class="farm-zones__item"
            style="cursor: pointer"
          >
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/Thermometr.svg" />
              </div>
              <p>Air temperature</p>
            </div>
            <div class="farm-zones__data">{{ item.air_temperature }}С</div>
            <img class="farm-zones__item-img" src="/icons/Thermometr.svg" />
          </NuxtLink>
          <NuxtLink
            :to="`/humidity/${item.number_zone}`"
            style="cursor: pointer"
            class="farm-zones__item"
          >
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/Humidity.svg" />
              </div>
              <p>Humidity</p>
            </div>
            <div class="farm-zones__data">{{ item.humidity }}</div>
            <img class="farm-zones__item-img" src="/icons/Humidity.svg" />
          </NuxtLink>

          <NuxtLink
            :to="`/voc/${item.number_zone}`"
            class="farm-zones__item"
            style="cursor: pointer"
          >
            <div class="farm-zones__item-header">
              <div class="farm-zones__item-sphere">
                <img src="/icons/Humidity.svg" />
              </div>
              <p>VOC</p>
            </div>
            <div class="farm-zones__data">{{ item.VOC }} PPM</div>
            <img class="farm-zones__item-img" src="/icons/Humidity.svg" />
          </NuxtLink>
        </div>
        <div class="farm-zones__time-wrapper">
          <div class="farm-zones__time-item">
            <p>Daylight schedule</p>
            <span>{{ item.daylight_schedule }}</span>
          </div>
          <div class="farm-zones__time-item">
            <p>Watering schedule</p>
            <span>{{ item.watering_schedule }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      response: null,
    };
  },
  fetchOnServer: false,
  async fetch() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .$get("/winrenboard/statistics")
        .then((res) => {
          this.response = res;
          this.$store.commit(
            "workingZones/changeWorkingZones",
            res.working_zones
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getZone(id) {
      // this.$axios
      //   .$get("/winrenboard/statistics")
      //   .then((res) => {
      //     this.response = res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>

<style lang="scss">
.farm {
  &-solution {
    display: flex;
    padding: 20px 0;
    overflow: auto;
    white-space: nowrap;

    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }

  &-solution__wrapper {
    display: inline-block;
    &:first-child {
      .farm-solution__item {
        width: 350px;
      }
      .farm-solution__item-img {
        width: 30%;
        right: -5%;
      }
      p {
        font-size: 24px;
      }
    }
  }

  &-solution__item {
    position: relative;
    width: 257px;
    height: 185px;
    background: #ffffff;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.04);
    border-radius: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    overflow: hidden;
  }

  &-solution__sphere {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #edf4e7;
    border-radius: 100%;
  }

  &-solution__item-img {
    width: 40%;
    height: 55%;
    position: absolute;
    right: -10%;
    bottom: -14%;
    filter: brightness(0) saturate(100%) invert(92%) sepia(10%) saturate(280%)
      hue-rotate(59deg) brightness(108%) contrast(91%);
  }

  &-solution__content {
    p {
      margin-top: 10px;
      color: #262626;
      font-size: 20px;
      font-weight: 500;
    }
  }

  &-zones {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    @include less-than(tablet) {
      flex-direction: column;
    }
  }

  &-zones__wrapper {
    flex: 1;
    background: #ffffff;
    box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.02);
    border-radius: 25px;
    height: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    @include less-than(tablet) {
      padding: 20px;
    }
  }

  &-zones__title {
    display: flex;
    p {
      font-weight: 500;
      font-size: 18px;
    }
    span {
      margin-left: 20px;
      margin-top: 7px;
      color: #000000;
      font-size: 10px;
      opacity: 0.5;
    }
  }

  &-zones__items-wrapper {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  &-zones__item {
    flex: 1 1 40%;
    background: #f2f2f2;
    border-radius: 25px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  &-zones__item-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    p {
      flex: 1;
      margin-left: 10px;
      color: #262626;
      font-size: 12px;
    }
  }
  &-zones__item-sphere {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #77a648;
    border-radius: 100%;
    @include less-than(tablet) {
      width: 30px;
      height: 30px;
    }

    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(385%)
        hue-rotate(225deg) brightness(116%) contrast(100%);
    }
  }

  &-zones__item-img {
    position: absolute;
    width: 55%;
    height: 80%;
    right: -10%;
    bottom: -10%;
    filter: brightness(0) saturate(100%) invert(93%) sepia(37%) saturate(3%)
      hue-rotate(202deg) brightness(109%) contrast(80%);
    @include less-than(tablet) {
      width: 35%;
      height: 60%;
    }
  }

  &-zones__data {
    margin-top: 40px;
    font-weight: 500;
    font-size: 25px;
    color: #262626;
    position: relative;
    z-index: 2;
  }

  &-zones__time-wrapper {
    margin-top: 20px;
    background: #f9f9f9;
    border-radius: 20px;
    padding: 20px;
  }

  &-zones__time-item:last-child {
    border-bottom: none;
  }

  &-zones__time-item {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    p {
      font-size: 14px;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      color: #767676;
    }
  }
}
</style>
