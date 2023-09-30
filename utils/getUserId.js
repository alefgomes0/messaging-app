function getUserid(id) {
  return String(id).split('"')[0];
}

module.exports = getUserid;
