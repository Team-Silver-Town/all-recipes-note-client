exports.sortDescendingByUpdatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt).getTime();
    const updatedAtB = new Date(b.updatedAt).getTime();

    return updatedAtB - updatedAtA;
  });

  return arrayDataCopy;
};

exports.sortDescendingByCreatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const createdAtA = new Date(a.createdAt).getTime();
    const createdAtB = new Date(b.createdAt).getTime();

    return createdAtB - createdAtA;
  });

  return arrayDataCopy;
};
