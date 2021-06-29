//Consts intialization
const BASE_URL = "https://api.spacexdata.com/v4/";
const axios = require("axios");
const { STATUS_CODES } = require('http');

module.exports = {
  /**
   * This API will return the category items by passing category type
   * @queryparam {string} category - required - category of the spacex data
   * @queryparam {string} id - optional id of the selected item
   * @queryparam {string} limit - optional how may items per API request
   * @queryparam {string} sortBy - optional sort by which column
   * @queryparam {string} order - optional  sort order asc(default) || desc
   * @returns 
   */
  getSpaceXData: async (req, res, next) => {
    // variable assigning
    const category = req.query.category || null;
    const id = req.query.id || null;

    let pageNum = req.query.pageNum || null;
    let limit = req.query.limit || null;
    let sortKey = req.query.sortBy || null
    const sortOrder = req.query.order || 'asc';

    //API basic config structure formation
    let url = BASE_URL + `${category}`;
    let method = 'GET';
    let body = {
      "query": {},
      "options": {}
    };

    // checking if mandatory and valid params are passed and throwing error for invalid input
    if (!category || (limit && !(limit*1)) || (pageNum && !(pageNum*1))) {
      res.status(400).json({ "message": STATUS_CODES["400"], description: "Invalid request param or value passed in the API" });
      next();
      return;
    }

    // forming the payload, method, API of config based on query params
    if (id) {
      // find single item
      url += `/${id}`;
    } else {
      // pagination params
      if (pageNum || limit) {
        url += '/query';
        method = "POST";
        //dynamically adding optional params to the POST API body
        pageNum ? body['options']['page'] = pageNum : null;
        limit ? body['options']['limit'] = limit : null;

        // setting sorty order and then setting sort by key : body['options']['sort'] = "name" || "-name" etc.
        (sortKey && sortOrder == 'desc') ? sortKey = '-' + sortKey : null;
        sortKey ? body['options']['sort'] = sortKey : null;
      }
    }

    //API call to spaceX endpoint and returning data based on response
    try {
      const config = {
        method, url, data: body,  headers: {"Accept": "application/json"}
      };

      console.log("config: " + JSON.stringify(config))
      let categoryItems = await axios(config);
      console.log("Sucessfully retrived the items in category");

      // forming payload such that it will have common response structure for all types of request - result { "data": [], "supportParams": {} }
      const data = id ? [categoryItems.data] : (method=='POST' ? categoryItems.data.docs : categoryItems.data);
      let supportParams = {};
      if(method == 'POST'){
        supportParams = {...categoryItems.data};
        delete supportParams['docs'];
      }

      res.status(200).json({ result: {data, supportParams} });
      next();
    } catch (err) {
      console.log("Error while getting the data");
      console.log(err.response.status, err.response.statusText);
      res.status(500).json({ message: STATUS_CODES["500"], description: err.response.statusText });
      next();
    }
  }
};