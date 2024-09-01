import Layout from "../../Components/Layout";
import Left from "../../Components/left";
import Navbar from "../../Components/Navbar";
import Right from "../../Components/right";
import Announcement from "./announcement";
import Welcome from "./Welcome";

function Home() {
  return (
    <Layout>
      <div>
        {/* <h1>This is Home</h1> */}
        <Navbar />
        <Left />

        {/* <Announcement />
      <Welcome /> */}
      </div>
    </Layout>
  );
}

export default Home;
