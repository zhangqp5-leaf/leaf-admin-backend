class Snowflake {
  constructor(workerId, epoch = 0) {
      this.workerId = workerId;
      this.epoch = epoch;
      this.sequence = 0;
      this.timestamp = -1;
  }

  nextId() {
      let timestamp = Date.now() - this.epoch;

      if (timestamp === this.timestamp) {
          this.sequence = (this.sequence + 1) & 4095; // 12位序列号，最大为4095
          if (this.sequence === 0) {
              // 等待下一毫秒
              timestamp = this.waitNextMillis(timestamp);
          }
      } else {
          this.sequence = 0;
      }

      // 更新时间戳
      this.timestamp = timestamp;

      // 生成 ID
      const id = ((BigInt(timestamp) << BigInt(22)) + (BigInt(this.workerId) << BigInt(12)) + BigInt(this.sequence));

      return id.toString();
  }

  waitNextMillis(timestamp) {
      let nextTimestamp = Date.now() - this.epoch;
      while (nextTimestamp <= timestamp) {
          nextTimestamp = Date.now() - this.epoch;
      }
      return nextTimestamp;
  }
}

module.exports = Snowflake;