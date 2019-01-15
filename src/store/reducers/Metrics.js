import * as actions from "../actions";

const initialState = {
    loading: false,
    metrics: [],
    latitude: null,
    longitude: null,
}

const startLoading = (state, action) => {
    return { ...state, loading: true };
};

const droneMetricsReceived = (state, action) => {
    const { metrics } = action;
    if (!metrics.length) return state;
    return {
        ...state,
        loading: false,
        metrics,
    }
};

const latlongReceived = (state, action) => {
    const { latitude, longitude } = action;
    return {
        ...state,
        latitude,
        longitude,
    }
};

const handlers = {
    [actions.FETCH_METRICS]: startLoading,
    [actions.DRONE_METRICS_RECEIVED]: droneMetricsReceived,
    [actions.FETCH_WEATHER]: latlongReceived,
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};