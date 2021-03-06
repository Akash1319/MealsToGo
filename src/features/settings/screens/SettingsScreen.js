import React, { useContext, useState } from "react";
import { SafeArea } from "../../../components/utils/SafeAreaComponent";
import { AuthenticationContext } from "../../../services/authentication/authenticationContext";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/Spacer";
import { Text } from "../../../components/typography/Text";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const getProfilePicture = async (user) => {
    const photoUri = await AsyncStorage.getItem(`${user.uid}-photo`);
    setProfilePhoto(photoUri);
  };

  useFocusEffect(() => {
    getProfilePicture(user);
  }, [user]);

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!profilePhoto ? (
            <Avatar.Icon icon="human" size={180} backgroundColor="blue" />
          ) : (
            <Avatar.Image
              source={{ uri: photoUri }}
              size={180}
              backgroundColor="blue"
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size={"large"}>
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="blue" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
