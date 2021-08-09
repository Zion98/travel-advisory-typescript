import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { CssBaseline, Grid } from "@material-ui/core";
import { getAllPlacesData, getWeatherData } from "./api";
export type Places = {
  name?: string;
  photo?: {
    images: {
      large: {
        url: string;
      };
    };
  };
  price_level?: string;
  ranking?: string;
  awards?: [
    {
      images: { small: string };
      display_name: string;
    }
  ];

  cuisine?: [
    {
      name: string;
    }
  ];
  address?: string;
  phone?: number;
  web_url?: string;
  website?: string;
  latitude: string;
  longitude: string;
  rating: any;
  num_reviews: any;
};
const App = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Places[]>([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });
  const [childClicked, setChildClicked] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [weatherData, setWeatherData] = useState<any>([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );
      getAllPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        console.log(data);
        setPlaces(
          data.filter((place: Places) => place.name && place.num_reviews > 0)
        );
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [bounds, type]);

  useEffect(() => {
    const filteredByRatings = places.filter((place) => place?.rating > rating);

    setFilteredPlaces(filteredByRatings);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            childClicked={childClicked}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
