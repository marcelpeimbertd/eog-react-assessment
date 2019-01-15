import React from "react"
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    latitude: state.metrics.latitude,
    longitude: state.metrics.longitude,
});

const MyMapComponent = connect(mapStateToProps)(compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: props.latitude || 34.17022948486798, lng: props.longitude || -97.7334719854098 }}
        center={{ lat: +props.latitude || 34.17022948486798, lng: +props.longitude || -97.7334719854098 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: +props.latitude, lng: +props.longitude }} />}
    </GoogleMap>)
))

class MapComponent extends React.PureComponent {
        render() {
            return (
                <MyMapComponent
                    isMarkerShown={true}
                />
            )
        }
    }

export default MapComponent;