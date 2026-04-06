import { useState } from "react";
import { render } from "vitest-browser-react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useNoScroll } from "./use-no-scroll";

function TestComponent() {
  useNoScroll();
  return <div>Test</div>;
}

function UnmountWrapper() {
  const [mounted, setMounted] = useState(true);

  return (
    <>
      {mounted && <TestComponent />}

      <button onClick={() => { setMounted(false); }}>Unmount</button>
    </>
  );
}

describe("useNoScroll", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("scrolls to top on mount", async () => {
    await render(<TestComponent />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("sets body overflow to hidden on mount", async () => {
    await render(<TestComponent />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  test("resets body overflow on unmount", async () => {
    const screen = await render(<UnmountWrapper />);

    expect(document.body.style.overflow).toBe("hidden");

    await screen.getByRole("button", { name: "Unmount" }).click();

    expect(document.body.style.overflow).toBe("");
  });
});
