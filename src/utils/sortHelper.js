exports.sortDescendingByUpdatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt).getTime();
    const updatedAtB = new Date(b.updatedAt).getTime();

    // return updatedAtA < updatedAtB ? -1 : updatedAtA > updatedAtB ? 1 : 0;
    return updatedAtB - updatedAtA;
  });

  return arrayDataCopy;
};
