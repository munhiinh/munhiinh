import axios from "axios";

async function SlugPost(slug, data, headers) {
  return new Promise((resolve, reject) => {
    // console.log('data: ',data);
    // console.log("slug: ", slug);
    // console.log("header", headers);
    // console.log("get url2--------> " + `${process.env.URL}/${slug}?cat_id=1`);
    // var q = ''
    // for(const k in query){
    //   if(q.length > 0) q+='&'
    //   q += k+'='+query[k]
    // }
    // https://merchant.qpay.mn/v2/payment/check
    axios
      .post(`${"https://merchant.qpay.mn/v2/payment"}/${slug}`, data, {
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
