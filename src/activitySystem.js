export default class ActivitySystem{
  static getActivity(type, participants, broke){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let brokeValue;
      if (broke===true){brokeValue="price=0";}
      else {brokeValue="minprice=0";}
      const url = `http://www.boredapi.com/api/activity?type=${type}&participants=${participants}&${brokeValue}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  static getRandomActivity() {
    return fetch(`http://www.boredapi.com/api/activity?`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }

}