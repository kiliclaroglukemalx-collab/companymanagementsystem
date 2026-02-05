module.exports = [
"[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MicroHeader",
    ()=>MicroHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const navItems = [
    {
        id: "analytics",
        label: "Analizler"
    },
    {
        id: "arena",
        label: "Arena"
    },
    {
        id: "personnel",
        label: "Personel Merkezi"
    },
    {
        id: "schedule",
        label: "Mesai Takvimi"
    },
    {
        id: "education",
        label: "Egitim"
    },
    {
        id: "settings",
        label: "Ayarlar"
    }
];
function MicroHeader({ activeTab, onTabChange }) {
    const [isLogoExpanded, setIsLogoExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [isClockHovered, setIsClockHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setInterval(()=>setTime(new Date()), 1000);
        return ()=>clearInterval(timer);
    }, []);
    const formatTime = (date)=>{
        return date.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    };
    const formatDate = (date)=>{
        const days = [
            "Pazar",
            "Pazartesi",
            "Sali",
            "Carsamba",
            "Persembe",
            "Cuma",
            "Cumartesi"
        ];
        const months = [
            "Oca",
            "Sub",
            "Mar",
            "Nis",
            "May",
            "Haz",
            "Tem",
            "Agu",
            "Eyl",
            "Eki",
            "Kas",
            "Ara"
        ];
        return `${date.getDate()} ${months[date.getMonth()]} ${days[date.getDay()]}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-16 bg-[#FAFAFA] w-full flex items-center justify-between px-8 relative z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 cursor-pointer group",
                        onClick: ()=>setIsLogoExpanded(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "w-11 h-11 relative flex-shrink-0",
                                whileHover: {
                                    scale: 1.15,
                                    rotate: [
                                        0,
                                        -5,
                                        5,
                                        0
                                    ]
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                    rotate: {
                                        type: "tween",
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.png",
                                        alt: "CMS Logo",
                                        fill: true,
                                        className: "object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                        style: {
                                            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                                            filter: "blur(8px)",
                                            transform: "scale(1.5)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-neutral-900 tracking-[0.15em] group-hover:text-neutral-700 transition-colors",
                                        children: "CMS"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-medium text-neutral-500 tracking-[0.08em] -mt-0.5",
                                        children: "COMPANY MANAGEMENT SYSTEM"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex items-center gap-2",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>onTabChange(item.id),
                                className: `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${activeTab === item.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"}`,
                                whileHover: {
                                    scale: 1.02
                                },
                                whileTap: {
                                    scale: 0.98
                                },
                                children: [
                                    activeTab === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layoutId: "activeTab",
                                        className: "absolute inset-0 bg-neutral-200/80 rounded-lg",
                                        initial: false,
                                        transition: {
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 35
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "relative flex items-center gap-3 cursor-default select-none",
                        onMouseEnter: ()=>setIsClockHovered(true),
                        onMouseLeave: ()=>setIsClockHovered(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: isClockHovered ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 8
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    className: "text-[13px] font-medium text-neutral-500 tracking-wide min-w-[120px] text-right",
                                    children: formatDate(time)
                                }, "date", false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 8
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    className: "text-[15px] font-light text-neutral-600 tracking-[0.1em] min-w-[120px] text-right tabular-nums",
                                    style: {
                                        fontVariantNumeric: "tabular-nums"
                                    },
                                    children: formatTime(time)
                                }, "time", false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-4 bg-neutral-300"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                                style: {
                                    background: "rgba(16, 185, 129, 0.08)"
                                },
                                animate: {
                                    boxShadow: [
                                        "0 0 0 0 rgba(16, 185, 129, 0)",
                                        "0 0 0 4px rgba(16, 185, 129, 0.1)",
                                        "0 0 0 0 rgba(16, 185, 129, 0)"
                                    ]
                                },
                                transition: {
                                    duration: 2,
                                    repeat: Infinity
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "w-1.5 h-1.5 rounded-full bg-emerald-500",
                                        animate: {
                                            scale: [
                                                1,
                                                1.2,
                                                1
                                            ],
                                            opacity: [
                                                1,
                                                0.7,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 1,
                                            repeat: Infinity
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-semibold text-emerald-600 tracking-wider",
                                        children: "LIVE"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isLogoExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed inset-0 z-[100] flex items-center justify-center cursor-pointer",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    onClick: ()=>setIsLogoExpanded(false),
                    style: {
                        background: "rgba(0, 0, 0, 0.95)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 pointer-events-none",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                delay: 0.2,
                                duration: 0.5
                            },
                            style: {
                                background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this),
                        [
                            ...Array(8)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute w-1 h-1 rounded-full bg-blue-400/60",
                                initial: {
                                    opacity: 0,
                                    scale: 0
                                },
                                animate: {
                                    opacity: [
                                        0,
                                        1,
                                        0
                                    ],
                                    scale: [
                                        0,
                                        1,
                                        0
                                    ],
                                    x: [
                                        0,
                                        Math.cos(i * 45 * Math.PI / 180) * 200
                                    ],
                                    y: [
                                        0,
                                        Math.sin(i * 45 * Math.PI / 180) * 200
                                    ]
                                },
                                transition: {
                                    duration: 3,
                                    delay: i * 0.15,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }
                            }, i, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "relative",
                            initial: {
                                scale: 0.5,
                                opacity: 0,
                                rotateY: -180
                            },
                            animate: {
                                scale: 1,
                                opacity: 1,
                                rotateY: 0
                            },
                            exit: {
                                scale: 0.5,
                                opacity: 0,
                                rotateY: 180
                            },
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            },
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full",
                                    style: {
                                        width: "340px",
                                        height: "340px",
                                        marginLeft: "-20px",
                                        marginTop: "-20px",
                                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                                        filter: "blur(30px)"
                                    },
                                    animate: {
                                        scale: [
                                            1,
                                            1.1,
                                            1
                                        ],
                                        opacity: [
                                            0.5,
                                            0.8,
                                            0.5
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full",
                                    style: {
                                        width: "400px",
                                        height: "400px",
                                        marginLeft: "-50px",
                                        marginTop: "-50px",
                                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
                                        filter: "blur(40px)"
                                    },
                                    animate: {
                                        scale: [
                                            1.1,
                                            1,
                                            1.1
                                        ],
                                        opacity: [
                                            0.3,
                                            0.6,
                                            0.3
                                        ]
                                    },
                                    transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "relative w-[300px] h-[300px]",
                                    animate: {
                                        rotateZ: [
                                            0,
                                            360
                                        ]
                                    },
                                    transition: {
                                        duration: 60,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.png",
                                        alt: "CMS Logo",
                                        fill: true,
                                        className: "object-contain",
                                        style: {
                                            filter: "drop-shadow(0 0 40px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.3))"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                        lineNumber: 297,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: 0.3
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-bold tracking-[0.3em] mb-2",
                                            style: {
                                                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #60a5fa 100%)",
                                                backgroundSize: "200% 200%",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                animation: "gradient-shift 3s ease infinite"
                                            },
                                            children: "CMS"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-neutral-500 text-sm tracking-[0.2em] uppercase",
                                            children: "Company Management System"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-600 text-xs tracking-widest uppercase",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                delay: 0.5
                            },
                            children: "Kapatmak icin tiklayin"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                            lineNumber: 334,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Desktop/companymanagementsystem/lib/dashboard-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arenaLeagueData",
    ()=>arenaLeagueData,
    "brandDataWallMetrics",
    ()=>brandDataWallMetrics,
    "brandTickerData",
    ()=>brandTickerData,
    "brands",
    ()=>brands,
    "dashboardCards",
    ()=>dashboardCards,
    "getRankByPoints",
    ()=>getRankByPoints,
    "leagueActivities",
    ()=>leagueActivities,
    "leaguePlayers",
    ()=>leaguePlayers,
    "leagueRanks",
    ()=>leagueRanks,
    "navItems",
    ()=>navItems
]);
const brands = [
    {
        id: '1',
        name: 'BetMaster TR',
        status: 'active',
        themeColor: '#3b82f6',
        rgbGlow: 'rgba(59, 130, 246, 0.8)'
    },
    {
        id: '2',
        name: 'Casino Royal',
        status: 'inactive',
        themeColor: '#f59e0b',
        rgbGlow: 'rgba(245, 158, 11, 0.8)'
    },
    {
        id: '3',
        name: 'Spor Arena',
        status: 'inactive',
        themeColor: '#10b981',
        rgbGlow: 'rgba(16, 185, 129, 0.8)'
    },
    {
        id: '4',
        name: 'Lucky Stars',
        status: 'inactive',
        themeColor: '#ec4899',
        rgbGlow: 'rgba(236, 72, 153, 0.8)'
    },
    {
        id: '5',
        name: 'Golden Palace',
        status: 'inactive',
        themeColor: '#eab308',
        rgbGlow: 'rgba(234, 179, 8, 0.8)'
    },
    {
        id: '6',
        name: 'Diamond Bet',
        status: 'inactive',
        themeColor: '#06b6d4',
        rgbGlow: 'rgba(6, 182, 212, 0.8)'
    },
    {
        id: '7',
        name: 'Victory Games',
        status: 'inactive',
        themeColor: '#8b5cf6',
        rgbGlow: 'rgba(139, 92, 246, 0.8)'
    },
    {
        id: '8',
        name: 'Mega Win',
        status: 'inactive',
        themeColor: '#ef4444',
        rgbGlow: 'rgba(239, 68, 68, 0.8)'
    },
    {
        id: '9',
        name: 'Elite Casino',
        status: 'inactive',
        themeColor: '#a855f7',
        rgbGlow: 'rgba(168, 85, 247, 0.8)'
    },
    {
        id: '10',
        name: 'Jackpot City',
        status: 'inactive',
        themeColor: '#f97316',
        rgbGlow: 'rgba(249, 115, 22, 0.8)'
    },
    {
        id: '11',
        name: 'Royal Flush',
        status: 'inactive',
        themeColor: '#14b8a6',
        rgbGlow: 'rgba(20, 184, 166, 0.8)'
    },
    {
        id: '12',
        name: 'Bet Empire',
        status: 'inactive',
        themeColor: '#6366f1',
        rgbGlow: 'rgba(99, 102, 241, 0.8)'
    },
    {
        id: '13',
        name: 'Fortune Club',
        status: 'inactive',
        themeColor: '#84cc16',
        rgbGlow: 'rgba(132, 204, 22, 0.8)'
    },
    {
        id: '14',
        name: 'Star Casino',
        status: 'inactive',
        themeColor: '#d946ef',
        rgbGlow: 'rgba(217, 70, 239, 0.8)'
    },
    {
        id: '15',
        name: 'Thunder Bet',
        status: 'inactive',
        themeColor: '#0ea5e9',
        rgbGlow: 'rgba(14, 165, 233, 0.8)'
    },
    {
        id: '16',
        name: 'Platinum Play',
        status: 'inactive',
        themeColor: '#94a3b8',
        rgbGlow: 'rgba(148, 163, 184, 0.8)'
    },
    {
        id: '17',
        name: 'Crown Games',
        status: 'inactive',
        themeColor: '#fbbf24',
        rgbGlow: 'rgba(251, 191, 36, 0.8)'
    },
    {
        id: '18',
        name: 'Ace High',
        status: 'inactive',
        themeColor: '#22c55e',
        rgbGlow: 'rgba(34, 197, 94, 0.8)'
    },
    {
        id: '19',
        name: 'Neon Vegas',
        status: 'inactive',
        themeColor: '#f43f5e',
        rgbGlow: 'rgba(244, 63, 94, 0.8)'
    },
    {
        id: '20',
        name: 'Wild Card',
        status: 'inactive',
        themeColor: '#7c3aed',
        rgbGlow: 'rgba(124, 58, 237, 0.8)'
    },
    {
        id: '21',
        name: 'Cash Flow',
        status: 'inactive',
        themeColor: '#059669',
        rgbGlow: 'rgba(5, 150, 105, 0.8)'
    },
    {
        id: '22',
        name: 'Silver Edge',
        status: 'inactive',
        themeColor: '#64748b',
        rgbGlow: 'rgba(100, 116, 139, 0.8)'
    },
    {
        id: '23',
        name: 'Gold Rush',
        status: 'inactive',
        themeColor: '#ca8a04',
        rgbGlow: 'rgba(202, 138, 4, 0.8)'
    },
    {
        id: '24',
        name: 'Prime Slots',
        status: 'inactive',
        themeColor: '#2563eb',
        rgbGlow: 'rgba(37, 99, 235, 0.8)'
    },
    {
        id: '25',
        name: 'Lucky Spin',
        status: 'inactive',
        themeColor: '#db2777',
        rgbGlow: 'rgba(219, 39, 119, 0.8)'
    }
];
const navItems = [
    {
        id: 'analytics',
        label: 'ANALİTİK',
        icon: 'chart'
    },
    {
        id: 'arena',
        label: 'ARENA',
        icon: 'trophy'
    },
    {
        id: 'personnel',
        label: 'PERSONEL MERKEZİ',
        icon: 'users'
    },
    {
        id: 'schedule',
        label: 'MESAİ TAKVİMİ',
        icon: 'calendar'
    }
];
const brandTickerData = {
    '1': [
        "BETMASTER TR: Gunluk ciro +18% yukseldi",
        "AKTIF OYUNCU: 2,840 (Anlik)",
        "SPOR BAHIS: Futbol kategorisi lider",
        "CANLI BAHIS: 847 aktif etkinlik",
        "ODEME SISTEMI: Tum islemler stabil"
    ],
    '2': [
        "CASINO ROYAL: VIP oyuncu sayisi +24%",
        "JACKPOT HAVUZU: ₺1.2M aktif",
        "CANLI CASINO: 156 aktif masa",
        "SLOT PERFORMANS: %96.8 RTP ortalama",
        "OZEL TURNUVA: Haftalik finaller bugun"
    ],
    '3': [
        "SPOR ARENA: Canli mac sayisi 234",
        "BAHIS HACMI: ₺4.2M gunluk",
        "FUTBOL: Super Lig en populer",
        "BASKETBOL: NBA sezon finalleri aktif",
        "TENIS: Grand Slam ozel oranlari"
    ],
    '4': [
        "LUCKY STARS: Kampanya verimliligi %85",
        "BTAG PERFORMANSI: 12 aktif kampanya",
        "BONUS KULLANIM: %72 oran",
        "YENI KAYIT: Gunluk +340 uye",
        "PROMOSYON: Hosgeldin bonusu aktif"
    ],
    '5': [
        "GOLDEN PALACE: Altin uye sayisi +156",
        "VIP LOUNGE: 89 aktif oturum",
        "OZEL MASALAR: High roller aktif",
        "SADAKAT PUANI: 2.4M dagitildi",
        "CONCIERGE: 7/24 destek aktif"
    ],
    '6': [
        "DIAMOND BET: Premium segment +32%",
        "ELMAS SEVIYE: 234 uye",
        "OZEL ORANLAR: Secili maclarda aktif",
        "HIZLI CEKIM: Ortalama 12 dakika",
        "MUSTERI MEMNUNIYETI: %94"
    ],
    '7': [
        "VICTORY GAMES: E-spor bahisleri +45%",
        "CS2 TURNUVA: Major finalleri canli",
        "DOTA 2: TI ozel oranlari",
        "LOL: Worlds 2024 aktif",
        "VALORANT: Champions Tour canli"
    ],
    '8': [
        "MEGA WIN: Jackpot kazanani ₺890K",
        "SLOT TURNUVASI: 1,240 katilimci",
        "GUNUN OYUNU: Sweet Bonanza",
        "MEGA SPIN: 50 bedava donus aktif",
        "PROGRESSIVE: 3 jackpot havuzu"
    ],
    '9': [
        "ELITE CASINO: Ozel masa rezervasyonu aktif",
        "BLACKJACK VIP: 12 aktif masa",
        "RULET: Lightning Roulette populer",
        "BACCARAT: Squeeze modu aktif",
        "POKER: Texas Hold'em turnuvasi"
    ],
    '10': [
        "JACKPOT CITY: Gunluk ₺2.1M dagitim",
        "MEGA MOOLAH: ₺4.5M havuz",
        "DIVINE FORTUNE: Yerel jackpot aktif",
        "HALL OF GODS: Nordic jackpot",
        "KAZANAN SAYISI: Bugun 847"
    ],
    'default': [
        "SISTEM DURUMU: Tum moduller aktif",
        "CANLI VERI AKISI: Senkronize",
        "PERFORMANS: Optimum seviyede",
        "GUVENLIK: Tum sistemler guvenli",
        "SON GUNCELLEME: Veriler guncel"
    ]
};
const brandDataWallMetrics = {
    '1': {
        revenue: {
            daily: '₺847K',
            weekly: '₺4.2M',
            monthly: '₺18.5M',
            change: '+18%'
        },
        players: {
            active: '2,840',
            new: '340',
            vip: '156',
            retention: '%78'
        },
        btag: {
            campaigns: '12',
            conversion: '%4.2',
            cost: '₺45K',
            roi: '%284'
        },
        security: {
            status: 'green',
            alerts: '3',
            blocked: '12',
            verified: '%99.2'
        }
    },
    '2': {
        revenue: {
            daily: '₺1.2M',
            weekly: '₺6.8M',
            monthly: '₺28.4M',
            change: '+24%'
        },
        players: {
            active: '1,560',
            new: '220',
            vip: '89',
            retention: '%82'
        },
        btag: {
            campaigns: '8',
            conversion: '%5.1',
            cost: '₺62K',
            roi: '%312'
        },
        security: {
            status: 'green',
            alerts: '1',
            blocked: '8',
            verified: '%99.8'
        }
    },
    '3': {
        revenue: {
            daily: '₺4.2M',
            weekly: '₺21.5M',
            monthly: '₺86.2M',
            change: '+15%'
        },
        players: {
            active: '4,120',
            new: '520',
            vip: '234',
            retention: '%75'
        },
        btag: {
            campaigns: '18',
            conversion: '%3.8',
            cost: '₺78K',
            roi: '%256'
        },
        security: {
            status: 'green',
            alerts: '5',
            blocked: '23',
            verified: '%98.9'
        }
    },
    '4': {
        revenue: {
            daily: '₺520K',
            weekly: '₺2.8M',
            monthly: '₺11.2M',
            change: '+22%'
        },
        players: {
            active: '1,840',
            new: '340',
            vip: '67',
            retention: '%85'
        },
        btag: {
            campaigns: '15',
            conversion: '%6.2',
            cost: '₺32K',
            roi: '%345'
        },
        security: {
            status: 'green',
            alerts: '2',
            blocked: '5',
            verified: '%99.5'
        }
    },
    '5': {
        revenue: {
            daily: '₺2.1M',
            weekly: '₺10.5M',
            monthly: '₺42.8M',
            change: '+28%'
        },
        players: {
            active: '890',
            new: '156',
            vip: '234',
            retention: '%91'
        },
        btag: {
            campaigns: '6',
            conversion: '%8.4',
            cost: '₺95K',
            roi: '%420'
        },
        security: {
            status: 'green',
            alerts: '0',
            blocked: '2',
            verified: '%99.9'
        }
    },
    '6': {
        revenue: {
            daily: '₺680K',
            weekly: '₺3.4M',
            monthly: '₺14.2M',
            change: '+32%'
        },
        players: {
            active: '1,120',
            new: '180',
            vip: '156',
            retention: '%88'
        },
        btag: {
            campaigns: '10',
            conversion: '%5.8',
            cost: '₺48K',
            roi: '%298'
        },
        security: {
            status: 'green',
            alerts: '1',
            blocked: '4',
            verified: '%99.6'
        }
    },
    '7': {
        revenue: {
            daily: '₺1.8M',
            weekly: '₺9.2M',
            monthly: '₺38.5M',
            change: '+45%'
        },
        players: {
            active: '3,240',
            new: '680',
            vip: '178',
            retention: '%72'
        },
        btag: {
            campaigns: '22',
            conversion: '%4.5',
            cost: '₺56K',
            roi: '%312'
        },
        security: {
            status: 'green',
            alerts: '4',
            blocked: '18',
            verified: '%98.7'
        }
    },
    '8': {
        revenue: {
            daily: '₺890K',
            weekly: '₺4.5M',
            monthly: '₺18.8M',
            change: '+19%'
        },
        players: {
            active: '2,560',
            new: '420',
            vip: '89',
            retention: '%76'
        },
        btag: {
            campaigns: '14',
            conversion: '%4.8',
            cost: '₺42K',
            roi: '%276'
        },
        security: {
            status: 'yellow',
            alerts: '8',
            blocked: '34',
            verified: '%97.8'
        }
    },
    'default': {
        revenue: {
            daily: '₺1.2M',
            weekly: '₺6.5M',
            monthly: '₺26.4M',
            change: '+16%'
        },
        players: {
            active: '2,450',
            new: '380',
            vip: '145',
            retention: '%79'
        },
        btag: {
            campaigns: '12',
            conversion: '%4.8',
            cost: '₺52K',
            roi: '%295'
        },
        security: {
            status: 'green',
            alerts: '3',
            blocked: '15',
            verified: '%99.1'
        }
    }
};
const arenaLeagueData = [
    {
        id: '1',
        rank: 1,
        siteName: 'Golden Palace',
        siteColor: '#eab308',
        efficiencyScore: 94,
        btagROI: 420,
        retention: 91,
        riskScore: 'low',
        dailyPoints: 3,
        totalPoints: 87,
        trend: 'up',
        trendValue: 2
    },
    {
        id: '2',
        rank: 2,
        siteName: 'Victory Games',
        siteColor: '#8b5cf6',
        efficiencyScore: 89,
        btagROI: 312,
        retention: 72,
        riskScore: 'low',
        dailyPoints: 2,
        totalPoints: 82,
        trend: 'up',
        trendValue: 1
    },
    {
        id: '3',
        rank: 3,
        siteName: 'Lucky Stars',
        siteColor: '#ec4899',
        efficiencyScore: 87,
        btagROI: 345,
        retention: 85,
        riskScore: 'low',
        dailyPoints: 3,
        totalPoints: 79,
        trend: 'stable',
        trendValue: 0
    },
    {
        id: '4',
        rank: 4,
        siteName: 'Diamond Bet',
        siteColor: '#06b6d4',
        efficiencyScore: 85,
        btagROI: 298,
        retention: 88,
        riskScore: 'low',
        dailyPoints: 2,
        totalPoints: 74,
        trend: 'up',
        trendValue: 3
    },
    {
        id: '5',
        rank: 5,
        siteName: 'BetMaster TR',
        siteColor: '#3b82f6',
        efficiencyScore: 82,
        btagROI: 284,
        retention: 78,
        riskScore: 'low',
        dailyPoints: 1,
        totalPoints: 71,
        trend: 'down',
        trendValue: 1
    },
    {
        id: '6',
        rank: 6,
        siteName: 'Casino Royal',
        siteColor: '#f59e0b',
        efficiencyScore: 80,
        btagROI: 312,
        retention: 82,
        riskScore: 'low',
        dailyPoints: 2,
        totalPoints: 68,
        trend: 'stable',
        trendValue: 0
    },
    {
        id: '7',
        rank: 7,
        siteName: 'Spor Arena',
        siteColor: '#10b981',
        efficiencyScore: 78,
        btagROI: 256,
        retention: 75,
        riskScore: 'medium',
        dailyPoints: 1,
        totalPoints: 64,
        trend: 'down',
        trendValue: 2
    },
    {
        id: '8',
        rank: 8,
        siteName: 'Mega Win',
        siteColor: '#ef4444',
        efficiencyScore: 75,
        btagROI: 276,
        retention: 76,
        riskScore: 'medium',
        dailyPoints: 1,
        totalPoints: 59,
        trend: 'up',
        trendValue: 1
    },
    {
        id: '9',
        rank: 9,
        siteName: 'Elite Casino',
        siteColor: '#a855f7',
        efficiencyScore: 72,
        btagROI: 245,
        retention: 79,
        riskScore: 'low',
        dailyPoints: 2,
        totalPoints: 55,
        trend: 'stable',
        trendValue: 0
    },
    {
        id: '10',
        rank: 10,
        siteName: 'Jackpot City',
        siteColor: '#f97316',
        efficiencyScore: 68,
        btagROI: 234,
        retention: 71,
        riskScore: 'medium',
        dailyPoints: 1,
        totalPoints: 48,
        trend: 'down',
        trendValue: 3
    }
];
const leagueRanks = [
    {
        tier: 'iron',
        division: 'II',
        name: 'Demir II',
        minPoints: 0,
        maxPoints: 99,
        color: '#6b7280',
        gradient: 'linear-gradient(135deg, #4b5563 0%, #6b7280 50%, #9ca3af 100%)',
        icon: 'shield',
        glow: 'rgba(107, 114, 128, 0.5)'
    },
    {
        tier: 'iron',
        division: 'I',
        name: 'Demir I',
        minPoints: 100,
        maxPoints: 199,
        color: '#9ca3af',
        gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%)',
        icon: 'shield',
        glow: 'rgba(156, 163, 175, 0.5)'
    },
    {
        tier: 'bronze',
        division: 'II',
        name: 'Bronz II',
        minPoints: 200,
        maxPoints: 349,
        color: '#b45309',
        gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)',
        icon: 'medal',
        glow: 'rgba(180, 83, 9, 0.5)'
    },
    {
        tier: 'bronze',
        division: 'I',
        name: 'Bronz I',
        minPoints: 350,
        maxPoints: 499,
        color: '#d97706',
        gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
        icon: 'medal',
        glow: 'rgba(217, 119, 6, 0.5)'
    },
    {
        tier: 'silver',
        division: 'II',
        name: 'Gumus II',
        minPoints: 500,
        maxPoints: 699,
        color: '#64748b',
        gradient: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
        icon: 'award',
        glow: 'rgba(100, 116, 139, 0.5)'
    },
    {
        tier: 'silver',
        division: 'I',
        name: 'Gumus I',
        minPoints: 700,
        maxPoints: 899,
        color: '#94a3b8',
        gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
        icon: 'award',
        glow: 'rgba(148, 163, 184, 0.5)'
    },
    {
        tier: 'gold',
        division: 'II',
        name: 'Altin II',
        minPoints: 900,
        maxPoints: 1199,
        color: '#eab308',
        gradient: 'linear-gradient(135deg, #ca8a04 0%, #eab308 50%, #facc15 100%)',
        icon: 'crown',
        glow: 'rgba(234, 179, 8, 0.5)'
    },
    {
        tier: 'gold',
        division: 'I',
        name: 'Altin I',
        minPoints: 1200,
        maxPoints: 1499,
        color: '#facc15',
        gradient: 'linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%)',
        icon: 'crown',
        glow: 'rgba(250, 204, 21, 0.5)'
    },
    {
        tier: 'diamond',
        division: 'II',
        name: 'Elmas II',
        minPoints: 1500,
        maxPoints: 1899,
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
        icon: 'gem',
        glow: 'rgba(6, 182, 212, 0.5)'
    },
    {
        tier: 'diamond',
        division: 'I',
        name: 'Elmas I',
        minPoints: 1900,
        maxPoints: 2299,
        color: '#22d3ee',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%)',
        icon: 'gem',
        glow: 'rgba(34, 211, 238, 0.5)'
    },
    {
        tier: 'master',
        division: 'I',
        name: 'Ustat',
        minPoints: 2300,
        maxPoints: 99999,
        color: '#a855f7',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        icon: 'sparkles',
        glow: 'rgba(168, 85, 247, 0.5)'
    }
];
const getRankByPoints = (points)=>{
    for(let i = leagueRanks.length - 1; i >= 0; i--){
        if (points >= leagueRanks[i].minPoints) {
            return leagueRanks[i];
        }
    }
    return leagueRanks[0];
};
const leaguePlayers = [
    // Personnel
    {
        id: 'p1',
        name: 'Ahmet Yilmaz',
        avatar: '/avatars/1.jpg',
        role: 'personnel',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 2450,
        rank: leagueRanks[10],
        previousRank: leagueRanks[9],
        weeklyChange: 85,
        monthlyChange: 320,
        streak: 12,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 234,
            efficiency: 96,
            attendance: 98,
            performance: 94
        }
    },
    {
        id: 'p2',
        name: 'Zeynep Kaya',
        avatar: '/avatars/2.jpg',
        role: 'personnel',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 2180,
        rank: leagueRanks[9],
        previousRank: leagueRanks[9],
        weeklyChange: 45,
        monthlyChange: 180,
        streak: 8,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 198,
            efficiency: 92,
            attendance: 96,
            performance: 91
        }
    },
    {
        id: 'p3',
        name: 'Mehmet Demir',
        avatar: '/avatars/3.jpg',
        role: 'personnel',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 1950,
        rank: leagueRanks[9],
        previousRank: leagueRanks[10],
        weeklyChange: -65,
        monthlyChange: -120,
        streak: 0,
        isPromoted: false,
        isDemoted: true,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 156,
            efficiency: 88,
            attendance: 92,
            performance: 85
        }
    },
    {
        id: 'p4',
        name: 'Elif Ozturk',
        avatar: '/avatars/4.jpg',
        role: 'personnel',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u3',
        unitName: 'Satis',
        points: 1680,
        rank: leagueRanks[8],
        previousRank: leagueRanks[8],
        weeklyChange: 32,
        monthlyChange: 95,
        streak: 5,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 178,
            efficiency: 90,
            attendance: 94,
            performance: 88
        }
    },
    {
        id: 'p5',
        name: 'Can Arslan',
        avatar: '/avatars/5.jpg',
        role: 'personnel',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 1420,
        rank: leagueRanks[7],
        previousRank: leagueRanks[6],
        weeklyChange: 78,
        monthlyChange: 245,
        streak: 7,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 145,
            efficiency: 85,
            attendance: 90,
            performance: 82
        }
    },
    {
        id: 'p6',
        name: 'Selin Yildiz',
        avatar: '/avatars/6.jpg',
        role: 'personnel',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 1150,
        rank: leagueRanks[6],
        previousRank: leagueRanks[6],
        weeklyChange: 28,
        monthlyChange: 85,
        streak: 3,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 132,
            efficiency: 82,
            attendance: 88,
            performance: 80
        }
    },
    {
        id: 'p7',
        name: 'Burak Celik',
        avatar: '/avatars/7.jpg',
        role: 'personnel',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u3',
        unitName: 'Satis',
        points: 980,
        rank: leagueRanks[6],
        previousRank: leagueRanks[7],
        weeklyChange: -42,
        monthlyChange: -85,
        streak: 0,
        isPromoted: false,
        isDemoted: true,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 98,
            efficiency: 78,
            attendance: 85,
            performance: 75
        }
    },
    {
        id: 'p8',
        name: 'Deniz Sahin',
        avatar: '/avatars/8.jpg',
        role: 'personnel',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 750,
        rank: leagueRanks[5],
        previousRank: leagueRanks[5],
        weeklyChange: 18,
        monthlyChange: 65,
        streak: 2,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 87,
            efficiency: 75,
            attendance: 82,
            performance: 72
        }
    },
    {
        id: 'p9',
        name: 'Ayse Korkmaz',
        avatar: '/avatars/9.jpg',
        role: 'personnel',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u3',
        unitName: 'Satis',
        points: 520,
        rank: leagueRanks[4],
        previousRank: leagueRanks[3],
        weeklyChange: 55,
        monthlyChange: 140,
        streak: 4,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 76,
            efficiency: 72,
            attendance: 80,
            performance: 70
        }
    },
    {
        id: 'p10',
        name: 'Emre Yildirim',
        avatar: '/avatars/10.jpg',
        role: 'personnel',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 380,
        rank: leagueRanks[3],
        previousRank: leagueRanks[3],
        weeklyChange: 12,
        monthlyChange: 45,
        streak: 1,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 54,
            efficiency: 68,
            attendance: 78,
            performance: 65
        }
    },
    {
        id: 'p11',
        name: 'Fatma Aksoy',
        avatar: '/avatars/11.jpg',
        role: 'personnel',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u3',
        unitName: 'Satis',
        points: 220,
        rank: leagueRanks[2],
        previousRank: leagueRanks[2],
        weeklyChange: 8,
        monthlyChange: 32,
        streak: 1,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 42,
            efficiency: 65,
            attendance: 75,
            performance: 62
        }
    },
    {
        id: 'p12',
        name: 'Murat Eren',
        avatar: '/avatars/12.jpg',
        role: 'personnel',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 85,
        rank: leagueRanks[0],
        previousRank: leagueRanks[1],
        weeklyChange: -28,
        monthlyChange: -55,
        streak: 0,
        isPromoted: false,
        isDemoted: true,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 28,
            efficiency: 58,
            attendance: 70,
            performance: 55
        }
    },
    // Unit Managers
    {
        id: 'um1',
        name: 'Ali Ozdogan',
        avatar: '/avatars/13.jpg',
        role: 'unit_manager',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 2680,
        rank: leagueRanks[10],
        previousRank: leagueRanks[10],
        weeklyChange: 95,
        monthlyChange: 380,
        streak: 15,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 312,
            efficiency: 97,
            attendance: 99,
            performance: 96
        }
    },
    {
        id: 'um2',
        name: 'Hande Koc',
        avatar: '/avatars/14.jpg',
        role: 'unit_manager',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 2320,
        rank: leagueRanks[10],
        previousRank: leagueRanks[9],
        weeklyChange: 72,
        monthlyChange: 285,
        streak: 10,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 278,
            efficiency: 94,
            attendance: 97,
            performance: 93
        }
    },
    {
        id: 'um3',
        name: 'Kerem Aydin',
        avatar: '/avatars/15.jpg',
        role: 'unit_manager',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u3',
        unitName: 'Satis',
        points: 1850,
        rank: leagueRanks[8],
        previousRank: leagueRanks[8],
        weeklyChange: 48,
        monthlyChange: 165,
        streak: 6,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 245,
            efficiency: 91,
            attendance: 95,
            performance: 89
        }
    },
    {
        id: 'um4',
        name: 'Tugce Polat',
        avatar: '/avatars/16.jpg',
        role: 'unit_manager',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 1520,
        rank: leagueRanks[8],
        previousRank: leagueRanks[9],
        weeklyChange: -38,
        monthlyChange: -95,
        streak: 0,
        isPromoted: false,
        isDemoted: true,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 198,
            efficiency: 86,
            attendance: 92,
            performance: 84
        }
    },
    {
        id: 'um5',
        name: 'Serkan Tas',
        avatar: '/avatars/17.jpg',
        role: 'unit_manager',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: 'u1',
        unitName: 'Musteri Hizmetleri',
        points: 1180,
        rank: leagueRanks[6],
        previousRank: leagueRanks[6],
        weeklyChange: 25,
        monthlyChange: 78,
        streak: 3,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 165,
            efficiency: 83,
            attendance: 89,
            performance: 81
        }
    },
    {
        id: 'um6',
        name: 'Pinar Gunes',
        avatar: '/avatars/18.jpg',
        role: 'unit_manager',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: 'u2',
        unitName: 'Teknik Destek',
        points: 890,
        rank: leagueRanks[5],
        previousRank: leagueRanks[4],
        weeklyChange: 62,
        monthlyChange: 195,
        streak: 5,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 134,
            efficiency: 79,
            attendance: 86,
            performance: 77
        }
    },
    // General Managers
    {
        id: 'gm1',
        name: 'Ozge Basar',
        avatar: '/avatars/19.jpg',
        role: 'general_manager',
        siteId: '1',
        siteName: 'Golden Palace',
        unitId: '',
        unitName: 'Genel Yonetim',
        points: 2890,
        rank: leagueRanks[10],
        previousRank: leagueRanks[10],
        weeklyChange: 110,
        monthlyChange: 420,
        streak: 18,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 456,
            efficiency: 98,
            attendance: 100,
            performance: 97
        }
    },
    {
        id: 'gm2',
        name: 'Volkan Kaplan',
        avatar: '/avatars/20.jpg',
        role: 'general_manager',
        siteId: '2',
        siteName: 'Victory Games',
        unitId: '',
        unitName: 'Genel Yonetim',
        points: 2540,
        rank: leagueRanks[10],
        previousRank: leagueRanks[10],
        weeklyChange: 88,
        monthlyChange: 345,
        streak: 14,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 398,
            efficiency: 96,
            attendance: 98,
            performance: 95
        }
    },
    {
        id: 'gm3',
        name: 'Canan Duman',
        avatar: '/avatars/21.jpg',
        role: 'general_manager',
        siteId: '3',
        siteName: 'Lucky Stars',
        unitId: '',
        unitName: 'Genel Yonetim',
        points: 2180,
        rank: leagueRanks[9],
        previousRank: leagueRanks[8],
        weeklyChange: 95,
        monthlyChange: 380,
        streak: 11,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 345,
            efficiency: 93,
            attendance: 96,
            performance: 92
        }
    },
    // Admins
    {
        id: 'a1',
        name: 'Ozan Yalcin',
        avatar: '/avatars/22.jpg',
        role: 'admin',
        siteId: '',
        siteName: 'Sistem',
        unitId: '',
        unitName: 'IT Yonetimi',
        points: 3120,
        rank: leagueRanks[10],
        previousRank: leagueRanks[10],
        weeklyChange: 125,
        monthlyChange: 480,
        streak: 22,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 567,
            efficiency: 99,
            attendance: 100,
            performance: 98
        }
    },
    {
        id: 'a2',
        name: 'Berna Kara',
        avatar: '/avatars/23.jpg',
        role: 'admin',
        siteId: '',
        siteName: 'Sistem',
        unitId: '',
        unitName: 'Operasyon',
        points: 2780,
        rank: leagueRanks[10],
        previousRank: leagueRanks[10],
        weeklyChange: 98,
        monthlyChange: 395,
        streak: 16,
        isPromoted: false,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 489,
            efficiency: 97,
            attendance: 99,
            performance: 96
        }
    },
    {
        id: 'a3',
        name: 'Tamer Cetin',
        avatar: '/avatars/24.jpg',
        role: 'admin',
        siteId: '',
        siteName: 'Sistem',
        unitId: '',
        unitName: 'Guvenlik',
        points: 2450,
        rank: leagueRanks[10],
        previousRank: leagueRanks[9],
        weeklyChange: 82,
        monthlyChange: 320,
        streak: 12,
        isPromoted: true,
        isDemoted: false,
        lastActivity: new Date(),
        stats: {
            tasksCompleted: 412,
            efficiency: 95,
            attendance: 97,
            performance: 94
        }
    }
];
const leagueActivities = [
    {
        id: 'la1',
        playerId: 'p1',
        playerName: 'Ahmet Yilmaz',
        type: 'promoted',
        fromRank: leagueRanks[9],
        toRank: leagueRanks[10],
        message: 'Ahmet Yilmaz USTAT ligine yukseldi!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
        id: 'la2',
        playerId: 'p3',
        playerName: 'Mehmet Demir',
        type: 'demoted',
        fromRank: leagueRanks[10],
        toRank: leagueRanks[9],
        message: 'Mehmet Demir Elmas I ligine dustu',
        timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
        id: 'la3',
        playerId: 'um2',
        playerName: 'Hande Koc',
        type: 'promoted',
        fromRank: leagueRanks[9],
        toRank: leagueRanks[10],
        message: 'Hande Koc USTAT ligine yukseldi!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        id: 'la4',
        playerId: 'p5',
        playerName: 'Can Arslan',
        type: 'promoted',
        fromRank: leagueRanks[6],
        toRank: leagueRanks[7],
        message: 'Can Arslan Altin II ligine yukseldi',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
        id: 'la5',
        playerId: 'p7',
        playerName: 'Burak Celik',
        type: 'demoted',
        fromRank: leagueRanks[7],
        toRank: leagueRanks[6],
        message: 'Burak Celik Gumus I ligine dustu',
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
        id: 'la6',
        playerId: 'gm3',
        playerName: 'Canan Duman',
        type: 'promoted',
        fromRank: leagueRanks[8],
        toRank: leagueRanks[9],
        message: 'Canan Duman Elmas I ligine yukseldi',
        timestamp: new Date(Date.now() - 1000 * 60 * 90)
    },
    {
        id: 'la7',
        playerId: 'um4',
        playerName: 'Tugce Polat',
        type: 'demoted',
        fromRank: leagueRanks[9],
        toRank: leagueRanks[8],
        message: 'Tugce Polat Elmas II ligine dustu',
        timestamp: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
        id: 'la8',
        playerId: 'a3',
        playerName: 'Tamer Cetin',
        type: 'promoted',
        fromRank: leagueRanks[9],
        toRank: leagueRanks[10],
        message: 'Tamer Cetin USTAT ligine yukseldi!',
        timestamp: new Date(Date.now() - 1000 * 60 * 150)
    },
    {
        id: 'la9',
        playerId: 'p9',
        playerName: 'Ayse Korkmaz',
        type: 'promoted',
        fromRank: leagueRanks[3],
        toRank: leagueRanks[4],
        message: 'Ayse Korkmaz Gumus II ligine yukseldi',
        timestamp: new Date(Date.now() - 1000 * 60 * 180)
    },
    {
        id: 'la10',
        playerId: 'p12',
        playerName: 'Murat Eren',
        type: 'demoted',
        fromRank: leagueRanks[1],
        toRank: leagueRanks[0],
        message: 'Murat Eren Demir II ligine dustu',
        timestamp: new Date(Date.now() - 1000 * 60 * 210)
    }
];
const dashboardCards = [
    {
        id: 'aylik-simulasyon',
        title: 'AYLIK GENEL SİMÜLASYON',
        subtitle: 'Analitik Modülü',
        icon: 'brain',
        rank: 'I',
        glowColor: '#8b5cf6',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/genell.mp4',
        gradient: {
            from: '#9333ea',
            to: '#3b82f6',
            glow: 'rgba(59, 130, 246, 0.5)'
        },
        data: {
            mainValue: '₺2.4M',
            mainLabel: 'Toplam Gelir',
            stats: [
                {
                    label: 'Net Kâr',
                    value: '₺847K'
                },
                {
                    label: 'Yatırım',
                    value: '₺1.8M'
                },
                {
                    label: 'Çekim',
                    value: '₺956K'
                },
                {
                    label: 'Oran',
                    value: '%35.2'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 320
                },
                {
                    name: 'Şub',
                    value: 450
                },
                {
                    name: 'Mar',
                    value: 380
                },
                {
                    name: 'Nis',
                    value: 520
                },
                {
                    name: 'May',
                    value: 680
                },
                {
                    name: 'Haz',
                    value: 750
                }
            ]
        }
    },
    {
        id: 'finansal-analiz',
        title: 'FİNANSAL ANALİZ',
        subtitle: 'Analitik Modülü',
        icon: 'dollar',
        rank: 'II',
        glowColor: '#fbbf24',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/finans.mp4',
        gradient: {
            from: '#fbbf24',
            to: '#f8fafc',
            glow: 'rgba(251, 191, 36, 0.5)'
        },
        data: {
            mainValue: '₺142',
            mainLabel: 'ARPU',
            stats: [
                {
                    label: 'ROI',
                    value: '%284'
                },
                {
                    label: 'CAC',
                    value: '₺45'
                },
                {
                    label: 'LTV',
                    value: '₺890'
                },
                {
                    label: 'Aktif',
                    value: '12.4K'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 120
                },
                {
                    name: 'Şub',
                    value: 145
                },
                {
                    name: 'Mar',
                    value: 132
                },
                {
                    name: 'Nis',
                    value: 168
                },
                {
                    name: 'May',
                    value: 142
                },
                {
                    name: 'Haz',
                    value: 189
                }
            ]
        }
    },
    {
        id: 'bonus-btag',
        title: 'BONUS / BTAG ANALİZİ',
        subtitle: 'Analitik Modülü',
        icon: 'gift',
        rank: 'III',
        glowColor: '#ec4899',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/bonus.mp4',
        gradient: {
            from: '#ec4899',
            to: '#8b5cf6',
            glow: 'rgba(236, 72, 153, 0.5)'
        },
        data: {
            mainValue: '%96.4',
            mainLabel: 'Ortalama RTP',
            stats: [
                {
                    label: 'En Yüksek',
                    value: '%98.2'
                },
                {
                    label: 'En Düşük',
                    value: '%94.1'
                },
                {
                    label: 'Sağlayıcı',
                    value: '47'
                },
                {
                    label: 'Aktif Oyun',
                    value: '2.3K'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 96.2
                },
                {
                    name: 'Şub',
                    value: 95.8
                },
                {
                    name: 'Mar',
                    value: 96.5
                },
                {
                    name: 'Nis',
                    value: 96.1
                },
                {
                    name: 'May',
                    value: 96.8
                },
                {
                    name: 'Haz',
                    value: 96.4
                }
            ]
        }
    },
    {
        id: 'spor-analizi',
        title: 'SPOR ANALİZİ',
        subtitle: 'Analitik Modülü',
        icon: 'activity',
        rank: 'IV',
        glowColor: '#10b981',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/Gen-4_5%20A%20futuristic%20holographic%20visualization%20of%20real-time%20sports%20player%20tracking%20data%20on%20an%20abstract%20dark%20arena%20grid%20surface%20Glowing%20fiery%20orange%20and%20electric%20blue%20kinetic%20energy%20trails%20and%20heatmap.gen-4_5%20a%20futuristic%20holographic%20visuali.mp4',
        gradient: {
            from: '#10b981',
            to: '#f8fafc',
            glow: 'rgba(16, 185, 129, 0.5)'
        },
        data: {
            mainValue: '23',
            mainLabel: 'Aktif Uyarı',
            stats: [
                {
                    label: 'Kilitli',
                    value: '156'
                },
                {
                    label: 'Fraud',
                    value: '12'
                },
                {
                    label: 'İnceleme',
                    value: '34'
                },
                {
                    label: 'Çözüldü',
                    value: '89%'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 45
                },
                {
                    name: 'Şub',
                    value: 38
                },
                {
                    name: 'Mar',
                    value: 52
                },
                {
                    name: 'Nis',
                    value: 31
                },
                {
                    name: 'May',
                    value: 28
                },
                {
                    name: 'Haz',
                    value: 23
                }
            ]
        }
    },
    {
        id: 'casino-analizi',
        title: 'CASINO ANALİZİ',
        subtitle: 'Analitik Modülü',
        icon: 'gamepad',
        rank: 'V',
        glowColor: '#ef4444',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/casino.mp4',
        gradient: {
            from: '#ef4444',
            to: '#f59e0b',
            glow: 'rgba(239, 68, 68, 0.5)'
        },
        data: {
            mainValue: '%98.7',
            mainLabel: 'Başarı Oranı',
            stats: [
                {
                    label: 'İşlem',
                    value: '45.2K'
                },
                {
                    label: 'Hacim',
                    value: '₺8.4M'
                },
                {
                    label: 'Ort. Süre',
                    value: '2.3s'
                },
                {
                    label: 'Aktif',
                    value: '12'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 97.2
                },
                {
                    name: 'Şub',
                    value: 98.1
                },
                {
                    name: 'Mar',
                    value: 97.8
                },
                {
                    name: 'Nis',
                    value: 98.5
                },
                {
                    name: 'May',
                    value: 98.9
                },
                {
                    name: 'Haz',
                    value: 98.7
                }
            ]
        }
    },
    {
        id: 'oyuncular-analizi',
        title: 'OYUNCULAR ANALİZİ',
        subtitle: 'Analitik Modülü',
        icon: 'shield',
        rank: 'VI',
        glowColor: '#06b6d4',
        videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/random.mp4',
        gradient: {
            from: '#06b6d4',
            to: '#2563eb',
            glow: 'rgba(6, 182, 212, 0.5)'
        },
        data: {
            mainValue: '₺245K',
            mainLabel: 'Toplam Dağıtım',
            stats: [
                {
                    label: 'Kullanım',
                    value: '%72'
                },
                {
                    label: 'Wagering',
                    value: '₺1.2M'
                },
                {
                    label: 'Maliyet',
                    value: '₺89K'
                },
                {
                    label: 'Kampanya',
                    value: '8'
                }
            ],
            chartData: [
                {
                    name: 'Oca',
                    value: 180
                },
                {
                    name: 'Şub',
                    value: 220
                },
                {
                    name: 'Mar',
                    value: 195
                },
                {
                    name: 'Nis',
                    value: 240
                },
                {
                    name: 'May',
                    value: 260
                },
                {
                    name: 'Haz',
                    value: 245
                }
            ]
        }
    }
];
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HybridBrandSelector",
    ()=>HybridBrandSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/dashboard-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const AUTO_CYCLE_INTERVAL = 5000 // 5 seconds
