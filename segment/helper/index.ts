import {env} from '../corePlugins';
export const classList = {
  accessibility: {
    ".sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    },
    ".not-sr-only": {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      whiteSpace: "normal",
    }
  },
  pointerEvents: {
    ".pointer-events-none": { "pointer-events": "none" },
    ".pointer-events-auto": { "pointer-events": "auto" },
  },
  visibility: {
    ".visible": { visibility: "visible" },
    ".invisible": { visibility: "hidden" },
    ".collapse": { visibility: "collapse" },
  },
  position: {
    ".static": { position: "static" },
    ".fixed": { position: "fixed" },
    ".absolute": { position: "absolute" },
    ".relative": { position: "relative" },
    ".sticky": { position: "sticky" },
  },
  insetProperties: [
    ["inset", ["inset"]],
    [
      ["inset-x", ["left", "right"]],
      ["inset-y", ["top", "bottom"]],
    ],
    [
      ["start", ["inset-inline-start"]],
      ["end", ["inset-inline-end"]],
      ["top", ["top"]],
      ["right", ["right"]],
      ["bottom", ["bottom"]],
      ["left", ["left"]],
    ],
  ],
  isolation: {
    ".isolate": { isolation: "isolate" },
    ".isolation-auto": { isolation: "auto" },
  },
  zIndexProperties: [["z", ["zIndex"]]],
  grid: {
    columnProperties: [["col", ["gridColumn"]]],
    columnStartProperties: [["col-start", ["gridColumnStart"]],],
    columnEndProperties: [["col-end", ["gridColumnEnd"]],],
    rowProperties: [["row", ["gridRow"]]],
    rowStartProperties: [["row-start", ["gridRowStart"]],],
    rowEndProperties: [["row-end", ["gridRowEnd"]],],
  },
  float: {
    ".float-start": { float: "inline-start" },
    ".float-end": { float: "inline-end" },
    ".float-right": { float: "right" },
    ".float-left": { float: "left" },
    ".float-none": { float: "none" },
  },
  clear: {
    ".clear-start": { clear: "inline-start" },
    ".clear-end": { clear: "inline-end" },
    ".clear-left": { clear: "left" },
    ".clear-right": { clear: "right" },
    ".clear-both": { clear: "both" },
    ".clear-none": { clear: "none" },
  },
  marginProperties: [
    ["m", ["margin"]],
    [
      ["mx", ["margin-left", "margin-right"]],
      ["my", ["margin-top", "margin-bottom"]],
    ],
    [
      ["ms", ["margin-inline-start"]],
      ["me", ["margin-inline-end"]],
      ["mt", ["margin-top"]],
      ["mr", ["margin-right"]],
      ["mb", ["margin-bottom"]],
      ["ml", ["margin-left"]],
    ],
  ],
  boxSizing: {
    ".box-border": { "box-sizing": "border-box" },
    ".box-content": { "box-sizing": "content-box" },
  },
  lineComp: {
    ".line-clamp-none": {
      overflow: "visible",
      display: "block",
      "-webkit-box-orient": "horizontal",
      "-webkit-line-clamp": "none",
    },
  },
  display: {
    ".block": { display: "block" },
    ".inline-block": { display: "inline-block" },
    ".inline": { display: "inline" },
    ".flex": { display: "flex" },
    ".inline-flex": { display: "inline-flex" },
    ".table": { display: "table" },
    ".inline-table": { display: "inline-table" },
    ".table-caption": { display: "table-caption" },
    ".table-cell": { display: "table-cell" },
    ".table-column": { display: "table-column" },
    ".table-column-group": { display: "table-column-group" },
    ".table-footer-group": { display: "table-footer-group" },
    ".table-header-group": { display: "table-header-group" },
    ".table-row-group": { display: "table-row-group" },
    ".table-row": { display: "table-row" },
    ".flow-root": { display: "flow-root" },
    ".grid": { display: "grid" },
    ".inline-grid": { display: "inline-grid" },
    ".contents": { display: "contents" },
    ".list-item": { display: "list-item" },
    ".hidden": { display: "none" },
  },
  aspectRatio: [["aspect", ["aspect-ratio"]],],
  size: [["size", ["width", "height"]]],
  height: {
    base: [["h", ["height"]]],
    min: [["min-h", ["minHeight"]]],
    max: [["max-h", ["maxHeight"]]]
  },
  width: {
    base: [["w", ["width"]]],
    min: [["min-w", ["minWidth"]]],
    max: [["max-w", ["maxWidth"]]]
  },
  flex: {
    shrink: [
      ["flex-shrink", ["flex-shrink"]], // Deprecated
      ["shrink", ["flex-shrink"]],
    ],
    grow: [
      ["flex-grow", ["flex-grow"]], // Deprecated
      ["grow", ["flex-grow"]],
    ],
    basis: [["basis", ["flex-basis"]]]
  },
  tableLayout: {
    ".table-auto": { "table-layout": "auto" },
    ".table-fixed": { "table-layout": "fixed" },
  },
  captionSide: {
    ".caption-top": { "caption-side": "top" },
    ".caption-bottom": { "caption-side": "bottom" },
  },
  borderCollapse: {
    ".border-collapse": { "border-collapse": "collapse" },
    ".border-separate": { "border-collapse": "separate" },
  },
  borderSpacing: {
    defaults: {
      "--sg-border-spacing-x": 0,
      "--sg-border-spacing-y": 0,
    }
  },

}
