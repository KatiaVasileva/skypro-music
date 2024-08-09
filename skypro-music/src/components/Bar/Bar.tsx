import Sprite from "../Icon/IconSearch";
import styles from "./Bar.module.css";

function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
          <div className={styles.player}>
            <div className={styles.controls}>
              <Sprite />
              <div className={styles.buttonPrev}>
                <svg className={styles.buttonPrevSvg}>
                  <use href="#icon-prev"></use>
                </svg>
              </div>
              <div className={styles.buttonPlay}>
                <svg className={styles.buttonPlaySvg}>
                  <use href="#icon-play"></use>
                </svg>
              </div>
              <div className={styles.buttonNext}>
                <svg className={styles.buttonNextSvg}>
                  <use href="#icon-next"></use>
                </svg>
              </div>
              <div className="player__btn-repeat _btn-icon">
                <svg className="player__btn-repeat-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className="player__btn-shuffle _btn-icon">
                <svg className="player__btn-shuffle-svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className="player__track-play track-play">
              <div className="track-play__contain">
                <div className="track-play__image">
                  <svg className="track-play__svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track-play__author">
                  <a className="track-play__author-link" href="http://">
                    Ты та...
                  </a>
                </div>
                <div className="track-play__album">
                  <a className="track-play__album-link" href="http://">
                    Баста
                  </a>
                </div>
              </div>

              <div className="track-play__like-dis">
                <div className="track-play__like _btn-icon">
                  <svg className="track-play__like-svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className="track-play__dislike _btn-icon">
                  <svg className="track-play__dislike-svg">
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bar__volume-block volume">
            <div className="volume__content">
              <div className="volume__image">
                <svg className="volume__svg">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className="volume__progress _btn">
                <input
                  className="volume__progress-line _btn"
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bar;
