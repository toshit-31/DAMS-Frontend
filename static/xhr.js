function xhr(method, url, headers){
  this._xhr = new XMLHttpRequest();
  this._xhr.open(method, url);
  if(headers){
    for(var header in headers)
    this._xhr.setRequestHeader(header, headers[header]);
  }
}

xhr.prototype.onresponse = function(codeCbObj){
  const self = this;
  this._xhr.onreadystatechange = function(){
    if(this.readyState == 4){
      if(codeCbObj["0"]) codeCbObj["0"].call(self, this.response);
      if(codeCbObj[this.status.toString()]){
        codeCbObj[this.status.toString()].call(self, this.response);
      } else {
        console.log(this.status);
      }
    }
  }
}

xhr.prototype.send = function(data, dataType){
  this._xhr.responseType = dataType;
  this._xhr.send(JSON.stringify(data))
}

export default xhr;