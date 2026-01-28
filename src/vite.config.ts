import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimization
  build: {
    // Output directory
    outDir: "dist",

    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,

    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.* in production
        drop_debugger: true,
      },
    },

    // Chunk size optimization
    chunkSizeWarningLimit: 1000,

    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          "react-vendor": ["react", "react-dom"],

          // UI components chunk
          "ui-components": [
            "./components/ui/button",
            "./components/ui/card",
            "./components/ui/input",
            "./components/ui/label",
            "./components/ui/dialog",
            "./components/ui/select",
            "./components/ui/tabs",
            "./components/ui/badge",
            "./components/ui/table",
          ],

          // Motion library separate chunk
          motion: ["motion/react"],
        },

        // Asset naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Asset handling
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "motion/react",
      "lucide-react",
    ],
  },

  // CSS handling
  css: {
    devSourcemap: true,
  },
});