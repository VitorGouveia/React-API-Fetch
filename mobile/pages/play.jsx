import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Text,
  Web,
  Linking,
  Touchable,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { supabase } from "../supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostSingle } from "../components/post";
import { Navbar } from "../navbar";
import { TouchableOpacity } from "react-native-gesture-handler";

const useMaterialNavBarHeight = () => {
  const { bottom, top } = useSafeAreaInsets();
  // console.log({ bottom, top });
  // return bottom - Math.floor(top) + (withoutBottomTabs ? 0 : 54);
  return 60;
};

const _posts = new Array(500).fill(0).map((_, index) => ({
  id: index + 1,
  url: "https://github.com/VitorGouveia/test/raw/master/SnapSave.io-PyTorch%20in%20100%20Seconds-(144p).mp4",
}));

// const ViewTypes = {
//   FULL: 0,
//   HALF_LEFT: 1,
//   HALF_RIGHT: 2,
// };

// const Post = ({ url }: { url: string }) => {
//   const [paused, setPaused] = useState(true);

//   const togglePlay = () => {
//     setPaused((state) => !state);
//   };

//   const feedItemHeight =
//     Dimensions.get("screen").height - useMaterialNavBarHeight(false);

//   return (
//     <VisibilitySensor
//       onChange={(visible) => {
//         console.log(visible);
//       }}
//     >
//       <TouchableWithoutFeedback onPress={() => togglePlay()}>
//         <Video
//           shouldPlay={!paused}
//           style={{
//             height: feedItemHeight,
//             // position: "absolute",
//             // top: 0,
//             // left: 0,
//             // bottom: 0,
//             // right: 0,
//           }}
//           source={{
//             uri: "https://github.com/VitorGouveia/test/raw/master/SnapSave.io-PyTorch%20in%20100%20Seconds-(144p).mp4",
//           }}
//           resizeMode={ResizeMode.COVER}
//           isLooping
//         />
//       </TouchableWithoutFeedback>
//     </VisibilitySensor>
//   );
// };

export const Play = ({ navigation }) => {
  const [posts] = useState(_posts);
  const mediaRefs = useRef([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // check session and redirect to home
    const main = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        return navigation.navigate("Cadastro");
      }

      setUserId(data.session.user.id);
    };
    main();
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          // if (!profile) {
          //   setCurrentUserProfileItemInView(element.item.creator);
          // }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const feedItemHeight =
    Dimensions.get("screen").height - useMaterialNavBarHeight();

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: "100%",
          height: feedItemHeight,
        }}
      >
        <PostSingle
          item={item}
          userId={userId}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 20 }}>
          Se não possui o Tiktok, por favor baixe o tiktok
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
          onPress={async () => {
            const userProgress = await supabase
              .from("UserProgress")
              .select("*")
              .eq("userId", userId)
              .single();

            const progress = userProgress.data;

            await supabase
              .from("UserProgress")
              .update({
                coins: (progress?.coins ?? 0) + 5,
              })
              .eq("userId", userId);

            Linking.openURL("tiktok://");
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 50 }}>
            TikTok
          </Text>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
            }}
            source={require("../assets/tiktok-icon.png")}
          />
        </TouchableOpacity>
        {/* {userId ? (
          <FlatList
            data={posts}
            // windowSize={4}
            // initialNumToRender={0}
            // maxToRenderPerBatch={2}
            // removeClippedSubviews
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 0,
            // }}
            renderItem={renderItem}
            pagingEnabled
            keyExtractor={(item) => item.id}
            // decelerationRate={"normal"}
            onViewableItemsChanged={onViewableItemsChanged.current}
          />
        ) : (
          <Text>Carregando...</Text>
        )} */}
      </View>

      <Navbar navigation={navigation} />

      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  input: {
    width: "100%",
    color: "gray",
    height: 52,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
