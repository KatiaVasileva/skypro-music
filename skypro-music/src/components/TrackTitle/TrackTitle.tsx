import Icon from "../Icon/Icon";
import styles from "./TrackTitle.module.css";
import classNames from "classnames";

function TrackTitle() {
  return (
    <div className={styles.contentTitle}>
      <div
        className={classNames(styles.playlistColumn, styles.playlistColumn01)}
      >
        Трек
      </div>
      <div
        className={classNames(styles.playlistColumn, styles.playlistColumn02)}
      >
        Исполнитель
      </div>
      <div
        className={classNames(styles.playlistColumn, styles.playlistColumn03)}
      >
        Альбом
      </div>
      <div
        className={classNames(styles.playlistColumn, styles.playlistColumn04)}
      >
        <Icon iconClass={styles.playlistTitleSvg} name="icon-watch" />
      </div>
    </div>
  );
}

export default TrackTitle;
