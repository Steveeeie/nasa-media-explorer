import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { worker } from "./src/test/worker";

beforeAll(async () => {
  await worker.start({
    quiet: true,
  });
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});

/**
 * Workaround for act() warnings - regression introduced in vitest-browser-react 2.x
 * See: https://github.com/vitest-community/vitest-browser-react/issues/37
 */

const originalError = console.error;

console.error = (...args: unknown[]) => {
  const message = String(args[0]);

  if (message.includes("act(") || message.includes("wrapped in act")) {
    return;
  }

  originalError.call(console, ...args);
};

/**
 * Mock the Moon component to avoid WebGL initialization in tests
 */

vi.mock("./src/components/moon", () => ({
  Moon: () => null,
}));
