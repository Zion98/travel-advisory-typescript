import React from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

export interface PlaceProps {
  place: {
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
  selected: boolean;
  refProp: any;
}
const PlaceDetails = ({ place, selected, refProp }: PlaceProps) => {
  const classes = useStyles();
  if (selected)
    refProp?.current?.scrollInToView({ behaviour: "smooth", block: "start" });
  return (
    <Card>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo
            ? place?.photo?.images?.large.url
            : "'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'"
        }
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(place.rating)} readOnly />
          <Typography variant="subtitle1">
            Out of {place.num_reviews} reviews
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle1">
            Price
          </Typography>
          <Typography variant="subtitle1">{place.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle1">
            Ranking
          </Typography>
          <Typography variant="subtitle1">{place.ranking}</Typography>
        </Box>

        {place?.awards?.map((award) => {
          return (
            <Box my={1} display="flex" justifyContent="space-between">
              <img src={award?.images.small} alt={award.display_name} />

              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}{" "}
              </Typography>
            </Box>
          );
        })}

        {place?.cuisine?.map(({ name }) => {
          return (
            <Chip
              key={name}
              size="small"
              label={name}
              className={classes.chip}
            />
          );
        })}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
