import { createApi } from "unsplash-js";
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "e2-vNKNiKmdiMOOPWIoyZVRsrkKdE6-JpMtuz1Era04"
});
console.log(api)
export const reqHomeRemeng = () => api.photos.getRandom({
  query: "dog",
  count: "6"
}).then(res => {
  return res.response
})
export const reqHomexin = () => api.photos.getRandom({
  query: "Latest pictures",
  count: "6"
}).then(res => {
  console.log(res.response)
  return res.response
})
export const reqHomePou = () => api.photos.getRandom({
  query: "Popular pictures",
  count: "6"
}).then(res => {
  return res.response
})
export const reqSear = (query, page, per_page) => api.search
  .getPhotos(query, page, per_page)
  .then(res => { return res.response.results })

//https://unsplash.com/photos/HXYS4gg1mfo
export const reqHomefenlei = (data) => api.photos.getRandom({
  query: data,
}).then(res => {
  return res.response
})