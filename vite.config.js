import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ChefClaude-Recipe-App",
  build: {
    rollupOptions: {
      external: ["@huggingface/inference"],
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
