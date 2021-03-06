import React from "react";
import { SvgXml } from "react-native-svg";
import OpenIcon from "../../../../assets/open";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/Spacer";
import { Text } from "../../../components/typography/Text";
import {
  Icon,
  Rating,
  Info,
  Section,
  SectionEnd,
  Address,
  RestaurantCard,
  RestaurantCardCover,
} from "./RestaurantInfoStyles";
import { Favourite } from "../../../components/favourite/FavouriteComponent";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "some res",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "MG road",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SvgXml
                key={`star-${placeId}-${index}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPERORY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={OpenIcon} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
