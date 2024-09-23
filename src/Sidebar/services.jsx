import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./services.css";
import waterAnalysis from "./../assets/water-analysis.jpeg";
import intrams from "./../assets/intrams.jpeg";
import vaccination from "./../assets/vaccination2.jpeg";
import xray from "./../assets/xray.jpeg";
import dental from "./../assets/dental.jpeg";
import consultation from "./../assets/consultation.jpeg";
import drug from "./../assets/drug.jpeg";
import medical from "./../assets/medical.jpeg";

const servicesData = [
  {
    title: "Vaccinations",
    description:
      "The clinic administers essential vaccines to students as part of routine immunization programs. This helps prevent outbreaks of common infectious diseases. Records are kept for compliance with health regulations.",
    image: vaccination,
  },
  {
    title: "Nurses on Duty",
    description:
      "Nurses are available during school events, field trips, and athletic activities to provide first aid and manage any medical emergencies. Their presence ensures immediate medical attention is available when needed.",
    image: intrams,
  },
  {
    title: "Chest X-ray",
    description:
      "Routine chest X-rays are conducted to screen for tuberculosis or other respiratory conditions. This helps in early detection and timely intervention for respiratory issues.",
    image: xray,
  },
  {
    title: "Water Analysis",
    description:
      "Regular water testing is conducted to ensure the safety and quality of water used in the clinic and throughout the school. This helps prevent waterborne diseases and ensures compliance with health standards.",
    image: waterAnalysis,
  },
  {
    title: "Drug Testing",
    description:
      "The clinic performs drug testing as needed, especially in cases where there is a suspicion of substance abuse. Results are confidential and part of student wellness programs.",
    image: drug,
  },
  {
    title: "Consultations",
    description:
      " Medical consultations are provided for students who need health advice or treatment for minor illnesses and injuries. This service also includes referrals for specialized care when necessary.",
    image: consultation,
  },
  {
    title: "Dental Check-Up",
    description:
      "Routine dental check-ups are conducted to maintain students’ oral health, with referrals to dentists for more extensive care. Preventive care and basic dental advice are also offered.",
    image: dental,
  },
  {
    title: "Medical Check-Up",
    description:
      "General health check-ups are performed to monitor students' overall well-being. These screenings help detect any underlying health issues early and ensure students stay healthy.",
    image: medical,
  },
];

const ExpandMore = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

ExpandMore.propTypes = {
  expand: PropTypes.bool.isRequired, // Prop validation in place of TypeScript
};

function Services() {
  const [expanded, setExpanded] = React.useState(null); // Store expanded state for each card

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="services-page">
      {servicesData.map((service, index) => (
        <Card key={index} sx={{ maxWidth: 1300, marginBottom: "20px" }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {service.title}
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            height="400"
            image={service.image} // Use dynamic image from the data
            alt={service.title}
          />

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded === index}
              onClick={() => handleExpandClick(index)}
              aria-expanded={expanded === index}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded === index} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{service.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default Services;
