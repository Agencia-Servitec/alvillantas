// import React, { useEffect, useState } from "react";
// import Row from "antd/lib/row";
// import Col from "antd/lib/col";
// import { useHistory, useParams } from "react-router";
// import Title from "antd/es/typography/Title";
// import { Tabs } from "antd";
// import { AnimeInformation } from "./AnimeInformation";
// import { AnimeEpisodes } from "./AnimeEpisodes";
// import { firestore } from "../../../firebase";
// import { useDefaultFirestoreProps } from "../../../hooks";
// import { Spinner } from "../../../components/ui";
// import { capitalize, get, isEmpty, startCase } from "lodash";
//
// const { TabPane } = Tabs;
//
// export const Anime = () => {
//   const { animeId } = useParams();
//
//   const [anime, setAnime] = useState({});
//   const [loadingAnime, setLoadingAnime] = useState(true);
//
//   const history = useHistory();
//
//   const { assignCreateProps } = useDefaultFirestoreProps();
//
//   useEffect(() => {
//     fetchAnime();
//   }, [animeId]);
//
//   const fetchAnime = async () => {
//     try {
//       if (animeId === "new")
//         return setAnime(
//           assignCreateProps({ id: firestore.collection("animes").doc().id })
//         );
//
//       const animeQuery = await firestore
//         .collection("animes")
//         .doc(animeId)
//         .get();
//
//       const anime_ = await animeQuery.data();
//
//       if (isEmpty(anime_)) return history.push("/animes");
//
//       setAnime(anime_);
//     } catch (e) {
//       console.log("[Error fetch anime]->", e);
//       history.push("/animes");
//     } finally {
//       setLoadingAnime(false);
//     }
//   };
//
//   const navigateTo = (url) => history.push(url);
//
//   if (loadingAnime || !anime) return <Spinner height="50vh" />;
//
//   return (
//     <Row>
//       <Col span={24}>
//         <Title level={2}>
//           {startCase(capitalize(get(anime, "name", "-")))}
//         </Title>
//       </Col>
//       <Col span={24}>
//         <Tabs type="card">
//           <TabPane tab="Información" key="1">
//             <AnimeInformation anime={anime} />
//           </TabPane>
//           <TabPane tab="Episodios" key="2" disabled={animeId === "new"}>
//             <AnimeEpisodes anime={anime} navigateTo={navigateTo} />
//           </TabPane>
//         </Tabs>
//       </Col>
//     </Row>
//   );
// };
