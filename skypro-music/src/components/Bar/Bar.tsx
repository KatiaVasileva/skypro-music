import Icon from "../Icon/Icon";
import styles from "./Bar.module.css";

function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
          <div className={styles.player}>
            <div className={styles.controls}>
              <Icon
                wrapperClass={styles.buttonPrev}
                iconClass={styles.buttonPrevSvg}
                name="icon-prev"
              />
              <Icon
                wrapperClass={styles.buttonPlay}
                iconClass={styles.buttonPlaySvg}
                name="icon-play"
              />
              <Icon
                wrapperClass={styles.buttonNext}
                iconClass={styles.buttonNextSvg}
                name="icon-next"
              />
              <Icon
                wrapperClass={styles.buttonRepeat}
                iconClass={styles.buttonRepeatSvg}
                name="icon-repeat"
              />
              <Icon
                wrapperClass={styles.buttonShuffle}
                iconClass={styles.buttonShuffleSvg}
                name="icon-shuffle"
              />
            </div>

            <div className={styles.trackPlay}>
              <div className={styles.trackPlayContainer}>
                <Icon
                  wrapperClass={styles.trackPlayImage}
                  iconClass={styles.trackPlayImageSvg}
                  name="icon-note"
                />
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
                <Icon
                  wrapperClass={styles.trackPlayLike}
                  iconClass={styles.trackPlayLikeSvg}
                  name="icon-like"
                />
                <Icon
                  wrapperClass={styles.trackPlayDislike}
                  iconClass={styles.trackPlayDislikeSvg}
                  name="icon-dislike"
                />
              </div>
            </div>
          </div>
          <div className={styles.volumeBlock}>
            <div className={styles.volumeContent}>
              <Icon
                wrapperClass={styles.volumeImage}
                iconClass={styles.volumeSvg}
                name="icon-volume"
              />
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
