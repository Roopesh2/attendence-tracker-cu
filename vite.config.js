import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    outDir: "public",
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            'react',
            'react-dom', 
            'react-bootstrap'
          ],
          misc: [
            'react-calendar',
            'react-datepicker',
            'react-icons',
          ],
        },
      },
    },
  },
});
