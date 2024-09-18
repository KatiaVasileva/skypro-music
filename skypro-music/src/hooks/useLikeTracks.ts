import {
  addTrackInFavorite,
  getFavoriteTracks,
  removeTrackFromFavorite,
  setDislike,
  setLike,
} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";

export type LikeProps = {
  track: Track | undefined;
};

export const useLikeTrack = ({ track }: LikeProps) => {
    const access = useAppSelector((state) => state.user.tokens.access);
    const user = useAppSelector((state) => state.user.userState);
    const dispatch = useAppDispatch();
    const myPlaylistState = useAppSelector(
      (state) => state.track.myPlaylistState
    );
    const refresh = useAppSelector((state) => state.user.tokens.refresh);

    const isLiked = !!myPlaylistState.find(
      (element) => element._id === track?._id
    );

    const handleLike = async (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      event.stopPropagation();

      if (!access || !user) {
        alert("Необходимо зарегистрироваться");
        return;
      }

      try {
        if (isLiked) {
          await dispatch(
            removeTrackFromFavorite({
              id: track?._id,
              access: access,
              refresh: refresh,
            })
          );
          if (track) {
            dispatch(setDislike(track));
            dispatch(getFavoriteTracks({access: access, refresh: refresh}));
          }
        } else {
          await dispatch(
            addTrackInFavorite({
              id: track!._id,
              access: access,
              refresh: refresh,
            })
          );
          if (track) {
            dispatch(setLike(track));
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

  return { isLiked, handleLike };
};
