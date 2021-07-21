import { Helmet } from "react-helmet-async";

const Title = ({ text }) => (
  <Helmet>
    <title>{text}</title>
  </Helmet>
);

export default Title;
