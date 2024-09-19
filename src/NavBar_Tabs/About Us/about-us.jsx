import orgchart from "./../../assets/orgchart.jpg";
import "./about-us.css";

function AboutUs() {
  return (
    <div className="about-page">
      <h3>HEALTH SERVICE DEPARTMENT-DASMARIÑAS</h3>
      <div className="orgchart-img">
        <img src={orgchart} alt="Organization Chart" className="orgchart" />
      </div>
    </div>
  );
}

export default AboutUs;
