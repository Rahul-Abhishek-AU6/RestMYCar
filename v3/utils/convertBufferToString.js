const DataUri = require('datauri')
var dataUriChild = new DataUri()
const path = require("path")

module.exports = function(originalName, buffer){
    var extName = path.extName(originalname)
    return dataUriChild.format(extName, buffer).content
}