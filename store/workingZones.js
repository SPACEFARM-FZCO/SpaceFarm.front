export const state = () => ({
  zones: 0,
});

export const mutations = {
  changeWorkingZones(state, zones) {
    state.zones = zones;
  },
};
