import React, { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Timeline from "antd/lib/timeline";
import { useParams } from "react-router";
import { firestore } from "../../../firebase";
import {
  useDocumentDataOnce,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { IconAction, notification, Spinner } from "../../../components/ui";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Divider from "antd/lib/divider";
import { orderBy } from "lodash";

export const Contact = () => {
  const { contactId } = useParams();

  const [contact, loadingContact, errorContact] = useDocumentDataOnce(
    firestore.collection("contacts").doc(contactId)
  );

  const [contacts = [], loadingContacts, errorContacts] = useCollectionData(
    contact
      ? firestore.collection("contacts").where("email", "==", contact?.email)
      : null
  );

  useEffect(() => {
    if (errorContact || errorContacts) return notification({ type: "error" });
  }, [errorContact, errorContacts]);

  const navigateWithBlankTo = (url) => window.open(url, "_blank");

  const viewContacts = () => orderBy(contacts, ["createAt"], ["desc"]);

  if (loadingContact || loadingContacts) return <Spinner fullscreen />;

  return (
    <>
      <Row>
        <Col span={8}>
          <Title level={3}>
            {`${contact.firstName} ${contact.lastName}`.toUpperCase()}
          </Title>
        </Col>
        <Col span={8} />
        <Col span={8} align="end">
          <Title level={5}>{contact.email.toUpperCase()}</Title>
          <WrapperSocials>
            <ul>
              <li>
                <IconAction
                  key={contact.id}
                  onClick={() =>
                    navigateWithBlankTo(
                      `https://wa.me/+51${contact.phoneNumber}`
                    )
                  }
                  size={50}
                  style={{ color: "#65d844" }}
                  tooltipTitle="Whatsapp"
                  icon={faWhatsapp}
                />
              </li>
              <li>
                <IconAction
                  key={contact.id}
                  onClick={() => navigateWithBlankTo(`mailto:${contact.email}`)}
                  size={50}
                  tooltipTitle="Email"
                  styled={{ color: (theme) => theme.colors.error }}
                  icon={faEnvelope}
                />
              </li>
            </ul>
          </WrapperSocials>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Timeline mode="alternate">
            {viewContacts().map((contact, index) => (
              <Timeline.Item key={index} color={index % 2 ? "green" : "red"}>
                <WrapperTimeLineItem>
                  <ul>
                    <li>
                      <h5>
                        <strong>
                          {moment(contact.createAt.toDate()).format(
                            "DD/MM/YYYY HH:mm:ss a"
                          )}
                        </strong>
                      </h5>
                    </li>
                    <li>
                      <h3>{contact.issue || "-"}</h3>
                    </li>
                    <li>
                      <p>{contact.message || "-"}</p>
                    </li>
                  </ul>
                </WrapperTimeLineItem>
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </>
  );
};

const WrapperSocials = styled.div`
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
  }
`;

const WrapperTimeLineItem = styled.div`
  ul {
    list-style: none;
    padding: 0;
    li {
      h3 {
        color: #1890ff;
      }
    }
  }
`;
