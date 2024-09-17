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
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      event.stopPropagation();

      if (!access) {
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
//   const dispatch = useAppDispatch();
//   const tokens = useAppSelector((state) => state.user.tokens);
//   const user = useAppSelector((state) => state.user.userState);
//   const likedTracks = useAppSelector((state) => state.track.myPlaylistState);

//   const isLiked = !!likedTracks.find((t) => t._id === track?._id);

//   async function handleLike(event: React.MouseEvent<HTMLElement>) {
//     event.stopPropagation();

//     if (!tokens || !user) {
//       alert("Нет авторизации");
//       return;
//     }

//     const fetchAction = isLiked ? removeTrackFromFavorite : addTrackInFavorite;
//     const storeAction = isLiked ? setDislike : setLike;

//     try {
//       fetchAction({ id: track?._id, access: tokens.access, });
//       if (track) {
//         dispatch(storeAction(track));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

  return { isLiked, handleLike };
};
