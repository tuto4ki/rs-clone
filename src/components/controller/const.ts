export const serverAdress = 'http://localhost:3000';

export const responseStatus = {
  error: 500,
  created: 201,
  ok: 200,
  notFound: 404,
};

export const scoreRowsCount = 10;

export const selectOrderParametrs = [
  'Sort by..',
  'Sort score ASC',
  'Sort score DESC',
  'Sort time ASC',
  'Sort time DESC',
];
export const orderParametrsRequest = [
  ['', ''],
  ['score', 'ASC'],
  ['score', 'DESC'],
  ['time', 'ASC'],
  ['time', 'DESC'],
];

export const selectLevelParametrs = ['All Levels', 'Level 1', 'Level 2'];
