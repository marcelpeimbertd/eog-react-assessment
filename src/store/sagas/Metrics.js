import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDrone() {
    const { error, data: metrics } = yield call(API.fetchMetrics);
    if (error) {
        console.log({ error });
        yield put({ type: actions.API_ERROR, code: error.code });
        yield cancel();
        return;
    }
    if (!metrics.length) {
        yield put({ type: actions.API_ERROR });
        yield cancel();
        return;
    }
    yield put({ type: actions.DRONE_METRICS_RECEIVED, metrics })
}

function* watchMetricsReceived(action){
    const { metrics } = action;
    const {latitude, longitude} = metrics[metrics.length -1];
    yield put({type: actions.FETCH_WEATHER, latitude, longitude});

}

function* watchAppLoad() {
    yield all([
        takeEvery(actions.FETCH_METRICS, watchFetchDrone),
        takeEvery(actions.DRONE_METRICS_RECEIVED, watchMetricsReceived),
    ]);
}


export default [watchAppLoad];