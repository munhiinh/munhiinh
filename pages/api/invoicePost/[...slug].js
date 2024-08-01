import axios from "axios";

async function SlugPost(slug, data, headers) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${"https://merchant.qpay.mn/v2"}/${slug}`, data, {
        headers: { Authorization: headers.authorization },
      })
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
export default async function handler(req, res) {
  // console.log(req.query)
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body, req.headers).then(
    function (response) {
      res.status(200).json(response.data);
    },
    function (error) {
      res.status(200).json(error.data);
      console.log(error);
    }
  );
}
