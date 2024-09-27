export const convertToDate = (value: string) => {
  const date = new Date(Date.parse(value));

  const splitDate = date.toDateString().split(' ');

  const formattedDate = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;

  return formattedDate;
};
