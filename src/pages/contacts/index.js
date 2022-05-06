import React, { useEffect, useState } from "react";
import { firestore, querySnapshotToArray } from "../../firebase";
import Title from "antd/es/typography/Title";
import { Divider, List, Skeleton } from "antd";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useHistory } from "react-router";
import { Form, Input, notification } from "../../components/ui";
import Button from "antd/lib/button";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Text from "antd/lib/typography/Text";
import { capitalize, defaultTo, startCase } from "lodash";
import { useDevice, useFormUtils, useGenerateRandomColor } from "../../hooks";

export const Contacts = () => {
  const history = useHistory();
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  const { color } = useGenerateRandomColor();

  const { isMobile } = useDevice();

  const navigateTo = (url) => history.push(url);

  const schema = yup.object({
    firstName: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    await firestore.collection("contacts").onSnapshot((snapshot) => {
      const contactsData = querySnapshotToArray(snapshot);
      setContacts(contactsData);
      setLoadingContacts(false);
    });
  };

  const onSubmitFetchContacts = (formData) => {
    try {
      setLoadingContacts(true);
      const contacts_ = contacts.filter((contact) =>
        contact.firstName !== "all"
          ? contact.firstName === formData.firstName
          : true
      );
      setContacts(contacts_);
    } catch (e) {
      console.log("search:", e);
      notification({ type: "error" });
    } finally {
      setLoadingContacts(false);
    }
  };

  const onResertContact = () => fetchContacts();

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Contacts</Title>
      </Col>

      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmitFetchContacts)}>
          <Row gutter={[16, 15]}>
            <Col span={24}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Ingrese nombre"
                    size="large"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Wrapper>
                <Button
                  type="default"
                  size="large"
                  onClick={() => onResertContact()}
                  loading={loadingContacts}
                  disabled={loadingContacts}
                >
                  Resetear
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loadingContacts}
                  disabled={loadingContacts}
                >
                  Buscar
                </Button>
              </Wrapper>
            </Col>
          </Row>
        </Form>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={5}>
          Total contactos: {defaultTo(contacts, []).length}
        </Title>
      </Col>
      <Col span={24}>
        <Skeleton avatar loading={loadingContacts} active>
          <List
            className="demo-loadmore-list"
            itemLayout={isMobile ? "vertical" : "horizontal"}
            loadMore={false}
            dataSource={contacts}
            renderItem={(contact) => (
              <List.Item
                actions={
                  [
                    // <IconAction
                    //   onClick={() => navigateTo(`/contacts/${contact.id}`)}
                    //   styled={{ color: (theme) => theme.colors.heading }}
                    //   tooltipTitle="Editar"
                    //   icon={faEdit}
                    // />,
                    // <IconAction
                    //   onClick={() => onDeleteContact(contact.id)}
                    //   tooltipTitle="Eliminar"
                    //   styled={{ color: (theme) => theme.colors.error }}
                    //   icon={faTrash}
                    // />,
                  ]
                }
              >
                <List.Item.Meta
                  avatar={
                    <ContactPicture
                      background={`#${Math.round(Math.random())}${color.slice(
                        -5
                      )}`}
                      onClick={() => navigateTo(`/contacts/${contact.id}`)}
                    >
                      {contact.firstName.split("")[0].toUpperCase()}
                    </ContactPicture>
                  }
                  title={
                    <h2
                      className="link-color"
                      onClick={() => navigateTo(`/contact/${contact.id}`)}
                    >
                      {startCase(
                        capitalize(`${contact.firstName} ${contact.lastName}`)
                      )}
                    </h2>
                  }
                  description={
                    <DescriptionWrapper>
                      <div className="item">
                        <Text className="item-text">Nombres: </Text>
                        <Text strong>{capitalize(contact.firstName)}</Text>
                      </div>
                      <div className="item">
                        <Text className="item-text">Apellidos: </Text>
                        <Text strong>{capitalize(contact.lastName)}</Text>
                      </div>
                      <div className="item">
                        <Text className="item-text">Email: </Text>
                        <Text strong>{contact.email.toLowerCase()}</Text>
                      </div>
                      <div className="item">
                        <Text className="item-text">Teléfono: </Text>
                        <Text strong>{contact.phoneNumber}</Text>
                      </div>
                      {contact.message && (
                        <div className="item">
                          <Text className="item-text">Mensaje: </Text>
                          <Text strong>{contact.message}</Text>
                        </div>
                      )}
                    </DescriptionWrapper>
                  }
                />
              </List.Item>
            )}
          />
        </Skeleton>
      </Col>
    </Row>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 1rem;
`;

const ContactPicture = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: ${({ background }) => background || "red"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: #fff;
  cursor: pointer;
`;

const DescriptionWrapper = styled.div`
  display: grid;
  grid-row-gap: 0.3rem;
  justify-content: flex-start;
  .item {
    .item-text {
      color: ${({ theme }) => theme.colors.heading};
    }
  }
`;
