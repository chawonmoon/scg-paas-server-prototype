import { observable, action, runInAction } from 'mobx';
import Api from '../utils/Api';

class BillYearSearchStore {
  @observable title = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  load() {
    Api.get('test').then(response => {
      runInAction(() => {
        this.title = response.data;
      });
    });
  }
}

export default BillYearSearchStore;
