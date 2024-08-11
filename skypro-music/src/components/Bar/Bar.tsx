import styles from "./Bar.module.css";

function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
          <div className={styles.player}>
            <div className={styles.controls}>
              <div className={styles.buttonPrev}>
                <svg className={styles.buttonPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={styles.buttonPlay}>
                <svg className={styles.buttonPlaySvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                </svg>
              </div>
              <div className={styles.buttonNext}>
                <svg className={styles.buttonNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className={styles.buttonRepeat}>
                <svg className={styles.buttonRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={styles.buttonShuffle}>
                <svg className={styles.buttonShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.trackPlay}>
              <div className={styles.trackPlayContainer}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlayImageSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    Баста
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div className={styles.trackPlayLike}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayDislike}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.volumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={styles.volumeProgress}>
                <input
                  className={styles.volumeProgressLine}
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
