// import React, { useEffect, useState } from "react";
// import Col from "antd/lib/col";
// import Row from "antd/lib/row";
// import styled from "styled-components";
// import {
//   Form,
//   Input,
//   modalConfirm,
//   notification,
//   Select,
//   SelectOption,
//   TextArea,
// } from "../../../components/ui";
// import { Upload } from "../../../components";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Button from "antd/lib/button";
// import Radio from "antd/lib/radio";
// import { firestore } from "../../../firebase";
// import { assign, capitalize, defaultTo, get, uniq } from "lodash";
// import moment from "moment";
// import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
// import { useHistory } from "react-router";
//
// const ACTION = {
//   public: {
//     id: true,
//     label: "Público",
//     message: {
//       confirm: "¿Está seguro de que desea cambiar a 'Público' el anime?",
//     },
//   },
//   private: {
//     id: false,
//     label: "No público",
//     message: {
//       confirm: "¿Está seguro de que desea cambiar a 'No público' el anime?",
//     },
//   },
// };
//
// export const AnimeInformation = ({ anime }) => {
//   const [loadingSaveAnime, setLoadingSaveAnime] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//
//   const history = useHistory();
//
//   const { assignUpdateProps } = useDefaultFirestoreProps();
//
//   const schema = yup.object({
//     animePicture: yup.object().nullable(),
//     animeCoverImage: yup.object().nullable(),
//     name: yup.string().required(),
//     category: yup.string().required(),
//     state: yup.string().required(),
//     gender: yup.array().required(),
//     synopsis: yup.string().required(),
//     totalEpisodes: yup.number().required().min(0),
//     isPublic: yup.boolean(),
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
//   const { required, error } = useFormUtils({
//     errors,
//     schema: schema,
//   });
//
//   useEffect(() => {
//     animeToForm();
//   }, [anime]);
//
//   const animeToForm = () =>
//     reset({
//       animePicture: get(anime, "animePicture", null),
//       animeCoverImage: get(anime, "animeCoverImage", null),
//       name: get(anime, "name", ""),
//       category: get(anime, "category", "anime"),
//       state: get(anime, "state", "proximamente"),
//       gender: get(anime, "gender", []),
//       synopsis: get(anime, "synopsis", ""),
//       totalEpisodes: get(anime, "totalEpisodes", 0),
//       isPublic: get(anime, "isPublic", false),
//     });
//
//   const childSelectGender = () => {
//     let children = [];
//
//     defaultTo(anime.gender, []).forEach((gender, index) =>
//       children.push(
//         <SelectOption key={index} value={gender}>
//           {gender}
//         </SelectOption>
//       )
//     );
//
//     return children;
//   };
//
//   const onSubmitUpdateAnime = async (formData) => {
//     if (!formData.isPublic) return onUpdateAnime(formData);
//
//     const currentAction = ACTION["public"];
//
//     modalConfirm({
//       title: currentAction.message.confirm,
//       content: "Todos los datos serán modificados",
//       onOk: () => onUpdateAnime(formData),
//     });
//   };
//
//   const onUpdateAnime = async (formData) => {
//     try {
//       setLoadingSaveAnime(true);
//
//       const animeMapper = mapAnime(formData);
//
//       await firestore
//         .collection("animes")
//         .doc(anime.id)
//         .set(assignUpdateProps(animeMapper), { merge: true });
//
//       notification({ type: "success" });
//     } catch (e) {
//       console.error("Update anime:", e);
//       notification({ type: "error" });
//     } finally {
//       setLoadingSaveAnime(false);
//     }
//   };
//
//   const mapAnime = (formData) =>
//     assign({}, anime, formData, {
//       animePicture: get(formData, "animePicture", null),
//       animeCoverImage: get(formData, "animeCoverImage", null),
//       searchData: searchData(formData),
//       typeCreation: get(anime, "typeCreation", "manual"),
//     });
//
//   const searchData = (formData) => {
//     const strings = [
//       anime.flvId && anime.flvId,
//       ...formData.name.split(" "),
//       formData.category,
//       formData.state,
//       ...formData.gender,
//       moment(get(anime, "createAt", new Date()).toDate()).format("DD/MM/YYYY"),
//     ].filter((string) => string);
//
//     return uniq(strings).map((string) =>
//       string
//         .trim()
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/\p{Diacritic}/gu, "")
//     );
//   };
//
//   return (
//     <>
//       <Form onSubmit={handleSubmit(onSubmitUpdateAnime)}>
//         <Row gutter={[16, 15]}>
//           <Col xs={24} sm={24} md={12}>
//             <Controller
//               name="name"
//               control={control}
//               defaultValue={get(anime, "name", "")}
//               render={({ field: { onChange, name, value } }) => (
//                 <Input
//                   label="Nombre"
//                   size="large"
//                   value={value}
//                   name={name}
//                   onChange={onChange}
//                   error={error(name)}
//                   required={required(name)}
//                 />
//               )}
//             />
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Controller
//               name="category"
//               control={control}
//               defaultValue={get(anime, "category", null)}
//               render={({ field: { onChange, value, name } }) => (
//                 <Select
//                   label="Categoria"
//                   showSearch
//                   onChange={onChange}
//                   value={value}
//                   style={{ width: "100%" }}
//                   size="large"
//                   error={error(name)}
//                   required={required(name)}
//                   animation={false}
//                 >
//                   {["anime", "ova", "película"].map((category, index) => (
//                     <SelectOption value={category} key={index}>
//                       {capitalize(category)}
//                     </SelectOption>
//                   ))}
//                 </Select>
//               )}
//             />
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Controller
//               name="state"
//               control={control}
//               defaultValue={get(anime, "state", null)}
//               render={({ field: { onChange, value, name } }) => (
//                 <Select
//                   label="Estado"
//                   showSearch
//                   onChange={onChange}
//                   value={value}
//                   style={{ width: "100%" }}
//                   size="large"
//                   error={error(name)}
//                   required={required(name)}
//                   animation={false}
//                 >
//                   {["en emision", "finalizado", "proximamente"].map(
//                     (category, index) => (
//                       <SelectOption value={category} key={index}>
//                         {capitalize(category)}
//                       </SelectOption>
//                     )
//                   )}
//                 </Select>
//               )}
//             />
//           </Col>
//           <Col span={24}>
//             <Controller
//               name="gender"
//               control={control}
//               defaultValue={get(anime, "gender", [])}
//               render={({ field: { onChange, value, name } }) => (
//                 <Select
//                   label="Géneros"
//                   placeholder="Ingrese los géneros"
//                   mode="tags"
//                   size="large"
//                   onChange={onChange}
//                   value={value}
//                   style={{ width: "100%" }}
//                   error={error(name)}
//                   required={required(name)}
//                   animation={false}
//                 >
//                   {childSelectGender()}
//                 </Select>
//               )}
//             />
//           </Col>
//           <Col span={24}>
//             <Controller
//               name="synopsis"
//               control={control}
//               defaultValue={get(anime, "synopsis", "")}
//               render={({ field: { onChange, value, name } }) => (
//                 <TextArea
//                   label="Synopsis"
//                   size="large"
//                   rows={6}
//                   value={value}
//                   onChange={onChange}
//                   error={error(name)}
//                   required={required(name)}
//                 />
//               )}
//             />
//           </Col>
//           <Col span={24}>
//             <Controller
//               name="totalEpisodes"
//               control={control}
//               defaultValue={get(anime, "totalEpisodes", null)}
//               render={({ field: { onChange, value, name } }) => (
//                 <Input
//                   label="Total de episodios"
//                   type="number"
//                   size="large"
//                   value={value}
//                   onChange={onChange}
//                   error={error(name)}
//                   required={required(name)}
//                 />
//               )}
//             />
//           </Col>
//           <Col xs={24} sm={12}>
//             <Controller
//               name="animePicture"
//               control={control}
//               defaultValue={get(anime, "animePicture", null)}
//               render={({ field: { onChange, value, name } }) => (
//                 <Upload
//                   label="Imagen anime"
//                   accept="image/*"
//                   name={name}
//                   value={value}
//                   filePath={`animes/${get(anime, "id", null)}`}
//                   resize="400x500"
//                   bucket="animesStorageBucket"
//                   buttonText="Subir imagen"
//                   error={error(name)}
//                   required={required(name)}
//                   onChange={(file) => onChange(file)}
//                   onUploading={setUploadingImage}
//                 />
//               )}
//             />
//           </Col>
//           <Col xs={24} sm={12}>
//             <Controller
//               name="animeCoverImage"
//               control={control}
//               defaultValue={get(anime, "animeCoverImage", null)}
//               render={({ field: { onChange, value, name } }) => (
//                 <Upload
//                   label="Imagen anime cover"
//                   accept="image/*"
//                   name={name}
//                   value={value}
//                   filePath={`animes/${get(anime, "id", null)}`}
//                   resize="1400x600"
//                   bucket="animesStorageBucket"
//                   buttonText="Subir imagen"
//                   error={error(name)}
//                   required={required(name)}
//                   onChange={(file) => onChange(file)}
//                   onUploading={setUploadingImage}
//                 />
//               )}
//             />
//           </Col>
//           <Col span={24}>
//             <Controller
//               name="isPublic"
//               control={control}
//               defaultValue={false}
//               render={({ field: { onChange, value, name } }) => (
//                 <Radio.Group
//                   label="Estado de publicación"
//                   value={value}
//                   onChange={onChange}
//                   error={error(name)}
//                   required={required(name)}
//                 >
//                   <Radio value={false}>No público</Radio>
//                   <Radio value={true}>Público</Radio>
//                 </Radio.Group>
//               )}
//             />
//           </Col>
//         </Row>
//         <Row justify="end" gutter={[16, 16]}>
//           <Col xs={24} sm={6} md={4}>
//             <Button
//               type="default"
//               size="large"
//               block
//               onClick={() => history.goBack()}
//               disabled={loadingSaveAnime || uploadingImage}
//             >
//               Cancelar
//             </Button>
//           </Col>
//           <Col xs={24} sm={6} md={4}>
//             <Button
//               type="primary"
//               size="large"
//               block
//               htmlType="submit"
//               loading={loadingSaveAnime}
//               disabled={loadingSaveAnime || uploadingImage}
//             >
//               Guardar
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </>
//   );
// };
