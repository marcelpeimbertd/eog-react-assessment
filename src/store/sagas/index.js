import WeatherSagas from "./Weather";
import MetricsSagas from "./Metrics";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas, ...MetricsSagas];
