(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalPerformanceMonolith",
    ()=>GlobalPerformanceMonolith
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Equal$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/equal.js [app-client] (ecmascript) <export default as Equal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const flowSteps = [
    {
        id: "deposit",
        label: "GELEN PARA",
        turkishLabel: "Yatirimlar",
        description: "Musterilerden gelen toplam para",
        value: 12847650,
        prefix: "₺",
        type: "income",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        id: "withdrawal",
        label: "GIDEN PARA",
        turkishLabel: "Cekimler",
        description: "Musterilere odenen miktar",
        value: 8234120,
        prefix: "₺",
        type: "expense",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        id: "commission",
        label: "BANKA KESINTISI",
        turkishLabel: "Komisyon",
        description: "Odeme sistemleri payi",
        value: 129340,
        prefix: "₺",
        type: "fee",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
    },
    {
        id: "expenses",
        label: "ISLETME GIDERI",
        turkishLabel: "Faturalar",
        description: "Maas, kira, yazilim vs.",
        value: 1250000,
        prefix: "₺",
        type: "expense",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
    },
    {
        id: "netProfit",
        label: "NET KAZANC",
        turkishLabel: "Kalan Para",
        description: "Cebimize kalan net tutar",
        value: 3234190,
        prefix: "₺",
        type: "result",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"]
    }
];
// Animated counter
function AnimatedValue({ value, prefix = "", isLarge = false, color = "white" }) {
    _s();
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedValue.useEffect": ()=>{
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval({
                "AnimatedValue.useEffect.timer": ()=>{
                    current += increment;
                    if (current >= value) {
                        setDisplayValue(value);
                        clearInterval(timer);
                    } else {
                        setDisplayValue(current);
                    }
                }
            }["AnimatedValue.useEffect.timer"], duration / steps);
            return ({
                "AnimatedValue.useEffect": ()=>clearInterval(timer)
            })["AnimatedValue.useEffect"];
        }
    }["AnimatedValue.useEffect"], [
        value
    ]);
    const formatNumber = (num)=>{
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(0) + "K";
        return num.toLocaleString("tr-TR");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `font-bold tabular-nums ${isLarge ? "text-[28px]" : "text-[22px]"}`,
        style: {
            color
        },
        children: [
            prefix,
            formatNumber(displayValue)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AnimatedValue, "4hUZowD5MfzMUTSh4rovgv/1zfU=");
_c = AnimatedValue;
// Flow connector arrow - compact version
function FlowArrow({ type, isAnimating }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "flex flex-col items-center justify-center px-1 shrink-0",
        initial: {
            opacity: 0,
            scale: 0.5
        },
        animate: {
            opacity: isAnimating ? 1 : 0.3,
            scale: 1
        },
        transition: {
            delay: 0.8,
            duration: 0.5
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "w-8 h-8 rounded-full flex items-center justify-center",
            style: {
                background: type === "minus" ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
                border: `1px solid ${type === "minus" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`
            },
            animate: isAnimating ? {
                scale: [
                    1,
                    1.1,
                    1
                ]
            } : {},
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
            },
            children: type === "minus" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                size: 16,
                className: "text-red-400",
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 146,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Equal$3e$__["Equal"], {
                size: 16,
                className: "text-emerald-400",
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 148,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c1 = FlowArrow;
// Individual metric card
function MetricCard({ step, index, isHovered, onHover, isVisible }) {
    const getTypeStyles = ()=>{
        switch(step.type){
            case "income":
                return {
                    gradient: "from-emerald-500/20 to-emerald-500/5",
                    border: "border-emerald-500/30",
                    glow: "rgba(16, 185, 129, 0.4)",
                    iconBg: "rgba(16, 185, 129, 0.2)",
                    valueColor: "#34d399",
                    labelColor: "#6ee7b7"
                };
            case "expense":
                return {
                    gradient: "from-red-500/20 to-red-500/5",
                    border: "border-red-500/30",
                    glow: "rgba(239, 68, 68, 0.4)",
                    iconBg: "rgba(239, 68, 68, 0.2)",
                    valueColor: "#f87171",
                    labelColor: "#fca5a5"
                };
            case "fee":
                return {
                    gradient: "from-amber-500/20 to-amber-500/5",
                    border: "border-amber-500/30",
                    glow: "rgba(245, 158, 11, 0.4)",
                    iconBg: "rgba(245, 158, 11, 0.2)",
                    valueColor: "#fbbf24",
                    labelColor: "#fcd34d"
                };
            case "result":
                return {
                    gradient: "from-yellow-400/30 via-amber-300/20 to-yellow-500/10",
                    border: "border-yellow-400/50",
                    glow: "rgba(250, 204, 21, 0.6)",
                    iconBg: "rgba(250, 204, 21, 0.25)",
                    valueColor: "#fde047",
                    labelColor: "#fef08a"
                };
            default:
                return {
                    gradient: "from-white/10 to-white/5",
                    border: "border-white/20",
                    glow: "rgba(255, 255, 255, 0.3)",
                    iconBg: "rgba(255, 255, 255, 0.1)",
                    valueColor: "#ffffff",
                    labelColor: "#e5e5e5"
                };
        }
    };
    const styles = getTypeStyles();
    const isResult = step.type === "result";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: `relative flex-1 min-w-0 ${isResult ? "flex-[1.15]" : ""}`,
        initial: {
            opacity: 0,
            y: 50
        },
        animate: {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 50
        },
        transition: {
            delay: 0.3 + index * 0.15,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
        },
        onMouseEnter: ()=>onHover(step.id),
        onMouseLeave: ()=>onHover(null),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: `relative h-full rounded-2xl overflow-hidden cursor-default
          bg-gradient-to-b ${styles.gradient} ${styles.border} border
          backdrop-blur-xl transition-all duration-300`,
            style: {
                boxShadow: isHovered ? `0 0 40px ${styles.glow}, 0 20px 40px rgba(0,0,0,0.3)` : "0 10px 30px rgba(0,0,0,0.2)"
            },
            animate: {
                scale: isHovered ? 1.02 : 1,
                y: isHovered ? -5 : 0
            },
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            },
            children: [
                isResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: "linear-gradient(45deg, transparent 30%, rgba(250,204,21,0.1) 50%, transparent 70%)",
                        backgroundSize: "200% 200%"
                    },
                    animate: {
                        backgroundPosition: [
                            "0% 0%",
                            "200% 200%"
                        ]
                    },
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                    lineNumber: 257,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 p-4 h-full flex flex-col min-h-[140px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                            style: {
                                background: styles.iconBg
                            },
                            animate: isHovered ? {
                                scale: [
                                    1,
                                    1.1,
                                    1
                                ]
                            } : {},
                            transition: {
                                duration: 0.5
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(step.icon, {
                                size: 20,
                                style: {
                                    color: styles.valueColor
                                },
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-0.5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-bold tracking-[0.15em]",
                                style: {
                                    color: styles.labelColor
                                },
                                children: step.label
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-medium text-white/50",
                                children: step.turkishLabel
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex items-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedValue, {
                                value: step.value,
                                prefix: step.prefix,
                                isLarge: isResult,
                                color: styles.valueColor
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
            lineNumber: 240,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_c2 = MetricCard;
function GlobalPerformanceMonolith() {
    _s1();
    const [hoveredMetric, setHoveredMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalPerformanceMonolith.useEffect": ()=>{
            const timer = setTimeout({
                "GlobalPerformanceMonolith.useEffect.timer": ()=>setIsVisible(true)
            }["GlobalPerformanceMonolith.useEffect.timer"], 300);
            return ({
                "GlobalPerformanceMonolith.useEffect": ()=>clearTimeout(timer)
            })["GlobalPerformanceMonolith.useEffect"];
        }
    }["GlobalPerformanceMonolith.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative w-full py-16 overflow-hidden",
        style: {
            background: "#000000"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none opacity-[0.03]",
                style: {
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "px-10 mb-10",
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20
                },
                transition: {
                    delay: 0.1,
                    duration: 0.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500",
                                children: "Aylik Finansal Ozet"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[28px] font-light text-white tracking-tight",
                        children: "Para Nasil Akiyor?"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] text-neutral-500 mt-1",
                        children: "Bu ay basından bugune kadar paranin yolculugu"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-stretch gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            step: flowSteps[0],
                            index: 0,
                            isHovered: hoveredMetric === flowSteps[0].id,
                            onHover: setHoveredMetric,
                            isVisible: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowArrow, {
                            type: "minus",
                            isAnimating: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            step: flowSteps[1],
                            index: 1,
                            isHovered: hoveredMetric === flowSteps[1].id,
                            onHover: setHoveredMetric,
                            isVisible: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowArrow, {
                            type: "minus",
                            isAnimating: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            step: flowSteps[2],
                            index: 2,
                            isHovered: hoveredMetric === flowSteps[2].id,
                            onHover: setHoveredMetric,
                            isVisible: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowArrow, {
                            type: "minus",
                            isAnimating: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            step: flowSteps[3],
                            index: 3,
                            isHovered: hoveredMetric === flowSteps[3].id,
                            onHover: setHoveredMetric,
                            isVisible: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 406,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowArrow, {
                            type: "equals",
                            isAnimating: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            step: flowSteps[4],
                            index: 4,
                            isHovered: hoveredMetric === flowSteps[4].id,
                            onHover: setHoveredMetric,
                            isVisible: isVisible
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                    lineNumber: 368,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "px-10 mt-10 flex justify-center",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: isVisible ? 1 : 0
                },
                transition: {
                    delay: 1.5,
                    duration: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex items-center gap-3 px-6 py-3 rounded-full",
                    style: {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-emerald-400 font-semibold text-[13px]",
                            children: "Gelen"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            size: 14,
                            className: "text-neutral-600"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 443,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-400 font-semibold text-[13px]",
                            children: "Giden"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 444,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            size: 14,
                            className: "text-neutral-600"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-amber-400 font-semibold text-[13px]",
                            children: "Kesinti"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 446,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            size: 14,
                            className: "text-neutral-600"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 447,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-400 font-semibold text-[13px]",
                            children: "Gider"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Equal$3e$__["Equal"], {
                            size: 14,
                            className: "text-neutral-600"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-yellow-400 font-bold text-[13px]",
                            children: "Net Kar"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute bottom-0 left-0 right-0 h-px",
                style: {
                    background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.3), transparent)"
                },
                initial: {
                    scaleX: 0
                },
                animate: {
                    scaleX: isVisible ? 1 : 0
                },
                transition: {
                    delay: 2,
                    duration: 1
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_s1(GlobalPerformanceMonolith, "tUgMJzXQk7mJJG56MW/Y6gNjFNo=");
_c3 = GlobalPerformanceMonolith;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AnimatedValue");
__turbopack_context__.k.register(_c1, "FlowArrow");
__turbopack_context__.k.register(_c2, "MetricCard");
__turbopack_context__.k.register(_c3, "GlobalPerformanceMonolith");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/global-performance-monolith.tsx [app-client] (ecmascript)"));
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Minus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Minus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Minus", [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ]
]);
;
 //# sourceMappingURL=minus.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Minus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript)");
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/equal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Equal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Equal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Equal", [
    [
        "line",
        {
            x1: "5",
            x2: "19",
            y1: "9",
            y2: "9",
            key: "1nwqeh"
        }
    ],
    [
        "line",
        {
            x1: "5",
            x2: "19",
            y1: "15",
            y2: "15",
            key: "g8yjpy"
        }
    ]
]);
;
 //# sourceMappingURL=equal.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/equal.js [app-client] (ecmascript) <export default as Equal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Equal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/equal.js [app-client] (ecmascript)");
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Wallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Wallet", [
    [
        "path",
        {
            d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
            key: "18etb6"
        }
    ],
    [
        "path",
        {
            d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
            key: "xoc0q4"
        }
    ]
]);
;
 //# sourceMappingURL=wallet.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript)");
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Users", [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "path",
        {
            d: "M16 3.13a4 4 0 0 1 0 7.75",
            key: "1da9ce"
        }
    ]
]);
;
 //# sourceMappingURL=users.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Users",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)");
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Receipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Receipt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Receipt", [
    [
        "path",
        {
            d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
            key: "q3az6g"
        }
    ],
    [
        "path",
        {
            d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
            key: "1h4pet"
        }
    ],
    [
        "path",
        {
            d: "M12 17.5v-11",
            key: "1jc1ny"
        }
    ]
]);
;
 //# sourceMappingURL=receipt.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Receipt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript)");
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Crown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Crown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Crown", [
    [
        "path",
        {
            d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
            key: "1vdc57"
        }
    ],
    [
        "path",
        {
            d: "M5 21h14",
            key: "11awu3"
        }
    ]
]);
;
 //# sourceMappingURL=crown.js.map
}),
"[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Crown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_companymanagementsystem_d88a5f94._.js.map