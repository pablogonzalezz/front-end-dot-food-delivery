import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const BlankLayout = ({ children, noFooter }) => (
  <Container>
    <Row>
      <Col
        className="d-flex justify-content-center"
        tag="main"
      >
        {children}
      </Col>
    </Row>
  </Container>
);

BlankLayout.propTypes = {
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

BlankLayout.defaultProps = {
  noFooter: false
};

export default BlankLayout;
