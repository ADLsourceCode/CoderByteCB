const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('should create partition key using event data when partition key is not available', () => {
      const event = { id: 123, name: 'ABC' };
      const expectedKey = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
      expect(deterministicPartitionKey(event)).toBe(expectedKey);
  });
  it("returns a hash of the stringified event data when partition key is not a string", () => {
      const event = { partitionKey: [1, 2, 3] };
      const result = deterministicPartitionKey(event);
      expect(result).toMatch("[1,2,3]");
  });
  it('should truncate partition key if it exceeds maximum length', () => {
      const longKey = 'a'.repeat(500);
      const expectedKey = crypto.createHash('sha3-512').update(longKey).digest('hex')
      expect(deterministicPartitionKey({ partitionKey: longKey })).toBe(expectedKey);
  });


  it("returns the partition key from the event object when present", () => {
      const event = { partitionKey: "test-partition-key" };
      const result = deterministicPartitionKey(event);
      expect(result).toBe("test-partition-key");
  });

  it("returns a hash of the event data when partition key is not present", () => {
      const event = { someKey: "some value" };
      const result = deterministicPartitionKey(event);
      expect(result).toMatch(/^[a-f0-9]+$/);
  });
});











