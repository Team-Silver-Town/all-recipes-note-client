exports.sortDescendingByUpdatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const updatedAtA = new Date(a.createdAt).getTime();
    const updatedAtB = new Date(b.createdAt).getTime();

    return updatedAtB - updatedAtA;
  });

  return arrayDataCopy;
};
