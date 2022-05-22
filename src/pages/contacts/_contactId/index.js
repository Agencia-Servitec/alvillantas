import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Timeline from "antd/lib/timeline";
import { useParams } from "react-router";

export const Contact = () => {
  const { contactId } = useParams();

  // const [contact, , errorContact] = useDocumentDataOnce(
  //   firestore.collection("contacts").doc(contactId)
  // );
  //
  // console.log("contact->", contact);

  return (
    <Row>
      <Col span={24}>
        <h1>{contactId}</h1>
      </Col>
      <Col span={24}>
        <Timeline mode="alternate">
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">
            Solve initial network problems 2015-09-01
          </Timeline.Item>
          <Timeline.Item>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Timeline.Item>
          <Timeline.Item color="red">
            Network problems being solved 2015-09-01
          </Timeline.Item>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        </Timeline>
      </Col>
    </Row>
  );
};
