import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";
import { getAllTracks } from "@/api/tracksApi";

async function Main() {
  try {
    const data = await getAllTracks();
    const allTracks = data.data;
    return (
      <main className={styles.main}>
        <Nav />
        <CenterBlock allTracks={allTracks} />
        <Sidebar />
      </main>
    );
  } catch (error) {
    console.error(error);
  }
}

export default Main;
