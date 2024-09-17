import {
  addTrackInFavorite,
  removeTrackFromFavorite,
  setDislike,
  setLike,
} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { getAccessTokenFromLocalStorage } from "@/utils/helpers";

export type LikeProps = {
  track: Track | undefined;
};

export const useLikeTrack = ({ track }: LikeProps) => {
    const access = getAccessTokenFromLocalStorage();
    const user = useAppSelector((state) => state.user.userState);
    const dispatch = useAppDispatch();
    const myPlaylistState = useAppSelector(
      (state) => state.track.myPlaylistState
    );

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
            })
          );
          if (track) {
            dispatch(setDislike(track));
          }
        } else {
          await dispatch(
            addTrackInFavorite({
              id: track!._id,
              access: access,
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
