// import React, { useEffect, useState } from "react";
// import Col from "antd/lib/col";
// import { Divider, List, Skeleton } from "antd";
// import {
//   Button,
//   Form,
//   Input,
//   Modal,
//   modalConfirm,
//   notification,
//   Spinner,
// } from "../../../components/ui";
// import Row from "antd/lib/row";
// import styled from "styled-components";
// import Avatar from "antd/lib/avatar/avatar";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useDevice, useFormUtils } from "../../../hooks";
// import Card from "antd/lib/card";
// import Title from "antd/es/typography/Title";
// import Text from "antd/lib/typography/Text";
// import UrlAssembler from "url-assembler";
// import { apiUrl, firestore, querySnapshotToArray } from "../../../firebase";
// import { defaultTo, get, isEmpty, orderBy } from "lodash";
// import moment from "moment";
// import Tabs from "antd/lib/tabs";
// import Radio from "antd/lib/radio";
// import { mediaQuery } from "../../../styles";
//
// export const AnimeEpisodes = ({ navigateTo, anime }) => {
//   const { isMobile } = useDevice();
//   const [isLoadingFetchEpisodes, setIsLoadingFetchEpisodes] = useState(false);
//
//   const [episodes, setEpisodes] = useState([]);
//   const [serverSelected, setServerSelected] = useState({});
//   const [visibleServer, setVisibleServer] = useState(1);
//   const [loadingEpisodes, setLoadingEpisodes] = useState(true);
//
//   const [episodeSelected, setEpisodeSelected] = useState({});
//   const [isVisibleModalEpisode, setIsVisibleModalEpisode] = useState(false);
//
//   useEffect(() => {
//     (async () => {
//       await fetchEpisodes();
//     })();
//   }, []);
//
//   useEffect(() => {
//     episodesToForm();
//   }, [episodes]);
//
//   const fetchEpisodes = async () => {
//     try {
//       await firestore
//         .collection("animes")
//         .doc(anime.id)
//         .collection("episodes")
//         .onSnapshot((snapshot) => {
//           const episodesData = querySnapshotToArray(snapshot);
//           setEpisodes(episodesData);
//           setLoadingEpisodes(false);
//         });
//     } catch (e) {
//       console.log("[Error fetch anime]->", e);
//       navigateTo("/animes");
//     } finally {
//       setLoadingEpisodes(false);
//     }
//   };
//
//   const schema = yup.object({
//     animeCode: yup.string().required(),
//     initialEpisode: yup.number().required(),
//     finalEpisode: yup.number().required(),
//   });
//
//   const {
//     formState: { errors },
//     handleSubmit,
//     control,
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//
//   const { required, error } = useFormUtils({ errors, schema });
//
//   const episodesToForm = () =>
//     reset({
//       animeCode: anime.flvId ? `${anime.flvId}-` : "",
//       initialEpisode: getFinalEpisode().initialNumber,
//       finalEpisode: getFinalEpisode().finalNumber,
//     });
//
//   const onSubmitGetEpisodes = (formData) => {
//     modalConfirm({
//       title: "Obtener episodios",
//       content: "¿Seguro que desea obtener los episodios del anime?",
//       okButtonProps: { type: "primary", danger: false },
//       onOk: () => getEpisodes(formData),
//     });
//   };
//
//   const getEpisodes = async (formData) => {
//     try {
//       setIsLoadingFetchEpisodes(true);
//
//       const { initialNumber, finalNumber } = getFinalEpisode();
//
//       if (initialNumber === finalNumber)
//         return notification({
//           type: "info",
//           title: "Ya se obtuvo todos los episodios de este anime!",
//         });
//
//       const url = new UrlAssembler(apiUrl).template("/episodes").toString();
//
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           animeCode: formData.animeCode.trim(),
//           anime: anime,
//           initialEpisode: formData.initialEpisode,
//           finalEpisode: formData.finalEpisode,
//         }),
//       });
//
//       const statusResponse = response.status;
//
//       if (!response.ok) throw Error("Error fetch episodios anime");
//
//       if (412 === statusResponse) {
//         const messageError = await response.text();
//
//         await console.log("[MessageError]->", messageError);
//
//         return await notification({
//           type: "error",
//           title: messageError,
//           description: "",
//         });
//       }
//
//       notification({ type: "success" });
//     } catch (e) {
//       console.error("[Error fetch episodes]", e);
//       notification({ type: "error" });
//     } finally {
//       setIsLoadingFetchEpisodes(false);
//     }
//   };
//
//   const episodesView = () => orderBy(episodes, ["episodeNumber"], ["asc"]);
//
//   const getFinalEpisode = () => {
//     if (episodes.length <= 0) return { initialNumber: 1, finalNumber: 10 };
//
//     const episodeNumber_ = orderBy(episodes, ["episodeNumber"], ["desc"])[0];
//
//     const initialEpisodeSum = episodeNumber_.episodeNumber + 1;
//     const finalEpisodeSum = episodeNumber_.episodeNumber + 10;
//
//     return {
//       initialNumber:
//         initialEpisodeSum >= anime.totalEpisodes
//           ? anime.totalEpisodes
//           : initialEpisodeSum,
//       finalNumber:
//         finalEpisodeSum >= anime.totalEpisodes
//           ? anime.totalEpisodes
//           : finalEpisodeSum,
//     };
//   };
//
//   if (loadingEpisodes) return <Spinner height="50vh" />;
//
//   return (
//     <Row>
//       <Col span={24}>
//         <Form onSubmit={handleSubmit(onSubmitGetEpisodes)}>
//           <Row gutter={[16, 15]}>
//             <Col span={24}>
//               <Controller
//                 name="animeCode"
//                 control={control}
//                 defaultValue={anime.flvId ? anime.flvId + "-" : ""}
//                 render={({ field: { onChange, value, name } }) => (
//                   <Input
//                     label="Ingrese código o url del anime"
//                     size="large"
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     error={error(name)}
//                     required={required(name)}
//                   />
//                 )}
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8}>
//               <Controller
//                 name="initialEpisode"
//                 control={control}
//                 render={({ field: { onChange, value, name } }) => (
//                   <Input
//                     label="Número de episodio inicial"
//                     size="large"
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     error={error(name)}
//                     required={required(name)}
//                     disabled
//                   />
//                 )}
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8}>
//               <Controller
//                 name="finalEpisode"
//                 control={control}
//                 render={({ field: { onChange, value, name } }) => (
//                   <Input
//                     label="Número de episodio final"
//                     size="large"
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     error={error(name)}
//                     required={required(name)}
//                     disabled
//                   />
//                 )}
//               />
//             </Col>
//             <Col span={24}>
//               <Wrapper>
//                 <Button
//                   type="primary"
//                   size="large"
//                   htmlType="submit"
//                   loading={isLoadingFetchEpisodes}
//                   disabled={isLoadingFetchEpisodes}
//                 >
//                   Obtener
//                 </Button>
//               </Wrapper>
//             </Col>
//             <Col span={24}>
//               <Card>
//                 <WrapperList>
//                   <li>
//                     <Title level={5} style={{ margin: "0" }}>
//                       Codigo Ejemplo:
//                     </Title>
//                     <Text code>death-note-</Text>
//                   </li>
//                   <li>
//                     <Title level={5} style={{ margin: "0" }}>
//                       URL Ejemplo:
//                     </Title>
//                     <Text code>
//                       https://www3.animeflv.net/anime/death-note-
//                     </Text>
//                   </li>
//                 </WrapperList>
//               </Card>
//             </Col>
//           </Row>
//         </Form>
//       </Col>
//       <Divider />
//       <Col span={24}>
//         <List
//           className="demo-loadmore-list"
//           itemLayout={isMobile ? "vertical" : "horizontal"}
//           loadMore={false}
//           dataSource={defaultTo(episodesView(), [])}
//           renderItem={(episode) => (
//             <List.Item
//               actions={
//                 [
//                   // <IconAction
//                   //   onClick={() => console.log("Episode edit")}
//                   //   styled={{ color: (theme) => theme.colors.heading }}
//                   //   tooltipTitle="Editar"
//                   //   icon={faEdit}
//                   // />,
//                   // <IconAction
//                   //   onClick={() => onDeleteEpisode(episode.id)}
//                   //   tooltipTitle="Eliminar"
//                   //   styled={{ color: (theme) => theme.colors.error }}
//                   //   icon={faTrash}
//                   // />,
//                 ]
//               }
//             >
//               <Skeleton
//                 avatar
//                 title={false}
//                 loading={loadingEpisodes || isLoadingFetchEpisodes}
//                 active
//               >
//                 <List.Item.Meta
//                   avatar={
//                     <AnimePicture
//                       shape="square"
//                       src={
//                         episode.episodeImage
//                           ? get(
//                               episode,
//                               "episodeImage.thumbUrl",
//                               episode.episodeImage.url
//                             )
//                           : "https://storage.googleapis.com/animexflix-65d0b.appspot.com/resources/image-no-found.jpg"
//                       }
//                     />
//                   }
//                   title={
//                     <Title
//                       level={4}
//                       onClick={() => {
//                         setEpisodeSelected(episode);
//                         setIsVisibleModalEpisode(true);
//                       }}
//                     >
//                       <a>Episodio: {episode.episodeNumber}</a>
//                     </Title>
//                   }
//                   description={
//                     <DescriptionWrapper>
//                       <div className="item">
//                         <Text className="item-text">Fecha creación: </Text>
//                         <Text strong>
//                           {defaultTo(
//                             moment(anime.createAt.toDate()).format(
//                               "DD/MM/YYYY HH:mm a"
//                             ),
//                             "-"
//                           )}
//                         </Text>
//                       </div>
//                     </DescriptionWrapper>
//                   }
//                 />
//                 {/*<div>content</div>*/}
//               </Skeleton>
//             </List.Item>
//           )}
//         />
//       </Col>
//       {isVisibleModalEpisode && (
//         <ModalServers
//           visible={isVisibleModalEpisode}
//           onCancel={() => {
//             setIsVisibleModalEpisode(false);
//             setServerSelected(null);
//             setVisibleServer(1);
//           }}
//           title={`Episodio: ${episodeSelected?.episodeNumber}`}
//           closable
//         >
//           <CardContainerServerType>
//             <Tabs type="card">
//               {Object.keys(get(episodeSelected, "servers", [])).map(
//                 (serverType, index) => (
//                   <Tabs.TabPane tab={serverType.toUpperCase()} key={index}>
//                     <Radio.Group
//                       onChange={(e) => setVisibleServer(e.target.value)}
//                       value={visibleServer}
//                     >
//                       {episodeSelected.servers[serverType].map(
//                         (server, index) => (
//                           <Radio.Button
//                             key={index + 1}
//                             value={index + 1}
//                             disabled={isEmpty(server)}
//                             onClick={() => setServerSelected(server)}
//                           >
//                             {server.title}
//                           </Radio.Button>
//                         )
//                       )}
//                     </Radio.Group>
//                     {serverSelected && (
//                       <WrapperIframe>
//                         <iframe
//                           key={serverSelected.code}
//                           src={
//                             serverSelected.code
//                               ? serverSelected.code
//                               : serverSelected.url
//                           }
//                           frameBorder="0"
//                           className="iframe-video"
//                           controls
//                           scrolling="no"
//                           allowFullScreen
//                         />
//                       </WrapperIframe>
//                     )}
//                   </Tabs.TabPane>
//                 )
//               )}
//             </Tabs>
//           </CardContainerServerType>
//         </ModalServers>
//       )}
//     </Row>
//   );
// };
//
// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: flex-end;
// `;
//
// const WrapperList = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   li {
//     margin-bottom: 0.5rem;
//   }
// `;
//
// const DescriptionWrapper = styled.div`
//   display: grid;
//   grid-row-gap: 0.3rem;
//   justify-content: flex-start;
//   .item {
//     .item-text {
//       color: ${({ theme }) => theme.colors.heading};
//     }
//   }
// `;
//
// const AnimePicture = styled(Avatar)`
//   width: 9rem;
//   height: 5rem;
//   object-fit: cover;
//   cursor: pointer;
// `;
//
// const CardContainerServerType = styled.div`
//   .iframe-video {
//     width: 100%;
//     height: 100%;
//   }
// `;
//
// const WrapperIframe = styled.div`
//   width: 100%;
//   height: 65vh;
//   background: #a4a2a2;
//   margin: 1rem 0;
// `;
//
// const ModalServers = styled(Modal)`
//   width: 98% !important;
//   top: 0 !important;
//   ${mediaQuery.minTablet} {
//     width: 80% !important;
//   }
// `;
