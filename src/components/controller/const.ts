export const serverAdress = 'http://localhost:3000';
//export const serverAdress = 'https://rs-clone-server-smfd.onrender.com';

export const responseStatus = {
  error: 500,
  created: 201,
  ok: 200,
  notFound: 404,
};

export const scoreRowsCount = 10;

export const selectOrderParametrs = ['sortby', 'sortScoreASC', 'sortScoreDesc', 'sortTimeASC', 'sortTimeDESC'];
export const orderParametrsRequest = [
  ['', ''],
  ['score', 'ASC'],
  ['score', 'DESC'],
  ['time', 'ASC'],
  ['time', 'DESC'],
];

export const selectLevelParametrs = ['allLevels', 'level1', 'level2'];
