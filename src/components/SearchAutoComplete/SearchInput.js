import React, { useEffect, useState } from "react";
import {
    AutoComplete,
    Input,
    Card,
    Typography,
    Layout,
    Space,
    Tag,
    Button,
} from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistory, deleteSearch } from "../../redux/actions";
import styles from "./styles";

const SearchInput = ({
    value,
    setValue,
    setCurrentLat,
    setCurrentLng,
    triggerFetch,
    setTriggerFetch,
    selectedPlaceData,
    setSelectedPlaceData,
}) => {
    const places = useSelector((state) => state.historySearch[0]);
    // console.log("hellooooo", places);
    const dispatch = useDispatch();
    const [displaySearch, setDisplaySearch] = useState(false);

    useEffect(() => {
        dispatch(fetchHistory());
        setTriggerFetch(false);
    }, [dispatch, setTriggerFetch, triggerFetch]);

    const onChangeValue = (data) => {
        setValue(data);
        setDisplaySearch(false);
        if (data === "") {
            setSelectedPlaceData(null);
            setDisplaySearch(true);
        }
    };

    const renderOpeningHours = () => {
        const isOpen = selectedPlaceData?.opening_hours?.open_now;
        const color = isOpen ? "green" : "red";
        const text = isOpen ? "Open" : "Closed";
        return (
            <Space style={styles.types}>
                <Typography>Hours:</Typography>
                <Typography style={{ color: color }}>{text}</Typography>
            </Space>
        );
    };

    const renderTypes = () => {
        const types = selectedPlaceData?.types;

        if (types?.length === 0) return null;

        return (
            <Space wrap style={styles.types}>
                {types?.map((data) => (
                    <Tag>{data}</Tag>
                ))}
            </Space>
        );
    };

    const renderGoogleMapUrl = () => {
        const url = selectedPlaceData?.url;

        if (url?.length === 0) return null;
        return (
            <Button
                style={{ marginTop: "20px" }}
                href={url}
                target="_blank"
                type="primary"
            >
                View On Google Maps
            </Button>
        );
    };

    const handleClick = (lat, lng, name) => {
        setCurrentLat(lat);
        setCurrentLng(lng);
        setValue(name);
    };

    const selectedPlaces = (placeId) => {
        const selectedplace = places.filter(
            (place) => place.place_id === placeId
        )[0];
        setSelectedPlaceData(selectedplace);
    };

    const renderedOutput = places && (
        <div style={styles.previousSearchContainer}>
            {places.map((item) => (
                <div style={styles.previousSearchWrapper}>
                    <div
                        style={styles.closeiconWrapper}
                        onClick={() => {
                            dispatch(deleteSearch(item.id));
                            setTriggerFetch(true);
                        }}
                    >
                        <CloseCircleTwoTone />
                    </div>
                    <div
                        key={item.place_id}
                        onClick={() => {
                            handleClick(
                                item.geometry.location.lat,
                                item.geometry.location.lng,
                                item.name
                            );
                            selectedPlaces(item.place_id);
                        }}
                        style={styles.previousSearchCard}
                    >
                        {item.formatted_address}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Card
            style={{
                position: "absolute",
                zIndex: "9999",
                right: "40%",
                // top: "1%",
                backgroundColor: "transparent",
                borderColor: "transparent",
            }}
        >
            <AutoComplete
                popupMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                onFocus={() => {
                    value === "" && setDisplaySearch(true);
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setDisplaySearch(false);
                    }, 200);
                }}
                onChange={onChangeValue}
                value={value}
            >
                <Input.Search
                    size="large"
                    placeholder="Search Google Map"
                    enterButton
                />
            </AutoComplete>
            {displaySearch && renderedOutput}
            {selectedPlaceData !== null && (
                <Card style={styles.container} size="small">
                    <Layout style={styles.wrapper}>
                        <Typography style={styles.title}>
                            {selectedPlaceData?.name}
                        </Typography>
                        <Typography style={styles.subtitle}>
                            {selectedPlaceData?.formatted_address}
                        </Typography>
                        {renderOpeningHours()}
                        {renderTypes()}
                        {renderGoogleMapUrl()}
                    </Layout>
                </Card>
            )}
        </Card>
    );
};

export default SearchInput;
