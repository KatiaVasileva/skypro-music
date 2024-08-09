import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";

function Main() {
  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock />
      <Sidebar />
    </main>
  );
}

export default Main;
