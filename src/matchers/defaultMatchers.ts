const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object');

export default (globalThis as any)[JEST_MATCHERS_OBJECT].matchers;
