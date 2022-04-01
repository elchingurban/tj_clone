<template>
    <VueResizable
        fitParent
        :active="['b']"
        :minHeight="resizableMinHeight"
        :maxHeight="resizableMaxHeight"
        width="100%"
        @resize:end="onEnd"
    >
        <div class="map">
            <MglMap
                :accessToken="mapToken"
                :mapStyle="mapStyle"
                @load="onMapLoaded"
                @map-init="mapInitialized"
            >
                <!-- Navigation Control -->
                <MglNavigationControl position="top-right" />

                <!-- Marker -->
                <MglMarker
                    v-for="(point, index) in points"
                    :key="index"
                    :coordinates="[point.coordinates.longitude, point.coordinates.latitude]"
                    color="blue"
                    anchor="bottom"
                    draggable
                    @dragend="pointDragged({ ...$event }, index)"
                >
                    <template slot="marker">
                        <CustomMarker
                            :text="index + 1"
                            :data-index="index"
                            :type="point.command"
                            @click="pointClicked($event, index)"
                            @dblclick="pointDblclicked($event, index)"
                        />
                    </template>
                </MglMarker>

                <!-- GeoJSON Layer -->
                <MglGeojsonLayer
                    :sourceId="geoJsonSource.data.id"
                    :source="geoJsonSource"
                    layerId="somethingSomething"
                    :layer="geoJsonLayer"
                />

                <!-- <mapbox
                    :access-token="mapToken"
                    :map-options="{
                        style: MAPBOX_STYLE_SATELLITE,
                        zoom: 3,
                    }"
                    :geolocate-control="{
                        show: true,
                        position: 'top-left',
                    }"
                    @map-load="loaded"
                    @map-zoomend="zoomend"
                    @map-click:points="clicked"
                    @geolocate-error="geolocateError"
                    @geolocate-geolocate="geolocate"
                /> -->

                <!-- Home Location Marker -->
                <MglMarker
                    v-if="droneHomeLocation.length"
                    :coordinates="droneHomeLocation"
                    anchor="bottom"
                    :draggable="false"
                >
                    <template slot="marker">
                        <CustomMarker
                            color="black"
                        >
                            <template v-slot:icon>
                                <HomeIcon
                                    size="16"
                                    title="Home"
                                    color="#fff"
                                />
                            </template>
                        </CustomMarker>
                    </template>
                </MglMarker>
            </MglMap>

            <!-- <MapboxDraw></MapboxDraw> -->

            <!-- Context menu -->
            <ContextMenu ref="context" />

            <!-- Edit point -->
            <EditPoint :pointIndex="editablePointIndex" />
        </div>
    </VueResizable>
</template>

<script>
import Vue from 'vue';
import {
    MglMap,
    MglNavigationControl,
    MglMarker,
    MglGeojsonLayer,
} from 'vue-mapbox';
import VueResizable from 'vue-resizable';

// * For drawing polygon
import Mapbox from 'mapbox-gl-vue';
import { MapboxDraw } from "@mapbox/mapbox-gl-draw";

import { MAPBOX_TOKEN, MAPBOX_STYLE_SATELLITE } from '@/core/constants.js';
import { swal } from '@/core/popups.js';
import { $number_input } from '@/core/popup_options.js';
import { Marker } from '@/components';
import { HomeIcon } from 'vue-feather-icons';

import ContextMenu from './ContextMenu';
import EditPoint from './EditPoint';

export default {
    name: 'FlightPlanMap',
    components: {
        MglMap,
        MglNavigationControl,
        MglMarker,
        MglGeojsonLayer,
        CustomMarker: Marker,
        ContextMenu,
        EditPoint,
        VueResizable,
        HomeIcon,
        Mapbox,
    },
    data() {
        return {
            editablePointIndex: null,
            resizable: {
                minHeightPercent: 0,
                maxHeightPercent: 75, //Upload mission menu height
            },
        };
    },
    created() {
        Vue.prototype.$flightPlanMap = null;
    },
    methods: {
        mapInitialized(map) {
            const Draw = new MapboxDraw();
            map.addControl(Draw);
        },
        onMapLoaded(event) {
            this.$flightPlanMap = event.map;

            // Add point
            this.$flightPlanMap.on('click', this.addPoint);

            // Context menu
            this.$flightPlanMap.on('contextmenu', this.handleContextMenu);

            // const draw = new MapboxDraw({
            //     displayControlsDefault: true,
            //     controls: {
            //     polygon: true,
            //     trash: true
            //     },
            //     // defaultMode: 'draw_polygon'
            // });

        },
        addPoint({ lngLat }) {
            let altitude = 0;

            if (this.points.length === 0) {
                this.openAltitudePopup();
            } else {
                altitude = this.points[this.points.length - 1].altitude;
            }

            this.$store.dispatch('addPoint', {
                altitude,
                coordinates: {
                    longitude: lngLat.lng,
                    latitude: lngLat.lat,
                },
            });
        },
        pointDragged({ marker }, index) {
            const payload = {
                index,
                coordinates: {
                    longitude: marker._lngLat.lng,
                    latitude: marker._lngLat.lat,
                },
            };

            this.$store.dispatch('updatePoint', payload);
        },
        pointClicked(e, pointIndex) {
            e.stopPropagation();
            this.$store.dispatch('selectPoint', pointIndex);
        },
        pointDblclicked(e, pointIndex) {
            this.editablePointIndex = pointIndex;
            this.$moodal.editPoint.show();
        },
        handleContextMenu(event) {
            this.$refs.context.open(event);
        },
        openAltitudePopup() {
            swal.fire(
                $number_input({
                    title: 'Enter altitude',
                    inputValue: 10,
                }),
            ).then(({ value }) => {
                this.updatePoint(0, { altitude: value });
            });
        },
        updatePoint(index, values) {
            const data = {
                index: 0,
                ...values,
            };
            this.$store.dispatch('updatePoint', data);
        },
        onEnd() {
            this.$flightPlanMap.resize();
        },
    },
    computed: {
        mapToken() {
            return MAPBOX_TOKEN;
        },
        mapStyle() {
            return MAPBOX_STYLE_SATELLITE;
        },
        points: {
            get() {
                return this.$store.state.flightPlan.points;
            },
        },
        geoJsonSource() {
            return this.$store.state.flightPlan.dronePath.geoJsonSource;
        },
        geoJsonLayer() {
            return this.$store.state.flightPlan.dronePath.geoJsonLayer;
        },
        droneInitialLocation() {
            return this.$store.state.flightData.droneInitialLocation;
        },
        resizableMinHeight() {
            return (
                (window.outerHeight - 80) *
                (this.resizable.minHeightPercent / 100)
            );
        },
        resizableMaxHeight() {
            return (
                (window.outerHeight - 80) *
                (this.resizable.maxHeightPercent / 100)
            );
        },
        droneHomeLocation() {
            return this.$store.state.flightData.droneHomeLocation;
        },
    },
    watch: {
        droneInitialLocation(coordinates) {
            this.$flightPlanMap.panTo(coordinates);
        },
        $route(to) {
            if (to.name === 'flightPlan') {
                this.$flightPlanMap.resize();
            }
        },
    },
};
</script>
