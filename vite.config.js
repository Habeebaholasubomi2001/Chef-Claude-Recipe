import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ChefClaude-Recipe-App",
  build: {
    rollupOptions: {
      external: ["@huggingface/inference"],
      dependencies: {
        "@huggingface/inference": "^2.8.1",
        "gh-pages": "^6.2.0",
        "react-markdown": "^9.0.1",
      },
    },
  },
});

// export default {
//   build: {
//     rollupOptions: {
//       external: ['@huggingface/inference']
//     }
//   }
// }
