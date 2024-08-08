import Main from "@/components/Main/Main";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <body>
    <div className="wrapper">
      <div className="container">
        <Main></Main>
        <Bar></Bar>
        <Footer />
      </div>
    </div>
  </body>
  );
}
