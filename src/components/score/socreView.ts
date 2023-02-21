import { elementGenerator } from '../controller/taggenerator';
import { ScoreTable } from './scoreTable';
import { selectOrderParametrs, selectLevelParametrs } from '../controller/const';

import './score.scss';

export class ScoreView {
  private _scoreTable: ScoreTable;
  private _orderSort: HTMLSelectElement;
  private _levelSort: HTMLSelectElement;
  private _filterParam = {
    sortData: 0,
    level: 0,
  };

  constructor() {
    this._scoreTable = new ScoreTable();
    this._orderSort = document.createElement('select');
    this._levelSort = document.createElement('select');
  }

  getScoreView = async (): Promise<HTMLDivElement> => {
    this.createSorting(
      this._orderSort,
      selectOrderParametrs,
      Object.keys(this._filterParam)[0] as keyof typeof this._filterParam
    );
    this.createSorting(
      this._levelSort,
      selectLevelParametrs,
      Object.keys(this._filterParam)[1] as keyof typeof this._filterParam
    );
    const container = elementGenerator.createDiv({ className: 'score-container' });
    container.append(this._orderSort, this._levelSort, await this._scoreTable.getScoreTable());
    return container;
  };

  private createSorting = (
    select: HTMLSelectElement,
    selectParametrs: string[],
    val: keyof typeof this._filterParam
  ): void => {
    selectParametrs.forEach((e, i) => {
      const option = document.createElement('option');
      option.value = String(i);
      option.text = e;
      select.append(option);
    });

    select.addEventListener('change', async () => {
      this._filterParam[val] = Number(select.value);
      await this._scoreTable.updateTableData(this._filterParam);
    });
  };
}
