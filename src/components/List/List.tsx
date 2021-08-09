import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
import { Places } from "../../App";
interface PlaceArr {
  places: any;
  childClicked: any;
  loading: boolean;
  rating: string;
  setRating: any;
  type: string;
  setType: any;
}
const List = ({
  places,
  childClicked,
  loading,
  rating,
  setRating,
  type,
  setType,
}: PlaceArr) => {
  const classes = useStyles();

  const [allRefs, setAllRefs] = useState([]);
  console.log(places.length);
  useEffect(() => {
    const refs: any = Array(places.length)
      .fill(places.length)
      .map((_, index) => allRefs[index] || createRef());

    setAllRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels and Attractions around you
      </Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size={"4rem"} />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e: React.ChangeEvent<{ name?: string; value: any }>) =>
                setType(e.target.value)
              }
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={type}
              onChange={(e: React.ChangeEvent<{ name?: string; value: any }>) =>
                setType(e.target.value)
              }
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place: Places, index: number) => {
              return (
                <Grid item key={index} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={childClicked == index}
                    refProp={allRefs[index]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;