;
function HybridBrandSelector({ selectedBrand, onBrandChange }) {
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAutoCyclePaused, setIsAutoCyclePaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slideDirection, setSlideDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("right");
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoCycleTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].findIndex((b)=>b.id === selectedBrand.id);
    const filteredBrands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!searchQuery.trim()) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].filter((brand)=>brand.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [
        searchQuery
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isSearchOpen && inputRef.current) {
            setTimeout(()=>inputRef.current?.focus(), 100);
        }
    }, [
        isSearchOpen
    ]);
    // Auto-cycle effect - Ghost Cycle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isSearchOpen || isAutoCyclePaused) {
            if (autoCycleTimeoutRef.current) {
                clearTimeout(autoCycleTimeoutRef.current);
            }
            return;
        }
        autoCycleTimeoutRef.current = setTimeout(()=>{
            const nextIndex = currentIndex === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].length - 1 ? 0 : currentIndex + 1;
            setSlideDirection("right");
            triggerMorphTransition(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"][nextIndex]);
        }, AUTO_CYCLE_INTERVAL);
        return ()=>{
            if (autoCycleTimeoutRef.current) {
                clearTimeout(autoCycleTimeoutRef.current);
            }
        };
    }, [
        isSearchOpen,
        isAutoCyclePaused,
        currentIndex
    ]);
    // Pause auto-cycle temporarily on user interaction
    const pauseAutoCycle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsAutoCyclePaused(true);
        setTimeout(()=>setIsAutoCyclePaused(false), 10000); // Resume after 10s of inactivity
    }, []);
    const triggerMorphTransition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newBrand)=>{
        if (newBrand.id === selectedBrand.id) return;
        setIsTransitioning(true);
        setTimeout(()=>{
            onBrandChange(newBrand);
            setTimeout(()=>setIsTransitioning(false), 500);
        }, 250);
    }, [
        selectedBrand.id,
        onBrandChange
    ]);
    const triggerLiquidTransition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newBrand)=>{
        if (newBrand.id === selectedBrand.id) return;
        setIsTransitioning(true);
        setTimeout(()=>{
            onBrandChange(newBrand);
            setTimeout(()=>setIsTransitioning(false), 500);
        }, 250);
    }, [
        selectedBrand.id,
        onBrandChange
    ]);
    const handlePrevious = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        pauseAutoCycle();
        setSlideDirection("left");
        const prevIndex = currentIndex === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].length - 1 : currentIndex - 1;
        triggerMorphTransition(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"][prevIndex]);
    }, [
        currentIndex,
        triggerMorphTransition,
        pauseAutoCycle
    ]);
    const handleNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        pauseAutoCycle();
        setSlideDirection("right");
        const nextIndex = currentIndex === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].length - 1 ? 0 : currentIndex + 1;
        triggerMorphTransition(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"][nextIndex]);
    }, [
        currentIndex,
        triggerMorphTransition,
        pauseAutoCycle
    ]);
    const handleSelectFromList = (brand)=>{
        pauseAutoCycle();
        triggerMorphTransition(brand);
        setIsSearchOpen(false);
        setSearchQuery("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full max-w-lg mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center justify-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: handlePrevious,
                        className: "relative w-12 h-12 rounded-full flex items-center justify-center border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm",
                        whileHover: {
                            scale: 1.1,
                            borderColor: selectedBrand.themeColor
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                className: "w-5 h-5 text-neutral-400"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-full pointer-events-none",
                                style: {
                                    background: `radial-gradient(circle, ${selectedBrand.rgbGlow}20, transparent 70%)`
                                },
                                initial: {
                                    opacity: 0
                                },
                                whileHover: {
                                    opacity: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: ()=>setIsSearchOpen(true),
                        className: "relative flex-1 max-w-xs py-4 px-6 rounded-full overflow-hidden",
                        style: {
                            background: "rgba(10, 10, 10, 0.9)",
                            backdropFilter: "blur(20px)"
                        },
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-full pointer-events-none",
                                style: {
                                    background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${selectedBrand.rgbGlow}30, transparent 70%)`
                                },
                                animate: {
                                    opacity: isTransitioning ? 0.8 : 0.4,
                                    scale: isTransitioning ? 1.2 : 1
                                },
                                transition: {
                                    duration: 0.4,
                                    ease: "easeOut"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: isTransitioning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute inset-0 rounded-full pointer-events-none",
                                    style: {
                                        background: `radial-gradient(circle at 50% 50%, ${selectedBrand.rgbGlow}60, transparent 60%)`
                                    },
                                    initial: {
                                        opacity: 0,
                                        scale: 0.5
                                    },
                                    animate: {
                                        opacity: [
                                            0,
                                            1,
                                            0
                                        ],
                                        scale: [
                                            0.5,
                                            1.5,
                                            2
                                        ]
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.6,
                                        ease: "easeOut"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-full pointer-events-none",
                                style: {
                                    border: `1px solid ${selectedBrand.themeColor}40`,
                                    boxShadow: `0 0 20px ${selectedBrand.rgbGlow}20, inset 0 0 20px ${selectedBrand.rgbGlow}10`
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 flex items-center justify-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center",
                                        style: {
                                            background: `linear-gradient(145deg, ${selectedBrand.themeColor}30, ${selectedBrand.themeColor}10)`,
                                            boxShadow: `0 0 15px ${selectedBrand.rgbGlow}30`
                                        },
                                        layoutId: "brand-icon-hybrid",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                            className: "w-4 h-4",
                                            style: {
                                                color: selectedBrand.themeColor
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-start overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                mode: "wait",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    className: "text-lg font-bold text-white tracking-tight",
                                                    initial: {
                                                        opacity: 0,
                                                        filter: "blur(16px)",
                                                        scale: 0.85,
                                                        x: slideDirection === "right" ? 30 : -30
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        filter: "blur(0px)",
                                                        scale: 1,
                                                        x: 0
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        filter: "blur(16px)",
                                                        scale: 0.85,
                                                        x: slideDirection === "right" ? -30 : 30
                                                    },
                                                    transition: {
                                                        duration: 0.4,
                                                        ease: [
                                                            0.34,
                                                            1.56,
                                                            0.64,
                                                            1
                                                        ]
                                                    },
                                                    children: selectedBrand.name
                                                }, selectedBrand.id, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 210,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                className: "text-[10px] font-medium tracking-wider uppercase",
                                                style: {
                                                    color: selectedBrand.themeColor
                                                },
                                                children: "Aktif"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "w-4 h-4 text-neutral-600 ml-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: handleNext,
                        className: "relative w-12 h-12 rounded-full flex items-center justify-center border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm",
                        whileHover: {
                            scale: 1.1,
                            borderColor: selectedBrand.themeColor
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-5 h-5 text-neutral-400"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-full pointer-events-none",
                                style: {
                                    background: `radial-gradient(circle, ${selectedBrand.rgbGlow}20, transparent 70%)`
                                },
                                initial: {
                                    opacity: 0
                                },
                                whileHover: {
                                    opacity: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-40",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>{
                                setIsSearchOpen(false);
                                setSearchQuery("");
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute top-full left-1/2 mt-4 w-full max-w-md rounded-3xl border border-neutral-800/50 overflow-hidden z-50",
                            style: {
                                background: "rgba(8, 8, 8, 0.98)",
                                backdropFilter: "blur(24px)",
                                boxShadow: `0 8px 60px rgba(0,0,0,0.8), 0 0 80px ${selectedBrand.rgbGlow}15`,
                                x: "-50%"
                            },
                            initial: {
                                opacity: 0,
                                y: -20,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                y: -20,
                                scale: 0.95
                            },
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 30
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative p-4 border-b border-neutral-800/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-5 h-5 text-neutral-500 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: inputRef,
                                                type: "text",
                                                value: searchQuery,
                                                onChange: (e)=>setSearchQuery(e.target.value),
                                                placeholder: "Site ara...",
                                                className: "flex-1 bg-transparent text-base text-white placeholder-neutral-600 focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: ()=>{
                                                    setIsSearchOpen(false);
                                                    setSearchQuery("");
                                                },
                                                className: "w-8 h-8 rounded-full flex items-center justify-center bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors",
                                                whileHover: {
                                                    scale: 1.1
                                                },
                                                whileTap: {
                                                    scale: 0.9
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-4 h-4 text-neutral-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 309,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-80 overflow-y-auto",
                                    children: filteredBrands.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-12 text-center text-sm text-neutral-600",
                                        children: "Sonuc bulunamadi"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-2",
                                        children: filteredBrands.map((brand, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: ()=>handleSelectFromList(brand),
                                                className: "relative w-full flex items-center gap-4 px-5 py-3 hover:bg-neutral-800/40 transition-colors group",
                                                initial: {
                                                    opacity: 0,
                                                    x: -10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: index * 0.02
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-3 h-3 rounded-full",
                                                                style: {
                                                                    backgroundColor: brand.themeColor
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 rounded-full opacity-50 blur-sm",
                                                                style: {
                                                                    backgroundColor: brand.themeColor,
                                                                    transform: "scale(2)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1 text-left text-sm font-medium transition-colors",
                                                        style: {
                                                            color: selectedBrand.id === brand.id ? brand.themeColor : "#d4d4d4"
                                                        },
                                                        children: brand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 25
                                                    }, this),
                                                    selectedBrand.id === brand.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            scale: 0
                                                        },
                                                        animate: {
                                                            scale: 1
                                                        },
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 30
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "w-4 h-4",
                                                            style: {
                                                                color: brand.themeColor
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "absolute inset-y-0 right-0 w-32 rounded-l-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity",
                                                        style: {
                                                            background: `linear-gradient(90deg, transparent, ${brand.rgbGlow}15)`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, brand.id, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                                lineNumber: 342,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 340,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-5 py-3 border-t border-neutral-800/50 bg-neutral-900/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-neutral-600 tracking-wider uppercase",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"].length,
                                            " site mevcut • Ok tuslari ile gezin"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/companymanagementsystem/lib/video-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoProvider",
    ()=>VideoProvider,
    "useVideoContext",
    ()=>useVideoContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const VideoContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function VideoProvider({ children }) {
    const [activeVideoId, setActiveVideoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusedCardId, setFocusedCardId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const setActiveVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setActiveVideoId(id);
    }, []);
    const setFocusedCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setFocusedCardId(id);
    }, []);
    const stopAllVideos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setActiveVideoId(null);
        setFocusedCardId(null);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoContext.Provider, {
        value: {
            activeVideoId,
            focusedCardId,
            setActiveVideo,
            setFocusedCard,
            stopAllVideos
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/lib/video-context.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function useVideoContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(VideoContext);
    if (!context) {
        throw new Error("useVideoContext must be used within VideoProvider");
    }
    return context;
}
}),
"[project]/Desktop/companymanagementsystem/hooks/use-media-optimization.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIntersectionObserver",
    ()=>useIntersectionObserver,
    "useIsMobile",
    ()=>useIsMobile,
    "useLazyVideo",
    ()=>useLazyVideo,
    "usePrefersReducedMotion",
    ()=>usePrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useIsMobile() {
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkMobile = ()=>{
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
            setIsMobile(isTouchDevice || isSmallScreen);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
}
function usePrefersReducedMotion() {
    const [prefersReduced, setPrefersReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);
        const handler = (e)=>setPrefersReduced(e.matches);
        mediaQuery.addEventListener('change', handler);
        return ()=>mediaQuery.removeEventListener('change', handler);
    }, []);
    return prefersReduced;
}
function useIntersectionObserver(options) {
    const [isIntersecting, setIsIntersecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasIntersected, setHasIntersected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry])=>{
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting && !hasIntersected) {
                setHasIntersected(true);
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        });
        observer.observe(element);
        return ()=>observer.disconnect();
    }, [
        hasIntersected,
        options
    ]);
    return {
        ref,
        isIntersecting,
        hasIntersected
    };
}
function useLazyVideo(videoUrl, isInViewport) {
    const [videoSrc, setVideoSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isInViewport && !videoSrc) {
            setVideoSrc(videoUrl);
        }
    }, [
        isInViewport,
        videoUrl,
        videoSrc
    ]);
    const handleLoadedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsLoaded(true);
    }, []);
    return {
        videoSrc,
        isLoaded,
        handleLoadedData
    };
}
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitrineCard",
    ()=>VitrineCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$video$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/video-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$hooks$2f$use$2d$media$2d$optimization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/hooks/use-media-optimization.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function VitrineCardComponent({ card, onClick, isPriority = false }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoError, setVideoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoLoaded, setVideoLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileFocusActive, setMobileFocusActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileFocusTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Hooks for optimization
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$hooks$2f$use$2d$media$2d$optimization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$hooks$2f$use$2d$media$2d$optimization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const { activeVideoId, focusedCardId, setActiveVideo, setFocusedCard } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$video$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVideoContext"])();
    // Intersection observer for lazy loading
    const { ref: intersectionRef, hasIntersected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$hooks$2f$use$2d$media$2d$optimization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIntersectionObserver"])();
    const isThisVideoActive = activeVideoId === card.id;
    const isThisCardFocused = focusedCardId === card.id;
    const isAnyCardFocused = focusedCardId !== null;
    const shouldDim = isAnyCardFocused && !isThisCardFocused;
    // Combined ref for intersection observer
    const setRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        intersectionRef.current = node;
        cardRef.current = node;
    }, [
        intersectionRef
    ]);
    const handleLoadedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setVideoLoaded(true);
    }, []);
    // Handle video playback - Desktop only, on hover
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const video = videoRef.current;
        if (!video || isMobile || prefersReducedMotion) return;
        if (isHovered && isThisVideoActive) {
            if (video.preload === "none") {
                video.preload = "auto";
                video.load();
            }
            video.play().catch(()=>{});
            setIsPlaying(true);
        } else {
            video.pause();
            video.currentTime = 0;
            setIsPlaying(false);
        }
    }, [
        isHovered,
        isThisVideoActive,
        isMobile,
        prefersReducedMotion
    ]);
    // Stop this video if another one becomes active
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (activeVideoId && activeVideoId !== card.id) {
            const video = videoRef.current;
            if (video) {
                video.pause();
                video.currentTime = 0;
                setIsPlaying(false);
            }
        }
    }, [
        activeVideoId,
        card.id
    ]);
    // Cleanup mobile focus timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (mobileFocusTimerRef.current) {
                clearTimeout(mobileFocusTimerRef.current);
            }
        };
    }, []);
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isMobile || prefersReducedMotion) return;
        setIsHovered(true);
        setActiveVideo(card.id);
        setFocusedCard(card.id);
    }, [
        isMobile,
        prefersReducedMotion,
        setActiveVideo,
        setFocusedCard,
        card.id
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsHovered(false);
        if (isThisVideoActive) {
            setActiveVideo(null);
        }
        if (isThisCardFocused) {
            setFocusedCard(null);
        }
    }, [
        isThisVideoActive,
        isThisCardFocused,
        setActiveVideo,
        setFocusedCard
    ]);
    // Mobile tap to play with focus effect
    const handleMobileTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!isMobile) return;
        // Prevent click from bubbling to card onClick
        e.stopPropagation();
        const video = videoRef.current;
        if (!video || !card.videoUrl) return;
        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
            setMobileFocusActive(false);
            setFocusedCard(null);
        } else {
            if (video.preload === "none") {
                video.preload = "auto";
                video.load();
            }
            setActiveVideo(card.id);
            setFocusedCard(card.id);
            setMobileFocusActive(true);
            video.play().catch(()=>setVideoError(true));
            setIsPlaying(true);
            // Auto-disable focus effect after 2.5 seconds on mobile
            if (mobileFocusTimerRef.current) {
                clearTimeout(mobileFocusTimerRef.current);
            }
            mobileFocusTimerRef.current = setTimeout(()=>{
                setMobileFocusActive(false);
                setFocusedCard(null);
            }, 2500);
        }
    }, [
        isMobile,
        card.videoUrl,
        card.id,
        isPlaying,
        setActiveVideo,
        setFocusedCard
    ]);
    const handleVideoError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setVideoError(true);
    }, []);
    // Determine visual states
    const isFocused = isHovered || mobileFocusActive;
    const showFocusOverlay = isFocused && isPlaying && !prefersReducedMotion;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: setRefs,
        layoutId: `card-${card.id}`,
        onPointerUp: (e)=>{
            if (e.button === 0 && !isMobile) {
                onClick();
            }
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: "relative select-none w-[320px] h-[220px] flex-shrink-0 rounded-3xl overflow-hidden group",
        style: {
            background: "#000000",
            willChange: "transform, opacity, filter",
            transformStyle: "preserve-3d",
            // Layered shadow - softer but deeper on hover
            boxShadow: isFocused && !prefersReducedMotion ? `0 8px 24px -6px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(0,0,0,0.35), 0 0 40px ${card.glowColor}15` : `0 2px 8px -2px rgba(0,0,0,0.2), 0 4px 16px -4px rgba(0,0,0,0.15)`,
            // Apple-like transition
            transition: "box-shadow 450ms cubic-bezier(0.2, 0.8, 0.2, 1)"
        },
        animate: !prefersReducedMotion ? {
            // Hover card: slight lift with 3D tilt (desktop), minimal on mobile
            scale: isFocused ? isMobile ? 1.015 : 1.03 : shouldDim ? isMobile ? 1 : 0.99 : 1,
            y: isFocused ? isMobile ? -3 : -6 : 0,
            rotateX: isFocused && !isMobile ? 2 : 0,
            // Very subtle dim for non-focused cards (almost none on mobile)
            opacity: shouldDim ? isMobile ? 0.95 : 0.9 : 1,
            filter: shouldDim ? isMobile ? "brightness(0.98)" : "brightness(0.95) saturate(0.9)" : "brightness(1) saturate(1)"
        } : undefined,
        whileTap: !prefersReducedMotion ? {
            scale: 0.98
        } : undefined,
        transition: {
            // Apple-style smooth easing
            duration: 0.45,
            ease: [
                0.2,
                0.8,
                0.2,
                1
            ]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isFocused && !prefersReducedMotion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute -inset-4 -z-10 rounded-[40px] pointer-events-none",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 0.6
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.45,
                        ease: [
                            0.2,
                            0.8,
                            0.2,
                            1
                        ]
                    },
                    style: {
                        background: `radial-gradient(ellipse at center, ${card.glowColor}25 0%, transparent 70%)`,
                        filter: "blur(24px)"
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 pointer-events-none z-30",
                initial: {
                    x: "-100%",
                    opacity: 0
                },
                animate: {
                    x: isHovered ? "200%" : "-100%",
                    opacity: isHovered ? 1 : 0
                },
                transition: {
                    duration: 0.8,
                    ease: [
                        0.4,
                        0,
                        0.2,
                        1
                    ]
                },
                style: {
                    background: `linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.05) 60%,
            transparent 80%
          )`,
                    width: "50%"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: `linear-gradient(135deg, ${card.gradient.from}30 0%, #000 50%, ${card.gradient.to}30 100%)`
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            hasIntersected && !videoError && card.videoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 origin-center",
                initial: {
                    opacity: 0,
                    scale: 1
                },
                animate: {
                    opacity: isFocused ? 1 : 0,
                    scale: isFocused && !prefersReducedMotion ? 1.08 : 1
                },
                transition: {
                    opacity: {
                        duration: 0.35,
                        ease: [
                            0.2,
                            0.8,
                            0.2,
                            1
                        ]
                    },
                    scale: {
                        duration: 0.45,
                        ease: [
                            0.2,
                            0.8,
                            0.2,
                            1
                        ]
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        preload: "none",
                        onLoadedData: handleLoadedData,
                        onError: handleVideoError,
                        className: "w-full h-full object-cover",
                        style: {
                            filter: "brightness(0.9) contrast(1.1) saturate(1.1)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            src: card.videoUrl,
                            type: "video/mp4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: `radial-gradient(
                ellipse 80% 80% at center,
                transparent 0%,
                transparent 40%,
                rgba(0,0,0,0.3) 70%,
                rgba(0,0,0,0.6) 100%
              )`
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 252,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showFocusOverlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-0 z-20 pointer-events-none",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.45,
                        ease: [
                            0.2,
                            0.8,
                            0.2,
                            1
                        ]
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: `radial-gradient(
                  ellipse 70% 70% at center,
                  transparent 0%,
                  transparent 50%,
                  rgba(0, 0, 0, 0.1) 75%,
                  rgba(0, 0, 0, 0.15) 100%
                )`
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 310,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                    lineNumber: 302,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            isMobile && card.videoUrl && !prefersReducedMotion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: !isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-0 flex items-center justify-center z-25",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: handleMobileTap,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-14 h-14 rounded-full flex items-center justify-center",
                        style: {
                            background: "rgba(255, 255, 255, 0.12)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
                        },
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            className: "w-6 h-6 text-white ml-1",
                            fill: "white"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                            lineNumber: 348,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 337,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                    lineNumber: 330,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 328,
                columnNumber: 9
            }, this),
            isMobile && isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute top-4 right-4 z-25",
                initial: {
                    opacity: 0,
                    scale: 0.8
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                onClick: handleMobileTap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-8 h-8 rounded-full flex items-center justify-center gap-0.5",
                    style: {
                        background: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(8px)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1 h-3 bg-white rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                            lineNumber: 370,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1 h-3 bg-white rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                    lineNumber: 363,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 357,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-15 h-full flex flex-col items-center justify-center p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h3, {
                        className: "text-center font-bold tracking-wide leading-tight",
                        style: {
                            fontSize: "24px",
                            letterSpacing: "0.08em",
                            background: `linear-gradient(135deg, ${card.gradient.from} 0%, ${card.gradient.to} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: `drop-shadow(0 0 20px ${card.gradient.glow}) drop-shadow(0 0 40px ${card.gradient.glow})`
                        },
                        initial: false,
                        animate: !prefersReducedMotion ? {
                            y: isFocused ? -40 : 0,
                            opacity: isFocused ? 0 : 1
                        } : undefined,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        },
                        layoutId: `title-${card.id}`,
                        children: card.title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: "text-center mt-4 text-xs font-medium uppercase",
                        style: {
                            color: "#666666",
                            letterSpacing: "0.25em"
                        },
                        initial: false,
                        animate: !prefersReducedMotion ? {
                            opacity: isFocused ? 0 : 1,
                            y: isFocused ? -20 : 0
                        } : undefined,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut"
                        },
                        layoutId: `subtitle-${card.id}`,
                        children: card.subtitle
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            !prefersReducedMotion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute bottom-0 left-0 right-0 h-[2px] z-20",
                initial: {
                    opacity: 0,
                    scaleX: 0
                },
                animate: {
                    opacity: isFocused ? 1 : 0,
                    scaleX: isFocused ? 1 : 0
                },
                transition: {
                    duration: 0.4,
                    ease: "easeOut"
                },
                style: {
                    background: `linear-gradient(90deg, transparent 5%, ${card.glowColor} 50%, transparent 95%)`,
                    boxShadow: `0 0 30px ${card.glowColor}60, 0 0 60px ${card.glowColor}30`
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 430,
                columnNumber: 9
            }, this),
            isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 h-16 z-30",
                onClick: (e)=>{
                    e.stopPropagation();
                    onClick();
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-4 left-1/2 -translate-x-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-white/40 uppercase tracking-wider",
                        children: "Detay icin dokun"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                        lineNumber: 458,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                    lineNumber: 457,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
                lineNumber: 450,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
const VitrineCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(VitrineCardComponent);
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SimpleCarousel",
    ()=>SimpleCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$vitrine$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/vitrine-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$video$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/video-context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const DRAG_THRESHOLD = 5 // pixels - if dragged more than this, it's a drag not a click
;
function SimpleCarousel({ cards, onCardClick }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dragStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const hasDragged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Mouse drag handlers
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!containerRef.current) return;
        setIsDragging(true);
        dragStartX.current = e.clientX;
        scrollStartX.current = containerRef.current.scrollLeft;
        hasDragged.current = false;
    }, []);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const dx = e.clientX - dragStartX.current;
        containerRef.current.scrollLeft = scrollStartX.current - dx;
        if (Math.abs(dx) > DRAG_THRESHOLD) {
            hasDragged.current = true;
        }
    }, [
        isDragging
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        // Reset hasDragged after a short delay to allow click events to check the flag
        setTimeout(()=>{
            hasDragged.current = false;
        }, 100);
    }, []);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isDragging) {
            setIsDragging(false);
            setTimeout(()=>{
                hasDragged.current = false;
            }, 100);
        }
    }, [
        isDragging
    ]);
    const handleCardClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((card)=>{
        // Only trigger click if we haven't dragged
        if (!hasDragged.current) {
            onCardClick(card);
        }
    }, [
        onCardClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$video$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VideoProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            style: {
                // Hide scrollbar while maintaining functionality
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch"
            },
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseLeave,
            className: "jsx-aaeb17c7ce19df29" + " " + `overflow-x-auto ${isDragging ? "cursor-grabbing" : "cursor-grab"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "aaeb17c7ce19df29",
                    children: "div.jsx-aaeb17c7ce19df29::-webkit-scrollbar{display:none}"
                }, void 0, false, void 0, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "flex gap-6 px-8 py-10",
                    style: {
                        perspective: "900px"
                    },
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: {
                        once: true,
                        margin: "-50px"
                    },
                    variants: {
                        hidden: {
                            opacity: 1
                        },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.05
                            }
                        }
                    },
                    children: cards.map((card, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "flex-shrink-0",
                            variants: {
                                hidden: {
                                    opacity: 0,
                                    y: 20
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0
                                }
                            },
                            transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$vitrine$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VitrineCard"], {
                                card: card,
                                onClick: ()=>handleCardClick(card),
                                isPriority: index < 2
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, card.id, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArenaSkeleton",
    ()=>ArenaSkeleton,
    "BrandSelectorSkeleton",
    ()=>BrandSelectorSkeleton,
    "CardSkeleton",
    ()=>CardSkeleton,
    "CarouselSkeleton",
    ()=>CarouselSkeleton,
    "DashboardSkeleton",
    ()=>DashboardSkeleton,
    "HeaderSkeleton",
    ()=>HeaderSkeleton,
    "MonolithSkeleton",
    ()=>MonolithSkeleton,
    "PersonnelSkeleton",
    ()=>PersonnelSkeleton,
    "ShiftCalendarSkeleton",
    ()=>ShiftCalendarSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
// Apple-style shimmer effect
const shimmer = {
    initial: {
        x: "-100%"
    },
    animate: {
        x: "100%"
    },
    transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
    }
};
// Base skeleton with shimmer
function SkeletonBase({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden bg-neutral-900 rounded-2xl ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute inset-0",
            style: {
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)"
            },
            initial: {
                x: "-100%"
            },
            animate: {
                x: "100%"
            },
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
            }
        }, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function HeaderSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-16 bg-white flex items-center justify-between px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-10 h-10 rounded-full !bg-neutral-100"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-32 h-4 !bg-neutral-100"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    1,
                    2,
                    3,
                    4,
                    5
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-20 h-4 !bg-neutral-100"
                    }, i, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function BrandSelectorSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-8 px-6 bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-10 h-10 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-64 h-14 rounded-2xl"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-10 h-10 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[350px] h-[280px] flex-shrink-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
            className: "w-full h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 h-full flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-24 h-3 mb-4 !bg-neutral-800"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-48 h-6 mb-2 !bg-neutral-800"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-32 h-4 !bg-neutral-800"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CarouselSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white py-10 px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                className: "w-40 h-3 mb-8 !bg-neutral-100"
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-6 overflow-hidden",
                children: [
                    1,
                    2,
                    3,
                    4
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardSkeleton, {}, i, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function DashboardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSkeleton, {}, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandSelectorSkeleton, {}, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselSkeleton, {}, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-64 bg-black"
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function ArenaSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-48 h-8 mb-8"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-6 mb-12",
                    children: [
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                            className: "h-64 rounded-3xl"
                        }, i, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-4",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                            className: "h-32 rounded-2xl"
                        }, i, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
function ShiftCalendarSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-64 h-8 mb-4"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-96 h-4 mb-8"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-full h-16 mb-8 rounded-xl"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-7 gap-4",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                            className: "h-96 rounded-2xl"
                        }, i, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
function PersonnelSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                    className: "w-64 h-8 mb-8"
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 mb-8",
                    children: [
                        1,
                        2,
                        3,
                        4
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                            className: "w-48 h-24 rounded-2xl"
                        }, i, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                            className: "h-20 rounded-xl"
                        }, i, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function MonolithSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-16 px-6 bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                className: "w-48 h-4 mb-2 mx-auto"
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                className: "w-64 h-8 mb-8 mx-auto"
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-2",
                children: [
                    1,
                    2,
                    3,
                    4,
                    5
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBase, {
                        className: "w-40 h-36 rounded-2xl"
                    }, i, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/companymanagementsystem/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$micro$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/micro-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/theme-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$hybrid$2d$brand$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/hybrid-brand-selector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$simple$2d$carousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/simple-carousel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$ui$2f$skeleton$2d$loaders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/ui/skeleton-loaders.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/dashboard-data.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
"use client";
;
;
;
;
;
;
;
;
;
;
// Dynamic imports for heavy components - Apple style lazy loading
const NeonExpandedView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/neon-expanded-view.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const LivingDataFooter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/living-data-footer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DataWallModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/data-wall-modal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ArenaLeagueSystem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/arena-league-system.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$ui$2f$skeleton$2d$loaders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArenaSkeleton"], {}, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
            lineNumber: 39,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
const ShiftCalendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$ui$2f$skeleton$2d$loaders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShiftCalendarSkeleton"], {}, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
            lineNumber: 47,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
const PersonnelCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/personnel-center.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$ui$2f$skeleton$2d$loaders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PersonnelSkeleton"], {}, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
            lineNumber: 55,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
const GlobalPerformanceMonolith = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$ui$2f$skeleton$2d$loaders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonolithSkeleton"], {}, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
            lineNumber: 63,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
const SettingsPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/settings-panel.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const AnnouncementPopup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/Desktop/companymanagementsystem/components/dashboard/announcement-popup.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
// Optimized page transitions - GPU accelerated
const pageTransition = {
    initial: {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform"
    },
    animate: {
        opacity: 1,
        y: 0,
        willChange: "auto"
    },
    exit: {
        opacity: 0,
        y: -20,
        willChange: "opacity, transform"
    },
    transition: {
        duration: 0.4,
        ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.25, 0.1, 0.25, 1)
    }
};
function DashboardPage() {
    const { currentTheme, settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$theme$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("analytics");
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brands"][0]);
    const [selectedCard, setSelectedCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDataWallOpen, setIsDataWallOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lockedBrand, setLockedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleTabChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tab)=>{
        setActiveTab(tab);
    }, []);
    const handleBrandChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((brand)=>{
        setSelectedBrand(brand);
    }, []);
    const handleCardClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((card)=>{
        setSelectedCard(card);
    }, []);
    const handleCloseExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSelectedCard(null);
    }, []);
    const handleOpenDataWall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setLockedBrand(selectedBrand);
        setIsDataWallOpen(true);
    }, [
        selectedBrand
    ]);
    const handleCloseDataWall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDataWallOpen(false);
        setLockedBrand(null);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayoutGroup"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen overflow-hidden transition-all duration-500",
            style: {
                background: currentTheme ? currentTheme.gradient : '#000000'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$micro$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MicroHeader"], {
                    activeTab: activeTab,
                    onTabChange: handleTabChange
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        activeTab === "analytics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "relative py-8 px-6",
                                    style: {
                                        background: "#000000"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$hybrid$2d$brand$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HybridBrandSelector"], {
                                        selectedBrand: selectedBrand,
                                        onBrandChange: handleBrandChange
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "relative",
                                    style: {
                                        background: "#FFFFFF",
                                        minHeight: "420px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-10 pb-2 px-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                                                className: "text-xs font-semibold text-neutral-500 tracking-[0.25em] uppercase",
                                                initial: {
                                                    opacity: 0,
                                                    y: 10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                transition: {
                                                    delay: 0.1
                                                },
                                                children: "Analitik Modulleri"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$components$2f$dashboard$2f$simple$2d$carousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SimpleCarousel"], {
                                            cards: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardCards"],
                                            onCardClick: handleCardClick
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "flex justify-center pb-8",
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            transition: {
                                                delay: 0.5
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "w-6 h-0.5 rounded-full bg-neutral-300",
                                                        animate: {
                                                            x: [
                                                                0,
                                                                -4,
                                                                0
                                                            ]
                                                        },
                                                        transition: {
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Kaydirin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "w-6 h-0.5 rounded-full bg-neutral-300",
                                                        animate: {
                                                            x: [
                                                                0,
                                                                4,
                                                                0
                                                            ]
                                                        },
                                                        transition: {
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LivingDataFooter, {
                                    selectedBrand: selectedBrand,
                                    onOpenDataWall: handleOpenDataWall
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalPerformanceMonolith, {}, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "analytics", true, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this),
                        activeTab === "arena" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArenaLeagueSystem, {}, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                lineNumber: 203,
                                columnNumber: 15
                            }, this)
                        }, "arena", false, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        activeTab === "schedule" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShiftCalendar, {
                                isManager: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)
                        }, "schedule", false, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        activeTab === "personnel" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PersonnelCenter, {
                                isManager: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this)
                        }, "personnel", false, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this),
                        activeTab === "education" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-h-[60vh] flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center",
                                            style: {
                                                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))',
                                                border: '1px solid rgba(168, 85, 247, 0.3)'
                                            },
                                            animate: {
                                                scale: [
                                                    1,
                                                    1.05,
                                                    1
                                                ],
                                                rotate: [
                                                    0,
                                                    5,
                                                    -5,
                                                    0
                                                ]
                                            },
                                            transition: {
                                                duration: 4,
                                                repeat: Infinity
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-12 h-12 text-purple-400",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 1.5,
                                                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-light text-white mb-2",
                                            children: "Egitim Merkezi"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 239,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-neutral-500 mb-6",
                                            children: "Cok Yakinda..."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                                            style: {
                                                background: 'rgba(168, 85, 247, 0.1)',
                                                border: '1px solid rgba(168, 85, 247, 0.2)',
                                                color: '#a855f7'
                                            },
                                            animate: {
                                                opacity: [
                                                    0.7,
                                                    1,
                                                    0.7
                                                ]
                                            },
                                            transition: {
                                                duration: 2,
                                                repeat: Infinity
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-purple-500 animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this),
                                                "Gelistirme Asamasinda"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this)
                        }, "education", false, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        activeTab === "settings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            ...pageTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsPanel, {}, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this)
                        }, "settings", false, {
                            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                            lineNumber: 260,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: selectedCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeonExpandedView, {
                        card: selectedCard,
                        onClose: handleCloseExpanded
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                        lineNumber: 269,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: isDataWallOpen && lockedBrand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DataWallModal, {
                        isOpen: isDataWallOpen,
                        onClose: handleCloseDataWall,
                        selectedBrand: lockedBrand
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                        lineNumber: 275,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnnouncementPopup, {}, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/app/page.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_companymanagementsystem_2f154b5d._.js.map