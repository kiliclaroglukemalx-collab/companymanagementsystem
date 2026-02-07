(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LivingDataFooter",
    ()=>LivingDataFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/dashboard-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function LivingDataFooter({ selectedBrand, onOpenDataWall }) {
    _s();
    // Get brand-specific ticker data or default
    const tickerItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LivingDataFooter.useMemo[tickerItems]": ()=>{
            if (selectedBrand) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brandTickerData"][selectedBrand.id] || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brandTickerData"]['default'];
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brandTickerData"]['default'];
        }
    }["LivingDataFooter.useMemo[tickerItems]"], [
        selectedBrand
    ]);
    // Duplicate items for seamless loop
    const duplicatedItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LivingDataFooter.useMemo[duplicatedItems]": ()=>[
                ...tickerItems,
                ...tickerItems
            ]
    }["LivingDataFooter.useMemo[duplicatedItems]"], [
        tickerItems
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative overflow-hidden cursor-pointer group",
        style: {
            height: "180px",
            background: "#000000"
        },
        onClick: onOpenDataWall,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 h-px",
                style: {
                    background: "linear-gradient(90deg, transparent 0%, #1a1a1a 20%, #3b3b3b 50%, #1a1a1a 80%, transparent 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                className: "absolute inset-0 w-full h-full object-cover",
                src: "https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/arka%20plan.mp4",
                muted: true,
                loop: true,
                playsInline: true,
                autoPlay: true,
                preload: "auto",
                style: {
                    opacity: 0.35,
                    filter: "brightness(0.8) contrast(1.1)"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 h-full flex flex-col justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                            className: "text-[10px] font-medium tracking-[0.3em] uppercase",
                            style: {
                                color: "rgba(255,255,255,0.4)"
                            },
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                delay: 0.5
                            },
                            children: "Canli Veri Akisi"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none",
                                style: {
                                    background: "linear-gradient(to right, #000000 0%, transparent 100%)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none",
                                style: {
                                    background: "linear-gradient(to left, #000000 0%, transparent 100%)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex items-center gap-16 whitespace-nowrap",
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        x: [
                                            0,
                                            -50 * tickerItems.length + "%"
                                        ]
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    transition: {
                                        opacity: {
                                            duration: 0.3
                                        },
                                        y: {
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        },
                                        x: {
                                            duration: 40,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: 0.3
                                        }
                                    },
                                    children: duplicatedItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "flex items-center gap-4",
                                            initial: {
                                                opacity: 0,
                                                y: 15
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: index % tickerItems.length * 0.1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "w-1.5 h-1.5 rounded-full",
                                                    animate: {
                                                        opacity: [
                                                            0.4,
                                                            1,
                                                            0.4
                                                        ],
                                                        scale: [
                                                            1,
                                                            1.2,
                                                            1
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: index * 0.3
                                                    },
                                                    style: {
                                                        backgroundColor: selectedBrand?.themeColor || "#10b981",
                                                        boxShadow: `0 0 8px ${selectedBrand?.rgbGlow || "rgba(16, 185, 129, 0.6)"}`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-light tracking-wide",
                                                    style: {
                                                        color: "rgba(255,255,255,0.85)",
                                                        textShadow: "0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)"
                                                    },
                                                    children: item
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, `${selectedBrand?.id || 'default'}-${index}`, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this))
                                }, selectedBrand?.id || 'default', false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                            className: "text-[9px] font-mono tracking-wider",
                            style: {
                                color: "rgba(255,255,255,0.25)"
                            },
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                delay: 0.8
                            },
                            children: [
                                "Son Guncelleme: ",
                                new Date().toLocaleTimeString('tr-TR'),
                                " UTC+3"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(LivingDataFooter, "JSL8CdY26jxZu8xsf7//GyXsoaI=");
_c = LivingDataFooter;
var _c;
__turbopack_context__.k.register(_c, "LivingDataFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=3d860_companymanagementsystem_components_dashboard_living-data-footer_tsx_df76f6ff._.js.map