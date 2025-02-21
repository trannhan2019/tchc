import { useDocumentTitle } from "usehooks-ts";
import { RouterProvider } from "react-router";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 20, // 20 minutes
    },
  },
});

function App() {
  useDocumentTitle("SBA | BHXH");
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster toastOptions={{ duration: 5000 }} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
