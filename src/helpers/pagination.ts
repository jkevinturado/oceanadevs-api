interface pagingDataAttribute {
  count: number;
  rows: object;
}

const getPagination = (page: number, rowsperpage: number) => {
  const newPage = +page - 1;
  const limit = rowsperpage ? +rowsperpage : 10;
  const offset = page ? newPage * rowsperpage : 0;

  return { limit, offset };
};

const getPagingData = (data: any, page: number, rowsperpage: number) => {
  console.log(data);
  const { count, rows }: pagingDataAttribute = data;
  let currentPage = page ? +page : 1;
  let totalPage = Math.ceil(count / rowsperpage);

  return { count, rows, totalPage, currentPage };
};

export { getPagination, getPagingData };
