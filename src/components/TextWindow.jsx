import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';


export default function TextWindow(props) {
  const {messages} = props;

  return (
    <Col id="InfoText" md={8}>
      {messages.map((m) => {
        return (
          <>
            <Row className="space-up-top">{m}</Row>
            <hr />
          </>
        )
      })}
    </Col>
    )
};