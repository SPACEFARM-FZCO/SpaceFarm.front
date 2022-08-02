<template>
  <div class="zone">
    <div class="zone-chart">
      <div class="zone-chart__header">
        <div class="zone-chart__header-item">
          <h1>Zone № {{ $route.params.id }}</h1>

          <p v-if="zoneData">{{ zoneData.name }}</p>
        </div>
        <div class="zone-chart__header-item zone-chart__header-item--mob">
          <div>
            <h1>Humidity</h1>
            <div v-if="zoneData">{{ zoneData.humidity.value }} · Today</div>
          </div>
        </div>
        <div class="zone-chart__header-item zone-chart__events">
          <div
            class="zone-chart__events-wrapper"
            style="width: 100%; height: 55px"
          >
            <div
              @click="
                type = 'day';
                getZoneData(filter, type);
              "
              :class="[
                'zone-chart__events-button',
                type === 'day' ? 'zone-chart__events-button--active' : '',
              ]"
            >
              Day themp.
            </div>
            <div
              @click="
                type = 'night';
                getZoneData(filter, type);
              "
              :class="[
                'zone-chart__events-button',
                type === 'night' ? 'zone-chart__events-button--active' : '',
              ]"
              :style="{
                'background-color': type === 'night' ? '#6E87DE' : '',
              }"
            >
              Night themp.
            </div>
          </div>
        </div>
        <div class="zone-chart__header-item zone-chart__header-item--desk">
          <div>
            <h1>Humidity</h1>
            <div v-if="zoneData">{{ zoneData.humidity.value }} · Today</div>
          </div>
        </div>
      </div>
      <client-only>
        <div class="zone-chart__grafic">
          <vueApexCharts
            ref="chart_stat"
            :width="chartWidth"
            :height="chartHeight"
            :options="chartOptions"
            :series="series"
          ></vueApexCharts>
        </div>
      </client-only>
      <div class="zone-chart__events">
        <div class="zone-chart__events-wrapper">
          <div
            @click="
              filter = 'day';
              getZoneData(filter, type);
            "
            :class="[
              'zone-chart__events-button',
              filter === 'day' ? 'zone-chart__events-button--active' : '',
            ]"
            :style="{
              'background-color':
                type === 'night' ? (filter === 'day' ? '#6E87DE' : null) : null,
            }"
          >
            Day
          </div>
          <div
            @click="
              filter = 'week';
              getZoneData(filter, type);
            "
            :class="[
              'zone-chart__events-button',
              filter === 'week' ? 'zone-chart__events-button--active' : '',
            ]"
            :style="{
              'background-color':
                type === 'night'
                  ? filter === 'week'
                    ? '#6E87DE'
                    : null
                  : null,
            }"
          >
            Week
          </div>
          <div
            @click="
              filter = 'month';
              getZoneData(filter, type);
            "
            :class="[
              'zone-chart__events-button',
              filter === 'month' ? 'zone-chart__events-button--active' : '',
            ]"
            :style="{
              'background-color':
                type === 'night'
                  ? filter === 'month'
                    ? '#6E87DE'
                    : null
                  : null,
            }"
          >
            Month
          </div>
        </div>
      </div>
    </div>
    <div class="zone-tabs" v-if="zoneData">
      <div class="zone-tabs__wrapper">
        <div class="zone-tabs__item">
          <div style="display: flex; align-items: center">
            <div class="zone-tabs__sphere">
              <img src="/icons/Humidity.svg" />
            </div>
            <p style="margin-left: 10px">
              Solution volume <br />(electrical conductivity)
            </p>
          </div>
          <div class="zone-tabs__content">
            <p>
              {{ zoneData.ppm.value }} PPM
              <span :style="{ color: zoneData.ec.color }">
                <i
                  :class="[
                    'bx',
                    zoneData.ec.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
            <p>
              {{ zoneData.ec.value }} ЕС
              <span :style="{ color: zoneData.ec.color }">
                <i
                  :class="[
                    'bx',
                    zoneData.ec.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="zone-tabs__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
      <div class="zone-tabs__wrapper">
        <div class="zone-tabs__item">
          <div style="display: flex; align-items: center">
            <div class="zone-tabs__sphere">
              <img src="/icons/Humidity.svg" />
            </div>
            <p style="margin-left: 10px">PH (potential of hydrogen)</p>
          </div>
          <div class="zone-tabs__content">
            <p>
              {{ zoneData.ph.value }} PH
              <span :style="{ color: zoneData.ph.color }">
                <i
                  :class="[
                    'bx',
                    zoneData.ph.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="zone-tabs__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
      <div class="zone-tabs__wrapper">
        <div class="zone-tabs__item">
          <div style="display: flex; align-items: center">
            <div class="zone-tabs__sphere">
              <img src="/icons/C02.svg" />
            </div>
            <p style="margin-left: 10px">Humidity relative</p>
          </div>
          <div class="zone-tabs__content">
            <p>
              {{ zoneData.humidity.value }}
              <span :style="{ color: zoneData.humidity.color }">
                <i
                  :class="[
                    'bx',
                    zoneData.humidity.color === 'red'
                      ? 'bx-chevron-down'
                      : 'bx-chevron-up',
                  ]"
                ></i>
              </span>
            </p>
          </div>
          <img class="zone-tabs__item-img" src="/icons/C02.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  components: {
    vueApexCharts: () => import("vue-apexcharts"),
  },
  data() {
    return {
      zoneData: null,

      filter: "week",
      type: "day",

      series: [
        {
          name: "series1",
          data: [],
        },
      ],
      chartWidth: "100%",
      chartHeight: "400px",

      chartOptions: {
        chart: {
          type: "area",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          foreColor: "#A3A3A3",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
          colors: ["#77A648"],
          curve: "smooth",
        },
        grid: {
          yaxis: {
            lines: {
              show: true,
              offsetX: 0,
              offsetY: 0,
            },
          },
          xaxis: {
            lines: {
              show: true,
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          enabled: false,
          enabledOnSeries: undefined,
        },
        fill: {
          type: "gradient",
          colors: ["#bcd6a3", "#bcd6a3"],
        },
        markers: {
          size: 5,
          colors: ["#77A648"],
        },
      },
    };
  },

  watch: {
    type(val) {
      if (val === "night") {
        this.chartOptions.fill.colors =
          this.chartOptions.stroke.colors =
          this.chartOptions.markers.colors =
            ["#6E87DE"];
      } else {
        this.chartOptions.fill.colors = ["#bcd6a3", "#bcd6a3"];

        this.chartOptions.stroke.colors = this.chartOptions.markers.colors = [
          "#77A648",
        ];
      }
    },
  },

  fetchOnServer: false,
  async fetch() {
    this.getZoneData();
  },

  methods: {
    getZoneData(filter = "week", type = "day") {
      this.$axios
        .$get(
          `/winrenboard/humidity?number_zone=${this.$route.params.id}&filter=${filter}&type=${type}`
        )
        .then((res) => {
          this.$nextTick(() => {
            this.zoneData = res;
            this.series[0].data = res.chart.data;
            this.series[0].name = "";
            this.chartOptions.xaxis.categories = res.chart.categories;
            if (screen.width < 600) {
              console.log(screen.width);
              this.chartWidth = "1000px";
            }
            this.$refs.chart_stat.refresh();
            this.$store.commit(
              "workingZones/changeWorkingZones",
              res.working_zones
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.zone {
  max-height: 100%;

  &-chart {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.04);
    border-radius: 25px;
    padding: 20px;
  }

  &-chart__header {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;

    @include less-than(tablet) {
      flex-wrap: wrap;
    }

    h1 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }

  &-chart__header-item {
    flex: 1;
    @include less-than(tablet) {
      flex: 1 1 40% !important;
      gap: 20px;
    }
  }

  &-chart__header-item--desk {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: wrap;
    @include less-than(tablet) {
      display: none;
    }
  }
  &-chart__header-item--mob {
    display: none;
    @include less-than(tablet) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: wrap;
    }
  }

  &-chart__grafic {
    overflow-x: scroll;
    white-space: nowrap;
  }

  &-chart__events {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 20px;
  }
  &-chart__events-wrapper {
    height: 60px;
    width: 40%;
    background: #f2f2f2;
    border-radius: 22px;
    display: flex;
    @include less-than(tablet) {
      width: 80%;
    }
  }
  &-chart__events-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
    border-radius: 18px;
    margin: 5px;
    transition: all ease 0.6s;
  }
  &-chart__events-button--active {
    background: #77a648;
    color: #fff;
  }

  &-tabs {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    gap: 20px;
    @include less-than(tablet) {
      flex-wrap: wrap;
    }
    // overflow: auto;
    // white-space: nowrap;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }
  &-tabs__wrapper {
    flex: 1;
    @include less-than(tablet) {
      flex-direction: column-reverse;
      flex: 1 40%;
    }
    // display: inline-block;
  }

  &-tabs__item {
    position: relative;
    // width: 350px;
    height: 185px;
    background: #ffffff;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.04);
    border-radius: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  &-tabs__sphere {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #edf4e7;
    border-radius: 100%;
  }

  &-tabs__item-img {
    width: 40%;
    height: 75%;
    position: absolute;
    right: -15%;
    bottom: -14%;
    filter: brightness(0) saturate(100%) invert(92%) sepia(10%) saturate(280%)
      hue-rotate(59deg) brightness(108%) contrast(91%);
  }

  &-tabs__content {
    p {
      margin-top: 10px;
      color: #262626;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
