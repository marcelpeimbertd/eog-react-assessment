import React from 'react';
import { connect } from 'react-redux';
import MapComponent from './MapComponent';
import Chart from './Chart';
import * as actions from '../store/actions';

class FetcherContainer extends React.Component {
    componentDidMount() {
        this.props.fetchMetrics();
        this.intervalId = setInterval(() => {
            this.props.fetchMetrics();
        }, 4000);
    }
    render() {
        const { metrics } = this.props;
        const dataChart = metrics.map(objMetric => {
            return ({
                time: +objMetric.timestamp,
                TF: +objMetric.metric,
            })
        }
        );
        return (
            <div>
                <MapComponent />
                <Chart data={dataChart} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    metrics: state.metrics.metrics,
});
const mapStateToDispatch = (dispatch) => ({
    fetchMetrics: () => dispatch({ type: actions.FETCH_METRICS }),
});

export default connect(mapStateToProps, mapStateToDispatch)(FetcherContainer);