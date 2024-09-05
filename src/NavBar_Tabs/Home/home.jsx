import "./home.css";
import Right from "../../Components/right";

function Home() {
  return (
    <div className="home-page">
      <div className="welcome">
        <span className="hello">Hello, Jenine!</span>

        <div className="welcome-content">
          <h1>
            Welcome to Philippine Christian University Clinic! Have a healthy
            day :)
          </h1>
          <p>
            A distinctive Christian University integrating faith, character and
            service, transforming global Learners for enlightenment, leadership
            and human development in the 21st century.
          </p>
          <div className="buttons">
            <button className="learnMore">Learn More</button>
            <button className="upgrade">View Profile</button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
}

export default Home;
