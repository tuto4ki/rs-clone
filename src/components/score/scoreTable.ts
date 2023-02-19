import { elementGenerator } from '../controller/taggenerator';
import { IWinner, ISortQuery, ISelectData } from '../types';
import { getScores } from '../controller/requests';
import { scoreRowsCount, orderParametrsRequest } from '../controller/const';

export class ScoreTable {
  private _sortQuery: ISortQuery;
  private _userPosH: HTMLParagraphElement;
  private _userNameH: HTMLParagraphElement;
  private _userScoreH: HTMLParagraphElement;
  private _userTimeH: HTMLParagraphElement;
  private _userLevelH: HTMLParagraphElement;
  private _scoreTable: HTMLDivElement;
  private _page = 1;
  private _pageCount = 1;
  private _nextPage: HTMLButtonElement;
  private _prevPage: HTMLButtonElement;
  constructor() {
    this._sortQuery = {
      limit: scoreRowsCount,
      page: this._page,
    };
    this._userPosH = elementGenerator.createParagraph({ className: 'score__pos score__cell' });
    this._userNameH = elementGenerator.createParagraph({ className: 'score__owner score__cell' });
    this._userScoreH = elementGenerator.createParagraph({
      className: 'score__coins score__cell',
    });
    this._userTimeH = elementGenerator.createParagraph({
      className: 'score__time score__cell',
    });
    this._userLevelH = elementGenerator.createParagraph({
      className: 'score__level score__cell',
    });
    this._scoreTable = elementGenerator.createDiv({ className: 'score__inner' });
    this._nextPage = elementGenerator.createButton({ className: 'next-page' });
    this._prevPage = elementGenerator.createButton({ className: 'prev-page' });

    this._nextPage.addEventListener('click', () => {
      this.changePage(1);
    });
    this._prevPage.addEventListener('click', () => {
      this.changePage(-1);
    });
  }

  getScoreTable = async (): Promise<HTMLDivElement> => {
    this.setTranslation();
    this.updateTableData();
    this.updateButtons();

    const scoreWrap = elementGenerator.createDiv({ className: 'score' });
    const scoreHeadline = elementGenerator.createDiv({ className: 'score__row score__headline' });

    scoreHeadline.append(this._userPosH, this._userNameH, this._userLevelH, this._userTimeH, this._userScoreH);

    scoreWrap.append(scoreHeadline, this._scoreTable, this._prevPage, this._nextPage);

    return scoreWrap;
  };

  updateTableData = async (data: undefined | ISelectData = undefined) => {
    if (data !== undefined) {
      this._sortQuery = {};

      if (data.sortData !== 0) {
        this._sortQuery.sort = orderParametrsRequest[data.sortData][0];
        this._sortQuery.order = orderParametrsRequest[data.sortData][1];
      }

      if (data.level != 0) {
        this._sortQuery.level = data.level;
      }

      this._sortQuery.limit = scoreRowsCount;
      this._sortQuery.page = this._page;
    }

    this._scoreTable.innerHTML = '';
    const scoreData = await getScores(this._sortQuery);
    this._pageCount = scoreData.pageCount;
    this.updateButtons();
    scoreData.data.forEach((e, i) => {
      this._scoreTable.append(this.createRow(e, i));
    });
  };

  private createRow = (data: IWinner, position: number): HTMLDivElement => {
    const scoreRow = elementGenerator.createDiv({ className: 'score__row' });
    const userPos = elementGenerator.createParagraph({
      className: 'score__pos score__cell',
      text: String(position + 1),
    });
    const userName = elementGenerator.createParagraph({ className: 'score__owner score__cell', text: data.username });
    const userScore = elementGenerator.createParagraph({
      className: 'score__coins score__cell',
      text: String(data.score),
    });
    const userTime = elementGenerator.createParagraph({
      className: 'score__time score__cell',
      text: String(data.time),
    });
    const userLevel = elementGenerator.createParagraph({
      className: 'score__level score__cell',
      text: String(data.level),
    });

    scoreRow.append(userPos, userName, userLevel, userTime, userScore);
    return scoreRow;
  };

  private changePage = (step: number): void => {
    const newPage = this._page + step;
    if (newPage !== 0 || newPage <= this._pageCount) {
      this._page = newPage;
      this._sortQuery.page = newPage;
      this.updateButtons();
      this.updateTableData();
    }
  };

  private updateButtons = () => {
    if (this._page === 1) {
      this._prevPage.disabled = true;
    } else {
      this._prevPage.disabled = false;
    }

    if (this._page === this._pageCount) {
      this._nextPage.disabled = true;
    } else {
      this._nextPage.disabled = false;
    }
  };

  setTranslation = (): void => {
    this._userPosH.innerText = 'Nr';
    this._userNameH.innerText = 'Player name';
    this._userScoreH.innerText = 'Coin count';
    this._userTimeH.innerText = 'Time';
    this._userLevelH.innerText = 'Level';
    this._nextPage.innerText = 'Next page';
    this._prevPage.innerText = 'Prev page';
  };
}
