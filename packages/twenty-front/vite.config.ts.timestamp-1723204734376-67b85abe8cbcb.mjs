// packages/twenty-front/vite.config.ts
import react from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/@vitejs/plugin-react-swc/index.mjs";
import wyw from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/@wyw-in-js/vite/esm/index.mjs";
import path from "path";
import { defineConfig, loadEnv } from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/vite/dist/node/index.js";
import checker from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/vite-plugin-checker/dist/esm/main.js";
import svgr from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "/mnt/c/Users/Felipe/workspace/MindGroup/Kvoip/kvoip-web-v2/packages/twenty-front";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const { REACT_APP_SERVER_BASE_URL, VITE_BUILD_SOURCEMAP } = env;
  const isBuildCommand = command === "build";
  const checkers = {
    typescript: {
      tsconfigPath: path.resolve(__vite_injected_original_dirname, "./tsconfig.app.json")
    },
    overlay: false
  };
  if (!isBuildCommand) {
    checkers["eslint"] = {
      lintCommand: "eslint . --report-unused-disable-directives --max-warnings 0 --config .eslintrc.cjs"
    };
  }
  return {
    root: __vite_injected_original_dirname,
    cacheDir: "../../node_modules/.vite/packages/twenty-front",
    server: {
      port: 3001,
      host: "localhost"
    },
    plugins: [
      react({ jsxImportSource: "@emotion/react" }),
      tsconfigPaths({
        projects: ["tsconfig.json", "../twenty-ui/tsconfig.json"]
      }),
      svgr(),
      checker(checkers),
      // TODO: fix this, we have to restrict the include to only the components that are using linaria
      // Otherwise the build will fail because wyw tries to include emotion styled components
      wyw({
        include: [
          "**/CurrencyDisplay.tsx",
          "**/EllipsisDisplay.tsx",
          "**/ContactLink.tsx",
          "**/BooleanDisplay.tsx",
          "**/LinksDisplay.tsx",
          "**/RoundedLink.tsx",
          "**/OverflowingTextWithTooltip.tsx",
          "**/Chip.tsx",
          "**/Tag.tsx",
          "**/MultiSelectFieldDisplay.tsx",
          "**/RatingInput.tsx",
          "**/RecordTableCellContainer.tsx",
          "**/RecordTableCellDisplayContainer.tsx",
          "**/Avatar.tsx",
          "**/RecordTableBodyDroppable.tsx",
          "**/RecordTableCellBaseContainer.tsx",
          "**/RecordTableCellTd.tsx",
          "**/RecordTableTd.tsx",
          "**/RecordTableHeaderDragDropColumn.tsx"
        ],
        babelOptions: {
          presets: ["@babel/preset-typescript", "@babel/preset-react"]
        }
      })
    ],
    build: {
      outDir: "build",
      sourcemap: VITE_BUILD_SOURCEMAP === "true"
    },
    envPrefix: "REACT_APP_",
    define: {
      "process.env": {
        REACT_APP_SERVER_BASE_URL
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvdHdlbnR5LWZyb250L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9jL1VzZXJzL0ZlbGlwZS93b3Jrc3BhY2UvTWluZEdyb3VwL0t2b2lwL2t2b2lwLXdlYi12Mi9wYWNrYWdlcy90d2VudHktZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9GZWxpcGUvd29ya3NwYWNlL01pbmRHcm91cC9Ldm9pcC9rdm9pcC13ZWItdjIvcGFja2FnZXMvdHdlbnR5LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy9GZWxpcGUvd29ya3NwYWNlL01pbmRHcm91cC9Ldm9pcC9rdm9pcC13ZWItdjIvcGFja2FnZXMvdHdlbnR5LWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCB3eXcgZnJvbSAnQHd5dy1pbi1qcy92aXRlJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5cclxudHlwZSBDaGVja2VycyA9IFBhcmFtZXRlcnM8dHlwZW9mIGNoZWNrZXI+WzBdO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xyXG5cclxuICAvKlxyXG4gICAgVXNpbmcgZXhwbGljaXQgZW52IHZhcmlhYmxlcywgdGhlcmUgaXMgbm8gbmVlZCB0byBleHBvc2UgYWxsIG9mIHRoZW0gKHNlY3VyaXR5KS5cclxuICAqL1xyXG4gIGNvbnN0IHsgUkVBQ1RfQVBQX1NFUlZFUl9CQVNFX1VSTCwgVklURV9CVUlMRF9TT1VSQ0VNQVAgfSA9IGVudjtcclxuXHJcbiAgY29uc3QgaXNCdWlsZENvbW1hbmQgPSBjb21tYW5kID09PSAnYnVpbGQnO1xyXG5cclxuICBjb25zdCBjaGVja2VyczogQ2hlY2tlcnMgPSB7XHJcbiAgICB0eXBlc2NyaXB0OiB7XHJcbiAgICAgIHRzY29uZmlnUGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vdHNjb25maWcuYXBwLmpzb24nKSxcclxuICAgIH0sXHJcbiAgICBvdmVybGF5OiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBpZiAoIWlzQnVpbGRDb21tYW5kKSB7XHJcbiAgICBjaGVja2Vyc1snZXNsaW50J10gPSB7XHJcbiAgICAgIGxpbnRDb21tYW5kOlxyXG4gICAgICAgICdlc2xpbnQgLiAtLXJlcG9ydC11bnVzZWQtZGlzYWJsZS1kaXJlY3RpdmVzIC0tbWF4LXdhcm5pbmdzIDAgLS1jb25maWcgLmVzbGludHJjLmNqcycsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJvb3Q6IF9fZGlybmFtZSxcclxuICAgIGNhY2hlRGlyOiAnLi4vLi4vbm9kZV9tb2R1bGVzLy52aXRlL3BhY2thZ2VzL3R3ZW50eS1mcm9udCcsXHJcblxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDEsXHJcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgfSxcclxuXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KHsganN4SW1wb3J0U291cmNlOiAnQGVtb3Rpb24vcmVhY3QnIH0pLFxyXG4gICAgICB0c2NvbmZpZ1BhdGhzKHtcclxuICAgICAgICBwcm9qZWN0czogWyd0c2NvbmZpZy5qc29uJywgJy4uL3R3ZW50eS11aS90c2NvbmZpZy5qc29uJ10sXHJcbiAgICAgIH0pLFxyXG4gICAgICBzdmdyKCksXHJcbiAgICAgIGNoZWNrZXIoY2hlY2tlcnMpLFxyXG4gICAgICAvLyBUT0RPOiBmaXggdGhpcywgd2UgaGF2ZSB0byByZXN0cmljdCB0aGUgaW5jbHVkZSB0byBvbmx5IHRoZSBjb21wb25lbnRzIHRoYXQgYXJlIHVzaW5nIGxpbmFyaWFcclxuICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBidWlsZCB3aWxsIGZhaWwgYmVjYXVzZSB3eXcgdHJpZXMgdG8gaW5jbHVkZSBlbW90aW9uIHN0eWxlZCBjb21wb25lbnRzXHJcbiAgICAgIHd5dyh7XHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgJyoqL0N1cnJlbmN5RGlzcGxheS50c3gnLFxyXG4gICAgICAgICAgJyoqL0VsbGlwc2lzRGlzcGxheS50c3gnLFxyXG4gICAgICAgICAgJyoqL0NvbnRhY3RMaW5rLnRzeCcsXHJcbiAgICAgICAgICAnKiovQm9vbGVhbkRpc3BsYXkudHN4JyxcclxuICAgICAgICAgICcqKi9MaW5rc0Rpc3BsYXkudHN4JyxcclxuICAgICAgICAgICcqKi9Sb3VuZGVkTGluay50c3gnLFxyXG4gICAgICAgICAgJyoqL092ZXJmbG93aW5nVGV4dFdpdGhUb29sdGlwLnRzeCcsXHJcbiAgICAgICAgICAnKiovQ2hpcC50c3gnLFxyXG4gICAgICAgICAgJyoqL1RhZy50c3gnLFxyXG4gICAgICAgICAgJyoqL011bHRpU2VsZWN0RmllbGREaXNwbGF5LnRzeCcsXHJcbiAgICAgICAgICAnKiovUmF0aW5nSW5wdXQudHN4JyxcclxuICAgICAgICAgICcqKi9SZWNvcmRUYWJsZUNlbGxDb250YWluZXIudHN4JyxcclxuICAgICAgICAgICcqKi9SZWNvcmRUYWJsZUNlbGxEaXNwbGF5Q29udGFpbmVyLnRzeCcsXHJcbiAgICAgICAgICAnKiovQXZhdGFyLnRzeCcsXHJcbiAgICAgICAgICAnKiovUmVjb3JkVGFibGVCb2R5RHJvcHBhYmxlLnRzeCcsXHJcbiAgICAgICAgICAnKiovUmVjb3JkVGFibGVDZWxsQmFzZUNvbnRhaW5lci50c3gnLFxyXG4gICAgICAgICAgJyoqL1JlY29yZFRhYmxlQ2VsbFRkLnRzeCcsXHJcbiAgICAgICAgICAnKiovUmVjb3JkVGFibGVUZC50c3gnLFxyXG4gICAgICAgICAgJyoqL1JlY29yZFRhYmxlSGVhZGVyRHJhZ0Ryb3BDb2x1bW4udHN4JyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGJhYmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgcHJlc2V0czogWydAYmFiZWwvcHJlc2V0LXR5cGVzY3JpcHQnLCAnQGJhYmVsL3ByZXNldC1yZWFjdCddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgICAgIHNvdXJjZW1hcDogVklURV9CVUlMRF9TT1VSQ0VNQVAgPT09ICd0cnVlJyxcclxuICAgIH0sXHJcblxyXG4gICAgZW52UHJlZml4OiAnUkVBQ1RfQVBQXycsXHJcblxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdwcm9jZXNzLmVudic6IHtcclxuICAgICAgICBSRUFDVF9BUFBfU0VSVkVSX0JBU0VfVVJMLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBtb2R1bGVzOiB7XHJcbiAgICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZU9ubHknLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrYSxPQUFPLFdBQVc7QUFDcGIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBTjFCLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBSzNDLFFBQU0sRUFBRSwyQkFBMkIscUJBQXFCLElBQUk7QUFFNUQsUUFBTSxpQkFBaUIsWUFBWTtBQUVuQyxRQUFNLFdBQXFCO0FBQUEsSUFDekIsWUFBWTtBQUFBLE1BQ1YsY0FBYyxLQUFLLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsSUFDN0Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYO0FBRUEsTUFBSSxDQUFDLGdCQUFnQjtBQUNuQixhQUFTLFFBQVEsSUFBSTtBQUFBLE1BQ25CLGFBQ0U7QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUVWLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxNQUFNLEVBQUUsaUJBQWlCLGlCQUFpQixDQUFDO0FBQUEsTUFDM0MsY0FBYztBQUFBLFFBQ1osVUFBVSxDQUFDLGlCQUFpQiw0QkFBNEI7QUFBQSxNQUMxRCxDQUFDO0FBQUEsTUFDRCxLQUFLO0FBQUEsTUFDTCxRQUFRLFFBQVE7QUFBQTtBQUFBO0FBQUEsTUFHaEIsSUFBSTtBQUFBLFFBQ0YsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDWixTQUFTLENBQUMsNEJBQTRCLHFCQUFxQjtBQUFBLFFBQzdEO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVyx5QkFBeUI7QUFBQSxJQUN0QztBQUFBLElBRUEsV0FBVztBQUFBLElBRVgsUUFBUTtBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1Asa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
