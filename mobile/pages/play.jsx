import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { supabase } from "../supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostSingle } from "../components/post";
import { Navbar } from "../navbar";

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
        {userId ? (
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
        )}
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
