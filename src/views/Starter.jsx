import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart.jsx";
import Feeds from "../components/dashboard/Feeds.jsx";
import ProjectTables from "../components/dashboard/ProjectTable.jsx";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Blog from "../components/dashboard/Blog.jsx";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useEffect } from "react";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        {/* <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col> */}
        <Col sm="6" lg="6" xl="5" xxl="4">
          {/* <Feeds /> */}
          <Button variant="outlined" onClick={() => navigate("/Bycountry")}>
            By Country
          </Button>
          <Button variant="outlined" onClick={() => navigate("/Bybudget")}>
            By Budget
          </Button>
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
