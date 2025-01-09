import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
});
