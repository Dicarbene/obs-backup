class myPromise {
  state: string;
  result: string | Error = '';
  constructor(executor: Function) {
    this.state = 'pending';
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      throw error;
    }
  }
  resolve(result: string) {
    if (this.state !== 'pending') return;
    this.state = 'resolved';
    this.result = result;
  }
  reject(result: string) {
    if (this.state !== 'pending') return;
    this.state = 'reject';
    this.result = new Error(result);
  }
  then(onFulfilled) {
    onFulfilled(this.result);
  }
}

const p = new myPromise((resolve) => {
  resolve(10);
}).then((result: string) => {
  console.log(result); // 10
});