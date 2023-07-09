import React, { memo, useEffect, useState, useCallback } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    MarkerF,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "../../redux/actions";
import Lottie from "lottie-react";
import animationData from "../../assets/location.json";
import SearchInput from "../SearchAutoComplete/SearchInput";
import { Card, Layout, Typography } from "antd";
import styles from "./styles";

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ["places"],
    });

    const dispatch = useDispatch();
    const [map, setMap] = useState(null);
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLng, setCurrentLng] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResult, setSearchResult] = useState(null);
    const [value, setValue] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [selectedPlaceData, setSelectedPlaceData] = useState(null);
    const places = useSelector((state) => state.historySearch[0]);

    const onLoadAutoComplete = (autocomplete) => {
        setSearchResult(autocomplete);
    };

    const onPlaceChanged = () => {
        if (searchResult != null) {
            const place = searchResult.getPlace();
            if (place.formatted_address === undefined) {
                console.log("this place does not exist");
            } else {
                setCurrentLat(place.geometry.location.lat());
                setCurrentLng(place.geometry.location.lng());
                setValue(place.name);
                setSelectedPlaceData(place);
                dispatch(saveSearch(place, { id: places.length + 1 }));
                setTriggerFetch(true);
            }
        }
    };

    const successCallback = (geolocation) => {
        setCurrentLat(geolocation.coords.latitude || 0);
        setCurrentLng(geolocation.coords.longitude || 0);
        setIsLoading(false);
    };

    const errorCallback = (error) => {
        setCurrentLat(3.1319);
        setCurrentLng(101.6841);
        setIsLoading(false);
        console.log(error);
    };

    const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Access the API
            navigator.geolocation.getCurrentPosition(
                successCallback,
                errorCallback,
                geolocationOptions
            );
        } else {
            console.log("Browser does not support the Geolocation API");
        }
    }, []);

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds({
                lat: currentLat,
                lng: currentLng,
            });
            map.fitBounds(bounds);
        }
    }, [map, currentLat, currentLng]);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <>
            {isLoading && (
                <Layout style={styles.loadingContainerStyle}>
                    <Card style={styles.loadingCardStyle}>
                        <Lottie animationData={animationData} loop={true} />
                    </Card>
                    <Typography style={styles.loadingTextStyle}>
                        Loading Map...
                    </Typography>
                </Layout>
            )}
            {!isLoading && (
                <>
                    <Autocomplete
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoadAutoComplete}
                    >
                        <SearchInput
                            value={value}
                            setValue={setValue}
                            setCurrentLat={setCurrentLat}
                            setCurrentLng={setCurrentLng}
                            triggerFetch={triggerFetch}
                            setTriggerFetch={setTriggerFetch}
                            selectedPlaceData={selectedPlaceData}
                            setSelectedPlaceData={setSelectedPlaceData}
                        />
                    </Autocomplete>
                    <GoogleMap
                        mapContainerStyle={styles.containerStyle}
                        center={{
                            lat: currentLat,
                            lng: currentLng,
                        }}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <MarkerF
                            position={{
                                lat: currentLat,
                                lng: currentLng,
                            }}
                        />
                    </GoogleMap>
                </>
            )}
        </>
    ) : (
        <></>
    );
};

export default memo(Maps);
