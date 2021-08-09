import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import mapStyles from "./mapStyles";
import { Places } from "../../App";

interface MapProps {
  setCoordinates: (value: { lat: 0; lng: 0 }) => void;
  setBounds: (value: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  }) => void;
  coordinates: {
    lat: number;
    lng: number;
  };
  setChildClicked: (value: string) => void;
  places: Places[];
  weatherData: any;
}
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}: MapProps) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `"${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"`,
        }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e: any) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index: number) => {
          return (
            <div key={index} className={classes.markerContainer}>
              {!isDesktop ? (
                <LocationOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={""} variant="subtitle2" gutterBottom>
                    {place?.name}
                  </Typography>

                  <img
                    src={
                      place?.photo
                        ? place?.photo?.images?.large.url
                        : "'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'"
                    }
                    className={classes.pointer}
                    alt=""
                  />

                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          );
        })}

        {weatherData?.list?.map(
          (data: { weather: { icon: string }[] }, index: number) => {
            return (
              <div key={index}>
                <img
                  height="100"
                  src={`https://openweatherap.org/img/w/${data?.weather[0].icon}.png`}
                />
              </div>
            );
          }
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
