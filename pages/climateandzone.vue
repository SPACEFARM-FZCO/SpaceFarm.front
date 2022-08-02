<template>
  <div class="settings" v-if="response">
    <p class="settings-par">Climate settings</p>
    <div class="settings-climate">
      <div class="settings-climate__wrapper">
        <div class="settings-climate__item">
          <div class="settings-climate__sphere">
            <img src="/icons/Daylight.svg" />
          </div>
          <div class="settings-climate__content">
            <span> Daylight temperature </span>
            <p>{{ response.day_temp }}С</p>
          </div>
          <img class="settings-climate__item-img" src="/icons/Daylight.svg" />
        </div>
      </div>
      <div class="settings-climate__wrapper">
        <div class="settings-climate__item">
          <div class="settings-climate__sphere">
            <img src="/icons/Night.svg" />
          </div>
          <div class="settings-climate__content">
            <span> Night temperature </span>
            <p>{{ response.night_temp }}С</p>
          </div>
          <img class="settings-climate__item-img" src="/icons/Night.svg" />
        </div>
      </div>
      <div class="settings-climate__wrapper">
        <div class="settings-climate__item">
          <div class="settings-climate__sphere">
            <img src="/icons/C02.svg" />
          </div>
          <div class="settings-climate__content">
            <span> CO2 range </span>
            <p>{{ response.co2_range }}</p>
          </div>
          <img class="settings-climate__item-img" src="/icons/C02.svg" />
        </div>
      </div>
      <div class="settings-climate__wrapper">
        <div class="settings-climate__item">
          <div class="settings-climate__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="settings-climate__content">
            <span> Humidity range </span>
            <p>{{ response.humidity_range }} %</p>
          </div>
          <img class="settings-climate__item-img" src="/icons/Humidity.svg" />
        </div>
      </div>
    </div>
    <p class="settings-par">Solution settings</p>
    <div class="settings-solution">
      <div class="settings-solution__wrapper">
        <div class="settings-solution__item">
          <div class="settings-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="settings-solution__content">
            <span> РН range </span>
            <p>{{ response.ph_range }}</p>
          </div>
        </div>
      </div>
      <div class="settings-solution__wrapper">
        <div class="settings-solution__item">
          <div class="settings-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="settings-solution__content">
            <span> ЕС range </span>
            <p>{{ response.ec_range }}</p>
          </div>
        </div>
      </div>
      <div class="settings-solution__wrapper">
        <div class="settings-solution__item">
          <div class="settings-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="settings-solution__content">
            <span> Nutrient doses </span>
            <p>{{ response.ec_range }}</p>
          </div>
        </div>
      </div>
      <div class="settings-solution__wrapper">
        <div class="settings-solution__item">
          <div class="settings-solution__sphere">
            <img src="/icons/Humidity.svg" />
          </div>
          <div class="settings-solution__content">
            <span> Tank volume </span>
            <p>{{ response.volume_tank }}</p>
          </div>
        </div>
      </div>
      <div class="settings-solution__wrapper">
        <div class="settings-solution__item">
          <div class="settings-solution__sphere">
            <img src="/icons/Pump.svg" />
          </div>
          <div class="settings-solution__content">
            <span> Pump speed </span>
            <p>{{ response.speedpomp }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-crud">
      <div @click="addZone()" class="settings-crud_add">
        <div class="settings-crud_add-plus">
          <span> + </span>
        </div>
        <p>Add zone</p>
      </div>
      <form
        @submit.prevent="saveZone(item)"
        v-for="(item, id) in zones"
        :key="id"
        class="settings-crud__item"
      >
        <!-- @submit.prevent="saveZone(item)" -->
        <div class="settings-crud__item-header">
          <span>Zones settings</span>
          <div>
            <button
              @click="deleteZone(item.modbus_id, item.number_zone)"
              style="
                background: #ffe6e6;
                color: rgb(255 153 153);
                margin-right: 10px;
              "
              type="button"
            >
              <i class="bx bx-trash"></i>
              <span>Delete</span>
            </button>
            <!-- <button @click="openChangeModal()"> -->
            <button type="submit">
              <i class="bx bx-save"></i>
              <!-- <span>Change</span> -->
              <span>Save</span>
            </button>
          </div>
        </div>
        <div class="settings-crud__inputs">
          <input type="text" placeholder="Name" v-model="item.name" />
          <input
            type="number"
            placeholder="Number zone"
            v-model="item.number_zone"
          />
          <input
            type="number"
            placeholder="Modbus ID"
            v-model="item.modbus_id"
          />
          <!-- <p>
            <span>
              {{ item.name }}
            </span>
            <span> Name </span>
          </p>
          <p>
            <span>
              {{ item.number_zone }}
            </span>
            <span> Number zone </span>
          </p>
          <p>
            <span>{{ item.modbus_id }}</span> <span>Modbus ID</span>
          </p> -->
        </div>
        <div class="settings-crud__time-wrapper">
          <div
            @click="
              daylight_schedule_modal = true;
              current_zone = { zone: item, id: id };
            "
            class="settings-crud__time-item"
          >
            <div>
              <img src="/icons/Sun.svg" />
            </div>
            <div>
              <p>Daylight schedule</p>
              <span>{{
                item.daylight_schedule
                  ? item.daylight_schedule
                  : "please, add time"
              }}</span>
            </div>
          </div>
          <div
            @click="
              watering_schedule_modal = true;
              current_zone = { zone: item, id: id };
            "
            class="settings-crud__time-item"
          >
            <div>
              <img src="/icons/Waterdrop.svg" />
            </div>
            <div>
              <p>Watering schedule</p>
              <span>{{
                item.watering_schedule
                  ? item.watering_schedule
                  : "please, add time"
              }}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <Modal
      title="Daylight schedule"
      v-if="daylight_schedule_modal"
      @close="closeDaylightShedule()"
    >
      <template #content>
        <form @submit.prevent="saveDaylightSchedule()">
          Start
          <input required type="time" v-model="daylight_schedule_start" />
          End
          <input required type="time" v-model="daylight_schedule_end" />

          <button type="submit" style="width: 100%">save</button>
        </form>
      </template>
    </Modal>
    <Modal
      title="Watering schedule"
      v-if="watering_schedule_modal"
      @close="watering_schedule_modal = false"
    >
      <template #content>
        <div style="display: flex; gap: 20px">
          <button
            type="button"
            style="width: 100%"
            @click="watering_schedule_type = 'Individual'"
          >
            Individual
          </button>
          <button
            type="button"
            style="width: 100%"
            @click="watering_schedule_type = 'Cycle'"
          >
            Cycle
          </button>
        </div>

        <form
          v-if="watering_schedule_type === 'Individual'"
          @submit.prevent="saveWateringSchedule()"
          style="margin-top: 20px"
        >
          <div
            id="watering_schedule_modal"
            style="max-height: 290px; overflow: auto"
          >
            <div
              v-for="(item, id) in watering_schedule_list"
              :key="id"
              style="display: flex; gap: 20px"
            >
              <div style="width: 100%">
                <span>Start</span>
                <input v-model="item.start" required type="time" />
              </div>
              <div style="width: 100%">
                <span>End</span>
                <input v-model="item.end" required type="time" />
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 20px">
            <button
              type="button"
              style="width: 100%"
              @click="addWateringShedule()"
            >
              Add
            </button>
            <button
              type="submit"
              style="width: 100%"
              v-if="watering_schedule_list.length > 0"
            >
              Save
            </button>
          </div>
        </form>
        <form
          v-if="watering_schedule_type === 'Cycle'"
          @submit.prevent="saveWateringSchedule()"
          style="margin-top: 20px"
        >
          <div style="display: flex; gap: 20px">
            <div style="width: 100%">
              <span>Interval</span>
              <input
                v-model="watering_schedule_cycle.interval"
                required
                type="number"
              />
            </div>
            <div style="width: 100%">
              <span>Duration</span>
              <input
                v-model="watering_schedule_cycle.duration"
                required
                type="number"
              />
            </div>
          </div>
          <button type="submit" style="width: 100%">Save</button>
        </form>
        <div></div>
      </template>
    </Modal>

    <!-- <Modal
      title="Zone settings"
      v-if="change_zone_modal"
      @close="change_zone_modal = false"
    >
      <template #content>
        <form class="settings-form">
          <div class="settings-form__main">
            <input
              required
              v-model="zone.name"
              type="text"
              placeholder="Name"
            />
            <input
              v-model="zone.number_zone"
              required
              type="number"
              placeholder="Number zone"
            />
            <input
              required
              v-model="zone.modbus_id"
              type="number"
              placeholder="Modbus ID"
            />
          </div>
          Start
          <input required type="time" v-model="daylight_schedule_start" />
          End
          <input required type="time" v-model="daylight_schedule_end" />

          <button type="submit" style="width: 100%">save</button>
        </form>
      </template>
    </Modal> -->
  </div>
</template>

<script>
import { IMaskDirective } from "vue-imask";

export default {
  middleware: ["auth"],
  directives: {
    imask: IMaskDirective,
  },
  data() {
    return {
      zone: {
        name: null,
        number_zone: null,
        modbus_id: null,
      },
      change_zone_modal: false,

      current_zone: null,

      daylight_schedule_modal: false,
      daylight_schedule_mask: {
        mask: "00:00 - 00:00",
        lazy: false,
      },
      daylight_schedule_start: null,
      daylight_schedule_end: null,

      watering_schedule_modal: false,
      watering_schedule_type: null,
      watering_schedule_cycle: {
        interval: null,
        duration: null,
      },
      watering_schedule_list: [],

      response: null,
      zones: null,
    };
  },
  fetchOnServer: false,
  async fetch() {
    this.getData();
  },
  methods: {
    openChangeModal() {
      this.change_zone_modal = true;
    },
    getData() {
      this.$axios
        .$get("/winrenboard/climatezonesettings")
        .then((res) => {
          this.response = res;
          this.zones = res.zones;
          console.log(this.zones);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveZone(item) {
      this.$axios
        .$post("/winrenboard/zones", item)
        .then((res) => {
          this.getData();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteZone(modbus_id, number_zone) {
      this.$axios
        .$post("/winrenboard/delete_zones", {
          modbus_id: modbus_id,
          number_zone: number_zone,
        })
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addZone() {
      this.zones.unshift({
        daylight_schedule: null,
        modbus_id: null,
        name: null,
        number_zone: null,
        watering_schedule: null,
      });
    },

    saveDaylightSchedule() {
      this.zones.forEach((zone, id) => {
        if (id == this.current_zone.id) {
          zone.daylight_schedule = `${this.daylight_schedule_start} - ${this.daylight_schedule_end}`;
        }
      });
      this.closeDaylightShedule();
    },
    closeDaylightShedule() {
      this.daylight_schedule_modal = false;
      this.daylight_schedule_start = null;
      this.daylight_schedule_end = null;
    },

    addWateringShedule() {
      this.watering_schedule_list.unshift({
        start: null,
        end: null,
      });
    },
    saveWateringSchedule() {
      this.watering_schedule_modal = false;
      this.zones.forEach((zone, id) => {
        if (id == this.current_zone.id) {
          if (this.watering_schedule_type === "Individual") {
            zone.watering_schedule = this.watering_schedule_list;
          }
          if (this.watering_schedule_type === "Cycle") {
            zone.watering_schedule = this.watering_schedule_cycle;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.settings {
  &-par {
    margin-top: 20px;
    color: #4d4d4d;
  }

  &-climate {
    display: flex;
    padding: 20px 0;
    overflow: auto;
    white-space: nowrap;
  }

  &-climate__wrapper {
    display: inline-block;
  }

  &-climate__item {
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

  &-climate__sphere {
    width: 40px;
    height: 40px;
    background: #edf4e7;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-climate__item-img {
    width: 45%;
    height: 60%;
    position: absolute;
    right: -10%;
    bottom: -14%;
    filter: brightness(0) saturate(100%) invert(92%) sepia(10%) saturate(280%)
      hue-rotate(59deg) brightness(108%) contrast(91%);
  }

  &-climate__content {
    p {
      margin-top: 10px;
      color: #262626;
      font-size: 20px;
      font-weight: 500;
    }
  }

  &-solution {
    display: flex;
    padding: 20px 0;
    overflow: auto;
    white-space: nowrap;
  }

  &-solution__wrapper {
    display: inline-block;
  }

  &-solution__item {
    width: 197px;
    height: 175px;
    background: #ffffff;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.04);
    border-radius: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
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

  &-solution__content {
    p {
      margin-top: 10px;
      color: #262626;
      font-size: 20px;
      font-weight: 500;
    }
  }

  &-crud {
    display: flex;
    margin-top: 30px;
    padding-bottom: 20px;
    overflow: auto;
    white-space: nowrap;
    // &::-webkit-scrollbar {
    //   display: none;
    // }

    @include less-than(tablet) {
      display: block;
      overflow: hidden;
      padding-bottom: 0px;
    }
  }

  &-crud__item {
    background: #ffffff;
    box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.02);
    border-radius: 25px;
    padding: 20px;
    margin-right: 20px;
    @include less-than(tablet) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  &-crud__item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 20px;
      font-weight: 500;
    }
    button {
      padding: 10px 30px;
      background: #edf4e7;
      border-radius: 30px;
      color: #77a648;
      cursor: pointer;
      span {
        font-size: 14px;
        font-weight: 400;
      }
      i {
        display: none;
      }
      @include less-than(tablet) {
        padding: 10px 20px;
        span {
          display: none;
        }
        i {
          display: block;
        }
      }
    }
  }

  &-crud__inputs {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    @include less-than(tablet) {
      flex-direction: column;
    }

    input {
      display: flex;
      flex: 1;
      justify-content: space-between;
      width: 200px;
      padding: 10px 20px;
      background: #f2f2f2;
      border-radius: 10px;
      @include less-than(tablet) {
        width: 100%;
      }

      span {
        &:nth-last-child(1) {
          opacity: 0.5;
        }
      }
    }
  }

  &-crud__time-wrapper {
    margin-top: 20px;
    background: #f9f9f9;
    border-radius: 20px;
    padding: 20px;
  }

  &-crud__time-item:last-child {
    border-bottom: none;
    img {
      margin-left: 2px;
    }
  }

  &-crud__time-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    img {
      margin-right: 14px;
    }
    p {
      font-size: 14px;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      color: #767676;
      padding: 10px 0;
      width: 100%;
    }
  }

  &-crud_add {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 50px;
    min-height: 100%;
    background: #f2f2f2;
    border-radius: 25px;
    cursor: pointer;
    @include less-than(tablet) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  &-crud_add-plus {
    width: 26px;
    height: 26px;
    border-radius: 100%;
    background: #cacaca;
    color: #6d6d6d;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-top: -3px;
    }
  }

  &-form {
  }

  &-form__main {
    display: flex;
    input {
      &:nth-child(2) {
        margin-left: 10px;
        margin-right: 10px;
      }
      flex: 1;
    }
  }
}
</style>
