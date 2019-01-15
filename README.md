## Create React App Visualization

I used Redux Saga as the specifications were established in the assignment, I had to learn this new library so it took me more time than I speculate.
I used Recharts because Plotly for React link was broke, also I had to learn Recharts.
I used Google Maps Component to have more native behavior in the map, I used the get started example to run the map.

In code I created 3 Components, one for the chart, one for the map, and one to wrap both in one component

The MapComponent is connected to the redux store to get the latitude and longitude of the drone to display in the marker where it is.

The FetcherContainer which has both the MapComponent and the Chart Component, it is also connected to the store to get the array of metrics, after component Did Mount it will poll each 4 seconds new metrics with the setInterval and also pass the metrics to the Chart Component as data prop.

An extra thing I did in the watcher for metrics I connected the weather worker to have updated the header.