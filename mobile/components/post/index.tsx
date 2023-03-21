import { Video, ResizeMode } from "expo-av";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { TouchableWithoutFeedback } from "react-native";
import { supabase } from "../../supabase";

type Handles = {
  play: () => void;
  unload: () => void;
  stop: () => void;
};

type IVideo = {
  id: string;
  url: string;
};

type Props = {
  userId: string;
  item: IVideo;
};

export const PostSingle = forwardRef<Handles, Props>(
  ({ item, userId }, parentRef) => {
    const ref = useRef<any>(null);

    useImperativeHandle(parentRef, () => ({
      play,
      unload,
      stop,
    }));

    useEffect(() => {
      return () => {
        unload();
      };
    }, []);

    const play = async () => {
      if (ref.current == null) {
        return;
      }

      const status = await ref.current.getStatusAsync();
      if (status?.isPlaying) {
        return;
      }

      try {
        await ref.current.playAsync();
      } catch (e) {
        console.log(e);
      }
    };

    const stop = async () => {
      if (ref.current == null) {
        return;
      }

      const status = await ref.current.getStatusAsync();
      if (!status?.isPlaying) {
        return;
      }

      try {
        await ref.current.stopAsync();
      } catch (e) {
        console.log(e);
      }
    };

    const unload = async () => {
      if (ref.current == null) {
        return;
      }

      try {
        await ref.current.unloadAsync();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <TouchableWithoutFeedback
        onPress={async () => {
          const status = await ref.current.getStatusAsync();

          if (!status?.isPlaying) {
            // not playing
            await ref.current.playAsync();
          } else {
            await ref.current.pauseAsync();
          }
        }}
      >
        {/* <PostSingleOverlay user={user} post={item} /> */}
        <Video
          ref={ref}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping
          onPlaybackStatusUpdate={async (status) => {
            const { didJustFinish } = status as {
              didJustFinish: boolean;
              playableDurationMillis: number;
              positionMillis: number;
            };

            if (didJustFinish) {
              console.log("finished video");
              // get currentCoins
              const userProgress = await supabase
                .from("UserProgress")
                .select("*")
                .eq("userId", userId)
                .single();

              const progress = userProgress.data as
                | {
                    coins: number;
                    userId: string;
                  }
                | undefined;

              // add coins
              await supabase
                .from("UserProgress")
                .update({
                  coins: (progress?.coins ?? 0) + 1,
                })
                .eq("userId", userId);
            }
          }}
          source={{ uri: item.url }}
          // usePoster
          // posterSource={{ uri: item.media[1] }}
          // posterStyle={{ resizeMode: "cover", height: "100%" }}
        />
      </TouchableWithoutFeedback>
    );
  }
);

export default PostSingle;
