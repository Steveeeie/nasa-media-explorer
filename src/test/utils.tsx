import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "vitest-browser-react";
import { routeTree } from "@/routeTree.gen";

interface RenderOptions {
  initialEntries: string[];
}

async function renderWithRouter({ initialEntries }: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries }),
    context: {
      queryClient,
    },
  });

  const screen = await render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  return { screen, router };
}

export { renderWithRouter };
