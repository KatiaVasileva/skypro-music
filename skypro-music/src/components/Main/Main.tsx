import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";
import { getAllTracks } from "@/api/tracksApi";
import { Track } from "@/types/Track.types";

async function Main() {
  try {
    const allTracks: Array<Track> = await getAllTracks();

    return (
      <main className={styles.main}>
        <Nav />
        <CenterBlock allTracks={allTracks} />
        <Sidebar />
      </main>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export default Main;
