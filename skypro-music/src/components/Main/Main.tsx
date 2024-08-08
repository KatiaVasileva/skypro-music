import Image from "next/image";
import playlist01 from "./img/playlist01.png";
import playlist02 from "./img/playlist02.png";
import playlist03 from "./img/playlist03.png";
import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";

function Main() {
  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock />

      <div className="main__sidebar sidebar">
        <div className="sidebar__personal">
          <p className="sidebar__personal-name">Sergey.Ivanov</p>
          <div className="sidebar__icon">
            <svg>
              <use xlinkHref="img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
        <div className="sidebar__block">
          <div className="sidebar__list">
            <div className="sidebar__item">
              <a className="sidebar__link" href="#">
                <Image
                  className="sidebar__img"
                  src={playlist01}
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </a>
            </div>
            <div className="sidebar__item">
              <a className="sidebar__link" href="#">
                <Image
                  className="sidebar__img"
                  src={playlist02}
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </a>
            </div>
            <div className="sidebar__item">
              <a className="sidebar__link" href="#">
                <Image
                  className="sidebar__img"
                  src={playlist03}
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
