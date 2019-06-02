import { observable, action, runInAction } from 'mobx';
import Api from '../utils/Api';

class VocStore {
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

export default VocStore;
