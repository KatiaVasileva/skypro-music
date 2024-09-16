import {
  addTrackInFavorite,
  removeTrackFromFavorite,
  setDislike,
  setLike,
} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { getUserFromLocalStorage } from "@/utils/helpers";

export type LikeProps = {
  track: Track | undefined;
};

export const useLikeTrack = ({ track }: LikeProps) => {
  const access = useAppSelector((state) => state.user.tokens?.access);
  const dispatch = useAppDispatch();
  const myPlaylistState = useAppSelector(
    (state) => state.track.myPlaylistState
  );
    const isLiked = !!myPlaylistState.find(
    (element) => element._id === track?._id
  );

  const handleLike = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!access) {
      alert("Необходимо зарегистрироваться");
      return;
    }

    // if (access && myPlaylistState) {
    //   if (isLiked) {
    //     await dispatch(
    //       removeTrackFromFavorite({
    //         id: track._id,
    //         access: access,
    //         refresh: refreshToken ? refreshToken : "",
    //       })
    //     );
    //     dispatch(setDislike(track));
    //   } else {
    //     await dispatch(
    //       addTrackInFavorite({
    //         id: track._id,
    //         access: access,
    //         refresh: refreshToken ? refreshToken : "",
    //       })
    //     );
    //     dispatch(setLike(track));
    //   }
    // }

    try {
      if (isLiked && myPlaylistState) {
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
