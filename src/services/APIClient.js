class APIClient {
    constructor() {
      this.baseUrl = process.env.REACT_APP_BACKEND_URL;
    }
  
    post(endpoint, params, headers = {}) {
      console.log(this.baseUrl);
      return this.requestHttp("POST", this.baseUrl + endpoint, params, headers);
    }
  
    get(endpoint, headers = {}) {
      return this.requestHttp("GET", this.baseUrl + endpoint, null, headers);
    }
  
    put(endpoint, params, headers = {}) {
      return this.requestHttp("PUT", this.baseUrl + endpoint, params, headers);
    }
  
    patch(endpoint, params, headers = {}) {
      return this.requestHttp("PATCH", this.baseUrl + endpoint, params, headers);
    }
  
    delete(endpoint, params, headers = {}) {
      return this.requestHttp("DELETE", this.baseUrl + endpoint, params, headers);
    }
  
    requestHttp(method, url, params, headers) {
      return new Promise((resolve, reject) => {
        const options = {
          method,
          headers: headers
        };
        console.log(method+" "+url);
        if (params) {
          options.body = JSON.stringify(params);
        }
        fetch(url, options)
          .then((response) => {
            response
              .json()
              .then((body) => {
                resolve({ statusCode: response.status, body });
              })
              .catch((error) => {
                reject("Can not connect to server.");
              });
          })
          .catch((error) => {
            reject("Can not connect to server.");
          });
      });
    }
  }
  
  export default APIClient;

//   {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },