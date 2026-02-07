(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShiftCalendar",
    ()=>ShiftCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/lib/dashboard-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Chronos Module Color Palette
const COLORS = {
    background: "#000000",
    electricBlue: "#3B82F6",
    champagneGold: "#D4AF37",
    goldLight: "#F5E6C8",
    glass: "rgba(255, 255, 255, 0.03)",
    glassBorder: "rgba(255, 255, 255, 0.08)",
    glassHover: "rgba(255, 255, 255, 0.06)"
};
// Department data with images
const departments = [
    {
        id: 'risk',
        name: 'Risk',
        image: '/departments/risk.png',
        color: '#3b82f6',
        personnel: 45,
        active: 38
    },
    {
        id: 'bonus',
        name: 'Bonus',
        image: '/departments/bonus.png',
        color: '#f59e0b',
        personnel: 32,
        active: 28
    },
    {
        id: 'canli-destek',
        name: 'Canli Destek',
        image: '/departments/canli-destek.png',
        color: '#10b981',
        personnel: 78,
        active: 65
    },
    {
        id: 'finans',
        name: 'Finans',
        image: '/departments/finans.png',
        color: '#8b5cf6',
        personnel: 24,
        active: 22
    },
    {
        id: 'call-center',
        name: 'Call Center',
        image: '/departments/call-center.png',
        color: '#06b6d4',
        personnel: 156,
        active: 142
    },
    {
        id: 'marketing',
        name: 'Marketing',
        image: '/departments/marketing.png',
        color: '#ec4899',
        personnel: 38,
        active: 31
    }
];
// Generate 80 random staff names for simulation
const turkishFirstNames = [
    "Ahmet",
    "Mehmet",
    "Ali",
    "Mustafa",
    "Huseyin",
    "Hasan",
    "Ibrahim",
    "Ismail",
    "Osman",
    "Yusuf",
    "Omer",
    "Murat",
    "Emre",
    "Burak",
    "Fatih",
    "Serkan",
    "Kemal",
    "Ayse",
    "Fatma",
    "Emine",
    "Hatice",
    "Zeynep",
    "Elif",
    "Merve",
    "Esra",
    "Seda",
    "Gamze",
    "Derya",
    "Ozge",
    "Tugba",
    "Sibel",
    "Selin",
    "Deniz",
    "Ece",
    "Irem",
    "Melis",
    "Buse",
    "Gizem",
    "Ceren",
    "Damla"
];
const turkishLastNames = [
    "Yilmaz",
    "Kaya",
    "Demir",
    "Celik",
    "Sahin",
    "Yildiz",
    "Yildirim",
    "Ozturk",
    "Aydin",
    "Ozdemir",
    "Arslan",
    "Dogan",
    "Kilic",
    "Aslan",
    "Cetin",
    "Kara",
    "Koc",
    "Kurt",
    "Ozkan",
    "Simsek",
    "Polat",
    "Korkmaz",
    "Karatas",
    "Cinar",
    "Unal",
    "Acar",
    "Aktas",
    "Erdogan",
    "Gunes",
    "Tekin"
];
const generateStaffList = ()=>{
    const staff = [];
    for(let i = 0; i < 80; i++){
        const firstName = turkishFirstNames[Math.floor(Math.random() * turkishFirstNames.length)];
        const lastName = turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)];
        const shiftStart = Math.floor(Math.random() * 24);
        const shiftDuration = [
            6,
            8,
            10,
            12
        ][Math.floor(Math.random() * 4)];
        staff.push({
            id: i + 1,
            name: `${firstName} ${lastName}`,
            lp: Math.floor(Math.random() * 2500) + 500,
            shiftStart,
            shiftEnd: (shiftStart + shiftDuration) % 24,
            department: departments[Math.floor(Math.random() * departments.length)].id
        });
    }
    return staff;
};
const allStaff = generateStaffList();
// Mock data - will be replaced with real API data in Cursor
const mockShifts = [
    {
        id: "morning",
        name: "Sabah",
        time: "08:00 - 16:00",
        color: "#34d399"
    },
    {
        id: "afternoon",
        name: "Ogle",
        time: "16:00 - 00:00",
        color: "#60a5fa"
    },
    {
        id: "night",
        name: "Gece",
        time: "00:00 - 08:00",
        color: "#a78bfa"
    }
];
const mockWeekData = [
    {
        day: "Pazartesi",
        date: "27",
        shifts: [
            {
                shiftId: "morning",
                personnel: 12,
                maxPersonnel: 15
            },
            {
                shiftId: "afternoon",
                personnel: 10,
                maxPersonnel: 12
            },
            {
                shiftId: "night",
                personnel: 6,
                maxPersonnel: 8
            }
        ]
    },
    {
        day: "Sali",
        date: "28",
        shifts: [
            {
                shiftId: "morning",
                personnel: 14,
                maxPersonnel: 15
            },
            {
                shiftId: "afternoon",
                personnel: 11,
                maxPersonnel: 12
            },
            {
                shiftId: "night",
                personnel: 7,
                maxPersonnel: 8
            }
        ]
    },
    {
        day: "Carsamba",
        date: "29",
        shifts: [
            {
                shiftId: "morning",
                personnel: 13,
                maxPersonnel: 15
            },
            {
                shiftId: "afternoon",
                personnel: 12,
                maxPersonnel: 12
            },
            {
                shiftId: "night",
                personnel: 5,
                maxPersonnel: 8
            }
        ]
    },
    {
        day: "Persembe",
        date: "30",
        shifts: [
            {
                shiftId: "morning",
                personnel: 15,
                maxPersonnel: 15
            },
            {
                shiftId: "afternoon",
                personnel: 9,
                maxPersonnel: 12
            },
            {
                shiftId: "night",
                personnel: 8,
                maxPersonnel: 8
            }
        ]
    },
    {
        day: "Cuma",
        date: "31",
        shifts: [
            {
                shiftId: "morning",
                personnel: 11,
                maxPersonnel: 15
            },
            {
                shiftId: "afternoon",
                personnel: 10,
                maxPersonnel: 12
            },
            {
                shiftId: "night",
                personnel: 6,
                maxPersonnel: 8
            }
        ]
    },
    {
        day: "Cumartesi",
        date: "1",
        shifts: [
            {
                shiftId: "morning",
                personnel: 8,
                maxPersonnel: 10
            },
            {
                shiftId: "afternoon",
                personnel: 8,
                maxPersonnel: 10
            },
            {
                shiftId: "night",
                personnel: 4,
                maxPersonnel: 6
            }
        ]
    },
    {
        day: "Pazar",
        date: "2",
        shifts: [
            {
                shiftId: "morning",
                personnel: 6,
                maxPersonnel: 10
            },
            {
                shiftId: "afternoon",
                personnel: 7,
                maxPersonnel: 10
            },
            {
                shiftId: "night",
                personnel: 4,
                maxPersonnel: 6
            }
        ]
    }
];
const mockPendingRequests = [
    {
        id: "1",
        type: "leave",
        employeeName: "Ahmet Yilmaz",
        date: "28 Ocak",
        reason: "Kisisel",
        status: "pending"
    },
    {
        id: "2",
        type: "shift",
        employeeName: "Ayse Demir",
        date: "29 Ocak",
        fromShift: "Gece",
        toShift: "Sabah",
        status: "pending"
    },
    {
        id: "3",
        type: "leave",
        employeeName: "Mehmet Kaya",
        date: "30-31 Ocak",
        reason: "Saglik",
        status: "pending"
    }
];
// Staff Health Ring Component (Apple Watch Style)
function StaffHealthRing({ active, total, size = 60, color = COLORS.electricBlue }) {
    const percentage = active / total * 100;
    const strokeWidth = size * 0.12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - percentage / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                className: "transform -rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        fill: "none",
                        stroke: "rgba(255,255,255,0.1)",
                        strokeWidth: strokeWidth
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        fill: "none",
                        stroke: color,
                        strokeWidth: strokeWidth,
                        strokeLinecap: "round",
                        strokeDasharray: circumference,
                        initial: {
                            strokeDashoffset: circumference
                        },
                        animate: {
                            strokeDashoffset
                        },
                        transition: {
                            duration: 1.2,
                            ease: "easeOut"
                        },
                        style: {
                            filter: `drop-shadow(0 0 6px ${color}80)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-bold",
                        style: {
                            color: COLORS.champagneGold
                        },
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] text-neutral-500",
                        children: [
                            "/",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_c = StaffHealthRing;
function ShiftCalendar({ isManager = true }) {
    _s();
    const [currentWeek] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("27 Ocak - 2 Subat 2025");
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedDept, setExpandedDept] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requestType, setRequestType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("leave");
    const [showNotifications, setShowNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Timeline state
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTooltip, setShowTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tooltipPosition, setTooltipPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [springBackTimer, setSpringBackTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const timelineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Real current hour
    const [realHour, setRealHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ShiftCalendar.useState": ()=>new Date().getHours()
    }["ShiftCalendar.useState"]);
    // Motion values for spring animation
    const timelineX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(timelineX, {
        stiffness: 300,
        damping: 30
    });
    // Selected hour based on drag position
    const [selectedHour, setSelectedHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(realHour);
    // Brand and Department selection
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"][0]);
    const [selectedDepartment, setSelectedDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(departments[0]);
    const [isBrandSearchOpen, setIsBrandSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [brandSearchQuery, setBrandSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Update real time
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShiftCalendar.useEffect": ()=>{
            const timer = setInterval({
                "ShiftCalendar.useEffect.timer": ()=>{
                    setRealHour(new Date().getHours());
                }
            }["ShiftCalendar.useEffect.timer"], 60000);
            return ({
                "ShiftCalendar.useEffect": ()=>clearInterval(timer)
            })["ShiftCalendar.useEffect"];
        }
    }["ShiftCalendar.useEffect"], []);
    // Filter staff based on selected hour
    const activeStaff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShiftCalendar.useMemo[activeStaff]": ()=>{
            return allStaff.filter({
                "ShiftCalendar.useMemo[activeStaff]": (person)=>{
                    if (person.shiftStart < person.shiftEnd) {
                        return selectedHour >= person.shiftStart && selectedHour < person.shiftEnd;
                    } else {
                        return selectedHour >= person.shiftStart || selectedHour < person.shiftEnd;
                    }
                }
            }["ShiftCalendar.useMemo[activeStaff]"]);
        }
    }["ShiftCalendar.useMemo[activeStaff]"], [
        selectedHour
    ]);
    // Filter by department
    const departmentStaff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShiftCalendar.useMemo[departmentStaff]": ()=>{
            if (!expandedDept) return activeStaff;
            return activeStaff.filter({
                "ShiftCalendar.useMemo[departmentStaff]": (person)=>person.department === expandedDept
            }["ShiftCalendar.useMemo[departmentStaff]"]);
        }
    }["ShiftCalendar.useMemo[departmentStaff]"], [
        activeStaff,
        expandedDept
    ]);
    const totalPersonnel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShiftCalendar.useMemo[totalPersonnel]": ()=>{
            return mockWeekData.reduce({
                "ShiftCalendar.useMemo[totalPersonnel]": (acc, day)=>{
                    return acc + day.shifts.reduce({
                        "ShiftCalendar.useMemo[totalPersonnel]": (sum, shift)=>sum + shift.personnel
                    }["ShiftCalendar.useMemo[totalPersonnel]"], 0);
                }
            }["ShiftCalendar.useMemo[totalPersonnel]"], 0);
        }
    }["ShiftCalendar.useMemo[totalPersonnel]"], []);
    const openRequestModal = (type)=>{
        setRequestType(type);
        setIsRequestModalOpen(true);
    };
    const filteredBrands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShiftCalendar.useMemo[filteredBrands]": ()=>{
            if (!brandSearchQuery.trim()) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"];
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"].filter({
                "ShiftCalendar.useMemo[filteredBrands]": (brand)=>brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
            }["ShiftCalendar.useMemo[filteredBrands]"]);
        }
    }["ShiftCalendar.useMemo[filteredBrands]"], [
        brandSearchQuery
    ]);
    // Handle timeline drag
    const handleTimelineDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ShiftCalendar.useCallback[handleTimelineDrag]": (e)=>{
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, x / rect.width));
            const hour = Math.round(percentage * 23);
            setSelectedHour(hour);
            timelineX.set(percentage * rect.width);
            // Reset spring back timer
            if (springBackTimer) {
                clearTimeout(springBackTimer);
                setSpringBackTimer(null);
            }
            setCountdown(0);
        }
    }["ShiftCalendar.useCallback[handleTimelineDrag]"], [
        springBackTimer,
        timelineX
    ]);
    const handleDragStart = ()=>{
        setIsDragging(true);
        if (springBackTimer) {
            clearTimeout(springBackTimer);
            setSpringBackTimer(null);
        }
        setCountdown(0);
    };
    const handleDragEnd = ()=>{
        setIsDragging(false);
        // Start 10 second countdown
        setCountdown(10);
        const countdownInterval = setInterval(()=>{
            setCountdown((prev)=>{
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    // Spring back to real time
                    setSelectedHour(realHour);
                    if (timelineRef.current) {
                        const rect = timelineRef.current.getBoundingClientRect();
                        timelineX.set(realHour / 23 * rect.width);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setSpringBackTimer(countdownInterval);
    };
    const handleMouseMove = (e)=>{
        if (isDragging) {
            handleTimelineDrag(e);
        }
        setTooltipPosition({
            x: e.clientX,
            y: e.clientY
        });
    };
    // 24-hour timeline data
    const hours = Array.from({
        length: 24
    }, (_, i)=>i);
    // Glow intensity based on dragging
    const glowIntensity = isDragging ? 1 : 0.5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-screen pb-12",
        style: {
            background: COLORS.background
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showTooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed z-[100] pointer-events-none",
                    style: {
                        left: tooltipPosition.x + 15,
                        top: tooltipPosition.y - 60
                    },
                    initial: {
                        opacity: 0,
                        y: 10,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: 10,
                        scale: 0.9
                    },
                    transition: {
                        duration: 0.2
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 rounded-xl max-w-[280px]",
                        style: {
                            background: "rgba(0, 0, 0, 0.9)",
                            border: `1px solid ${COLORS.champagneGold}40`,
                            backdropFilter: "blur(20px)",
                            boxShadow: `0 0 30px ${COLORS.champagneGold}20`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] font-medium leading-relaxed",
                            style: {
                                color: COLORS.goldLight
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: COLORS.champagneGold
                                    },
                                    children: "Vardiya Gozlemcisi:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this),
                                " Zamani kaydirarak hangi departmanda kimin gorevde oldugunu anlik inceleyin."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 332,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                    lineNumber: 321,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-10 pt-8 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        ref: timelineRef,
                        className: "relative h-16 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing",
                        style: {
                            background: COLORS.glass,
                            border: `1px solid ${isDragging ? COLORS.electricBlue : COLORS.glassBorder}`,
                            boxShadow: isDragging ? `0 0 40px ${COLORS.electricBlue}40, inset 0 0 20px ${COLORS.electricBlue}10` : `0 0 20px ${COLORS.electricBlue}20`,
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease"
                        },
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        onMouseDown: handleDragStart,
                        onMouseUp: handleDragEnd,
                        onMouseLeave: ()=>{
                            if (isDragging) handleDragEnd();
                            setShowTooltip(false);
                        },
                        onMouseMove: handleMouseMove,
                        onMouseEnter: ()=>setShowTooltip(true),
                        onTouchStart: handleDragStart,
                        onTouchEnd: handleDragEnd,
                        onTouchMove: (e)=>handleTimelineDrag(e),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-end justify-between px-6 pb-2",
                                children: hours.map((hour)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "w-px",
                                                style: {
                                                    height: hour % 6 === 0 ? 16 : hour % 3 === 0 ? 10 : 6,
                                                    background: hour === selectedHour ? COLORS.champagneGold : hour === realHour ? COLORS.electricBlue : "rgba(255,255,255,0.2)",
                                                    boxShadow: hour === selectedHour ? `0 0 12px ${COLORS.champagneGold}` : hour === realHour ? `0 0 8px ${COLORS.electricBlue}` : "none"
                                                },
                                                animate: {
                                                    scaleY: hour === selectedHour ? 1.3 : 1
                                                },
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 500
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 383,
                                                columnNumber: 17
                                            }, this),
                                            hour % 3 === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] mt-1 font-semibold",
                                                style: {
                                                    color: hour === selectedHour ? COLORS.champagneGold : hour === realHour ? COLORS.electricBlue : "rgba(255,255,255,0.4)"
                                                },
                                                children: hour.toString().padStart(2, '0')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 404,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, hour, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute top-0 h-full",
                                style: {
                                    left: `${selectedHour / 23 * 100}%`,
                                    x: "-50%"
                                },
                                animate: {
                                    left: `${selectedHour / 23 * 100}%`
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute top-0 h-full w-20 -translate-x-1/2",
                                        style: {
                                            background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}${isDragging ? '60' : '30'} 0%, transparent 70%)`,
                                            filter: "blur(8px)"
                                        },
                                        animate: {
                                            opacity: glowIntensity
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "relative h-full w-1 rounded-full",
                                        style: {
                                            background: `linear-gradient(180deg, ${COLORS.champagneGold} 0%, ${COLORS.electricBlue} 100%)`,
                                            boxShadow: `0 0 ${isDragging ? 30 : 15}px ${COLORS.electricBlue}${isDragging ? '80' : '50'}`
                                        },
                                        animate: {
                                            scaleX: isDragging ? 1.5 : 1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 446,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full",
                                        style: {
                                            background: COLORS.background,
                                            border: `1px solid ${COLORS.champagneGold}`,
                                            boxShadow: `0 0 20px ${COLORS.champagneGold}40`
                                        },
                                        animate: {
                                            scale: isDragging ? 1.1 : 1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[13px] font-bold",
                                            style: {
                                                color: COLORS.champagneGold
                                            },
                                            children: [
                                                selectedHour.toString().padStart(2, '0'),
                                                ":00"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            selectedHour !== realHour && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute top-0 h-full w-0.5 rounded-full opacity-50",
                                style: {
                                    left: `${realHour / 23 * 100}%`,
                                    background: COLORS.electricBlue,
                                    boxShadow: `0 0 10px ${COLORS.electricBlue}`
                                },
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: countdown > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute top-2 right-4 px-3 py-1 rounded-full",
                                    style: {
                                        background: "rgba(0,0,0,0.8)",
                                        border: `1px solid ${COLORS.electricBlue}40`
                                    },
                                    initial: {
                                        opacity: 0,
                                        scale: 0.8
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.8
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-medium",
                                        style: {
                                            color: COLORS.electricBlue
                                        },
                                        children: [
                                            "Geri sayim: ",
                                            countdown,
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 505,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "flex items-center justify-between mt-4",
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full",
                                        style: {
                                            background: COLORS.champagneGold,
                                            boxShadow: `0 0 8px ${COLORS.champagneGold}80`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 521,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-semibold tracking-[0.3em] uppercase",
                                        style: {
                                            color: COLORS.champagneGold
                                        },
                                        children: "Chronos Module"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full",
                                        style: {
                                            background: COLORS.champagneGold,
                                            boxShadow: `0 0 8px ${COLORS.champagneGold}80`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 534,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 520,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        size: 14,
                                        style: {
                                            color: COLORS.electricBlue
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 545,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] font-semibold",
                                        style: {
                                            color: COLORS.goldLight
                                        },
                                        children: [
                                            activeStaff.length,
                                            " Aktif Personel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-neutral-500",
                                        children: [
                                            "@ ",
                                            selectedHour.toString().padStart(2, '0'),
                                            ":00"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 549,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 514,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-10 pt-4 pb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>{
                                        const currentIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"].findIndex((b)=>b.id === selectedBrand.id);
                                        const prevIndex = currentIndex === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"].length - 1 : currentIndex - 1;
                                        setSelectedBrand(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"][prevIndex]);
                                    },
                                    className: "w-10 h-10 rounded-full flex items-center justify-center",
                                    style: {
                                        background: COLORS.glass,
                                        border: `1px solid ${COLORS.glassBorder}`
                                    },
                                    whileHover: {
                                        scale: 1.1,
                                        borderColor: COLORS.champagneGold
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        className: "w-4 h-4",
                                        style: {
                                            color: COLORS.champagneGold
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 575,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>setIsBrandSearchOpen(true),
                                    className: "relative flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden",
                                    style: {
                                        background: COLORS.glass,
                                        border: `1px solid ${COLORS.champagneGold}40`,
                                        backdropFilter: "blur(20px)"
                                    },
                                    whileHover: {
                                        scale: 1.02,
                                        borderColor: COLORS.champagneGold
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 rounded-full pointer-events-none",
                                            style: {
                                                background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${COLORS.champagneGold}10, transparent 70%)`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 589,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full flex items-center justify-center",
                                            style: {
                                                background: `${COLORS.champagneGold}20`
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.champagneGold
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 599,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 595,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base font-semibold",
                                            style: {
                                                color: COLORS.goldLight
                                            },
                                            children: selectedBrand.name
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 601,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "w-4 h-4 ml-2",
                                            style: {
                                                color: COLORS.champagneGold + "80"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 602,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>{
                                        const currentIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"].findIndex((b)=>b.id === selectedBrand.id);
                                        const nextIndex = currentIndex === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"].length - 1 ? 0 : currentIndex + 1;
                                        setSelectedBrand(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$lib$2f$dashboard$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brands"][nextIndex]);
                                    },
                                    className: "w-10 h-10 rounded-full flex items-center justify-center",
                                    style: {
                                        background: COLORS.glass,
                                        border: `1px solid ${COLORS.glassBorder}`
                                    },
                                    whileHover: {
                                        scale: 1.1,
                                        borderColor: COLORS.champagneGold
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-4 h-4",
                                        style: {
                                            color: COLORS.champagneGold
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 619,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 605,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 560,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-6 gap-4",
                        children: departments.map((dept, index)=>{
                            const deptActiveCount = activeStaff.filter((p)=>p.department === dept.id).length;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "relative cursor-pointer group",
                                initial: {
                                    opacity: 0,
                                    y: 30
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: index * 0.08
                                },
                                onClick: ()=>setExpandedDept(expandedDept === dept.id ? null : dept.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "relative p-5 rounded-2xl overflow-hidden",
                                    style: {
                                        background: COLORS.glass,
                                        border: expandedDept === dept.id ? `1px solid ${COLORS.electricBlue}` : `1px solid ${COLORS.glassBorder}`,
                                        backdropFilter: "blur(20px)"
                                    },
                                    whileHover: {
                                        scale: 1.02,
                                        background: COLORS.glassHover,
                                        borderColor: COLORS.electricBlue + "60"
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    layout: true,
                                    children: [
                                        expandedDept === dept.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 pointer-events-none",
                                            style: {
                                                background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}15, transparent 70%)`
                                            },
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 657,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-full h-16 rounded-xl overflow-hidden mb-4 bg-neutral-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: dept.image || "/placeholder.svg",
                                                    alt: dept.name,
                                                    fill: true,
                                                    priority: true,
                                                    loading: "eager",
                                                    sizes: "120px",
                                                    className: "object-cover",
                                                    style: {
                                                        filter: "brightness(0.9) saturate(1.1)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0",
                                                    style: {
                                                        background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 681,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 668,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-[13px] font-bold mb-3 tracking-wide",
                                            style: {
                                                color: COLORS.goldLight
                                            },
                                            children: dept.name
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 690,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StaffHealthRing, {
                                                    active: deptActiveCount,
                                                    total: dept.personnel,
                                                    size: 56,
                                                    color: expandedDept === dept.id ? COLORS.electricBlue : dept.color
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 699,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                                            children: "Aktif"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[20px] font-bold",
                                                            style: {
                                                                color: COLORS.electricBlue
                                                            },
                                                            children: deptActiveCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 698,
                                            columnNumber: 19
                                        }, this),
                                        expandedDept === dept.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute top-3 right-3 w-2 h-2 rounded-full",
                                            style: {
                                                background: COLORS.electricBlue,
                                                boxShadow: `0 0 10px ${COLORS.electricBlue}`
                                            },
                                            animate: {
                                                scale: [
                                                    1,
                                                    1.3,
                                                    1
                                                ],
                                                opacity: [
                                                    1,
                                                    0.7,
                                                    1
                                                ]
                                            },
                                            transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 718,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 638,
                                    columnNumber: 17
                                }, this)
                            }, dept.id, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 630,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: expandedDept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "mt-6 rounded-2xl overflow-hidden",
                            style: {
                                background: COLORS.glass,
                                border: `1px solid ${COLORS.glassBorder}`,
                                backdropFilter: "blur(20px)"
                            },
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: "auto"
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            transition: {
                                duration: 0.4,
                                ease: "easeInOut"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[15px] font-bold tracking-wide",
                                                style: {
                                                    color: COLORS.goldLight
                                                },
                                                children: [
                                                    departments.find((d)=>d.id === expandedDept)?.name,
                                                    " Ekibi @ ",
                                                    selectedHour.toString().padStart(2, '0'),
                                                    ":00"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 758,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] px-3 py-1 rounded-full",
                                                style: {
                                                    background: `${COLORS.electricBlue}20`,
                                                    color: COLORS.electricBlue
                                                },
                                                children: [
                                                    departmentStaff.length,
                                                    " Aktif"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 764,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 757,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-6 gap-3",
                                        children: departmentStaff.map((person, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "relative p-3 rounded-xl group cursor-pointer",
                                                style: {
                                                    background: "rgba(255,255,255,0.02)",
                                                    border: `1px solid ${COLORS.glassBorder}`
                                                },
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                transition: {
                                                    delay: index * 0.02
                                                },
                                                whileHover: {
                                                    scale: 1.02,
                                                    borderColor: COLORS.electricBlue + "60",
                                                    background: "rgba(255,255,255,0.04)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "absolute inset-0 rounded-xl pointer-events-none",
                                                        style: {
                                                            background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}10, transparent 70%)`
                                                        },
                                                        animate: {
                                                            opacity: [
                                                                0.3,
                                                                0.6,
                                                                0.3
                                                            ]
                                                        },
                                                        transition: {
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                            delay: index * 0.1
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 795,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[12px] font-semibold mb-1 truncate",
                                                        style: {
                                                            color: COLORS.goldLight
                                                        },
                                                        children: person.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 812,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                size: 10,
                                                                style: {
                                                                    color: COLORS.champagneGold
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold",
                                                                style: {
                                                                    color: COLORS.champagneGold
                                                                },
                                                                children: [
                                                                    person.lp,
                                                                    " LP"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                lineNumber: 822,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] text-neutral-500 mt-1",
                                                        children: [
                                                            person.shiftStart.toString().padStart(2, '0'),
                                                            ":00 - ",
                                                            person.shiftEnd.toString().padStart(2, '0'),
                                                            ":00"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 831,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, person.id, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 778,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 776,
                                        columnNumber: 17
                                    }, this),
                                    departmentStaff.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-neutral-500 text-[13px]",
                                            children: "Bu saatte aktif personel bulunmuyor"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 840,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 839,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 756,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 744,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 742,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-10 pt-4 pb-8",
                style: {
                    background: COLORS.background
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-[32px] font-medium tracking-tight mb-2",
                                        style: {
                                            color: COLORS.goldLight
                                        },
                                        children: "Mesai Takvimi"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 855,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[15px] font-normal text-neutral-400",
                                        children: "Haftalik vardiya planlama ve personel yonetimi"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 861,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    !isManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                className: "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all",
                                                style: {
                                                    background: COLORS.glass,
                                                    border: `1px solid ${COLORS.glassBorder}`,
                                                    color: COLORS.goldLight
                                                },
                                                whileHover: {
                                                    borderColor: COLORS.champagneGold
                                                },
                                                whileTap: {
                                                    scale: 0.98
                                                },
                                                onClick: ()=>openRequestModal("leave"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "w-4 h-4",
                                                        style: {
                                                            color: COLORS.champagneGold
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Izin Talep Et"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 870,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                className: "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all",
                                                style: {
                                                    background: COLORS.glass,
                                                    border: `1px solid ${COLORS.glassBorder}`,
                                                    color: COLORS.goldLight
                                                },
                                                whileHover: {
                                                    borderColor: COLORS.champagneGold
                                                },
                                                whileTap: {
                                                    scale: 0.98
                                                },
                                                onClick: ()=>openRequestModal("shift"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-4 h-4",
                                                        style: {
                                                            color: COLORS.champagneGold
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Mesai Talep Et"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 884,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    isManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        className: "relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all",
                                        style: {
                                            background: COLORS.glass,
                                            border: `1px solid ${COLORS.glassBorder}`,
                                            color: COLORS.goldLight
                                        },
                                        whileHover: {
                                            borderColor: COLORS.champagneGold
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        onClick: ()=>setShowNotifications(!showNotifications),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.champagneGold
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 914,
                                                columnNumber: 17
                                            }, this),
                                            "Talepler",
                                            mockPendingRequests.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white",
                                                style: {
                                                    background: "#ef4444"
                                                },
                                                children: mockPendingRequests.length
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 917,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 903,
                                        columnNumber: 15
                                    }, this),
                                    isManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        className: "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-bold transition-all",
                                        style: {
                                            background: COLORS.champagneGold,
                                            color: COLORS.background
                                        },
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "w-4 h-4",
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 938,
                                                columnNumber: 17
                                            }, this),
                                            "Vardiya Ekle"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 929,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 866,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 853,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        style: {
                                            background: COLORS.glass,
                                            border: `1px solid ${COLORS.glassBorder}`
                                        },
                                        whileHover: {
                                            borderColor: COLORS.champagneGold
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "w-5 h-5",
                                            style: {
                                                color: COLORS.champagneGold
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 957,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 948,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[17px] font-semibold tracking-tight",
                                        style: {
                                            color: COLORS.goldLight
                                        },
                                        children: currentWeek
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 959,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        style: {
                                            background: COLORS.glass,
                                            border: `1px solid ${COLORS.glassBorder}`
                                        },
                                        whileHover: {
                                            borderColor: COLORS.champagneGold
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-5 h-5",
                                            style: {
                                                color: COLORS.champagneGold
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 974,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 965,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 947,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] uppercase tracking-widest mb-1 font-medium",
                                            style: {
                                                color: COLORS.champagneGold + "80"
                                            },
                                            children: "Haftalik Toplam"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 981,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[28px] font-semibold tracking-tight",
                                            style: {
                                                color: COLORS.goldLight
                                            },
                                            children: [
                                                totalPersonnel,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px] font-normal ml-2",
                                                    style: {
                                                        color: COLORS.champagneGold + "80"
                                                    },
                                                    children: "personel"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 989,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 987,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 980,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 979,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 946,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mt-6",
                        children: mockShifts.map((shift)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 px-4 py-2 rounded-full",
                                style: {
                                    background: COLORS.glass,
                                    border: `1px solid ${COLORS.glassBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 rounded-full",
                                        style: {
                                            backgroundColor: shift.color,
                                            boxShadow: `0 0 8px ${shift.color}80`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1006,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-medium",
                                        style: {
                                            color: COLORS.goldLight
                                        },
                                        children: shift.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] font-normal",
                                        style: {
                                            color: COLORS.champagneGold + "80"
                                        },
                                        children: shift.time
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1014,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, shift.id, true, {
                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                lineNumber: 998,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                        lineNumber: 996,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 852,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-10 py-8",
                style: {
                    background: COLORS.background
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-7 gap-4",
                    children: mockWeekData.map((day, dayIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "rounded-2xl overflow-hidden cursor-pointer transition-all",
                            style: {
                                background: COLORS.glass,
                                border: selectedDay === day.day ? `1px solid ${COLORS.electricBlue}` : `1px solid ${COLORS.glassBorder}`,
                                backdropFilter: "blur(20px)",
                                boxShadow: selectedDay === day.day ? `0 0 40px ${COLORS.electricBlue}20` : "none"
                            },
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: dayIndex * 0.04
                            },
                            whileHover: {
                                y: -4,
                                borderColor: COLORS.electricBlue + "60"
                            },
                            onClick: ()=>setSelectedDay(selectedDay === day.day ? null : day.day),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-5 py-4 border-b",
                                    style: {
                                        borderColor: COLORS.glassBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[12px] uppercase tracking-widest mb-1 font-semibold",
                                            style: {
                                                color: COLORS.champagneGold
                                            },
                                            children: day.day
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1051,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[28px] font-bold",
                                            style: {
                                                color: COLORS.goldLight
                                            },
                                            children: day.date
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1047,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 space-y-3",
                                    children: day.shifts.map((shift, shiftIndex)=>{
                                        const shiftInfo = mockShifts.find((s)=>s.id === shift.shiftId);
                                        const fillPercentage = shift.personnel / shift.maxPersonnel * 100;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "group relative p-4 rounded-xl transition-all",
                                            style: {
                                                background: "rgba(255, 255, 255, 0.02)",
                                                border: `1px solid ${COLORS.glassBorder}`
                                            },
                                            initial: {
                                                opacity: 0,
                                                x: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                delay: dayIndex * 0.04 + shiftIndex * 0.02
                                            },
                                            whileHover: {
                                                background: "rgba(255, 255, 255, 0.04)",
                                                borderColor: COLORS.electricBlue + "40"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[13px] font-semibold",
                                                            style: {
                                                                color: COLORS.goldLight
                                                            },
                                                            children: shiftInfo?.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1089,
                                                            columnNumber: 25
                                                        }, this),
                                                        fillPercentage >= 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                                            style: {
                                                                background: `${COLORS.electricBlue}20`,
                                                                color: COLORS.electricBlue
                                                            },
                                                            children: "Tam"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1096,
                                                            columnNumber: 27
                                                        }, this),
                                                        fillPercentage < 70 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                                            style: {
                                                                background: "rgba(239, 68, 68, 0.2)",
                                                                color: "#ef4444"
                                                            },
                                                            children: "Eksik"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1088,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline gap-1.5 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[24px] font-bold",
                                                            style: {
                                                                color: shiftInfo?.color
                                                            },
                                                            children: shift.personnel
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1121,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[13px] font-medium",
                                                            style: {
                                                                color: COLORS.champagneGold + "80"
                                                            },
                                                            children: [
                                                                "/ ",
                                                                shift.maxPersonnel
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1120,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-1.5 rounded-full overflow-hidden",
                                                    style: {
                                                        background: "rgba(255, 255, 255, 0.1)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "h-full rounded-full",
                                                        style: {
                                                            backgroundColor: shiftInfo?.color,
                                                            boxShadow: `0 0 10px ${shiftInfo?.color}60`
                                                        },
                                                        initial: {
                                                            width: 0
                                                        },
                                                        animate: {
                                                            width: `${fillPercentage}%`
                                                        },
                                                        transition: {
                                                            delay: dayIndex * 0.04 + shiftIndex * 0.02 + 0.3,
                                                            duration: 0.6,
                                                            ease: "easeOut"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1140,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1136,
                                                    columnNumber: 23
                                                }, this),
                                                isManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-xl",
                                                    style: {
                                                        background: "rgba(0, 0, 0, 0.85)",
                                                        backdropFilter: "blur(4px)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "w-9 h-9 rounded-full flex items-center justify-center transition-all",
                                                                style: {
                                                                    background: COLORS.champagneGold,
                                                                    color: COLORS.background
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                    className: "w-4 h-4",
                                                                    strokeWidth: 2
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                    lineNumber: 1169,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                lineNumber: 1162,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "w-9 h-9 rounded-full flex items-center justify-center transition-all",
                                                                style: {
                                                                    background: COLORS.glass,
                                                                    border: `1px solid ${COLORS.glassBorder}`,
                                                                    color: COLORS.goldLight
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "w-4 h-4",
                                                                    strokeWidth: 1.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                    lineNumber: 1179,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                                lineNumber: 1171,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1161,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1154,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, shift.shiftId, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1072,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1066,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, day.day, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1024,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                    lineNumber: 1022,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 1021,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showNotifications && isManager && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed top-24 right-10 w-96 rounded-2xl overflow-hidden z-50",
                    style: {
                        background: "rgba(0, 0, 0, 0.95)",
                        border: `1px solid ${COLORS.glassBorder}`,
                        backdropFilter: "blur(40px)",
                        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8)`
                    },
                    initial: {
                        opacity: 0,
                        y: -10,
                        scale: 0.95
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -10,
                        scale: 0.95
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b flex items-center justify-between",
                            style: {
                                borderColor: COLORS.glassBorder
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[15px] font-bold",
                                    style: {
                                        color: COLORS.goldLight
                                    },
                                    children: "Bekleyen Talepler"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1212,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>setShowNotifications(false),
                                    className: "w-8 h-8 rounded-full flex items-center justify-center",
                                    style: {
                                        background: COLORS.glass
                                    },
                                    whileHover: {
                                        background: COLORS.glassHover
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 16,
                                        style: {
                                            color: COLORS.goldLight
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1219,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1213,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1208,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-80 overflow-y-auto",
                            children: mockPendingRequests.map((request, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "p-4 border-b",
                                    style: {
                                        borderColor: COLORS.glassBorder
                                    },
                                    initial: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    transition: {
                                        delay: index * 0.05
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[14px] font-semibold",
                                                        style: {
                                                            color: COLORS.goldLight
                                                        },
                                                        children: request.employeeName
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1234,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[12px] text-neutral-500 mt-0.5",
                                                        children: request.type === "leave" ? `Izin: ${request.reason}` : `Vardiya Degisikligi: ${request.fromShift} → ${request.toShift}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1237,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] mt-1",
                                                        style: {
                                                            color: COLORS.champagneGold + "80"
                                                        },
                                                        children: request.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1240,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 1233,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        className: "w-8 h-8 rounded-full flex items-center justify-center",
                                                        style: {
                                                            background: `${COLORS.electricBlue}20`,
                                                            color: COLORS.electricBlue
                                                        },
                                                        whileHover: {
                                                            scale: 1.1
                                                        },
                                                        whileTap: {
                                                            scale: 0.95
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1252,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1243,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        className: "w-8 h-8 rounded-full flex items-center justify-center",
                                                        style: {
                                                            background: "rgba(239, 68, 68, 0.2)",
                                                            color: "#ef4444"
                                                        },
                                                        whileHover: {
                                                            scale: 1.1
                                                        },
                                                        whileTap: {
                                                            scale: 0.95
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1263,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 1242,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1232,
                                        columnNumber: 19
                                    }, this)
                                }, request.id, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1224,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                    lineNumber: 1196,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 1194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isRequestModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed inset-0 z-50 flex items-center justify-center",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                background: "rgba(0, 0, 0, 0.8)"
                            },
                            onClick: ()=>setIsRequestModalOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "relative w-[440px] rounded-3xl overflow-hidden",
                            style: {
                                background: COLORS.background,
                                border: `1px solid ${COLORS.glassBorder}`,
                                boxShadow: `0 0 80px ${COLORS.electricBlue}20`
                            },
                            initial: {
                                scale: 0.9,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            exit: {
                                scale: 0.9,
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b",
                                    style: {
                                        borderColor: COLORS.glassBorder
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-[20px] font-bold",
                                        style: {
                                            color: COLORS.goldLight
                                        },
                                        children: requestType === "leave" ? "Izin Talep Et" : "Mesai Degisikligi Talep Et"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1303,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] font-semibold uppercase tracking-wider block mb-2",
                                                    style: {
                                                        color: COLORS.champagneGold
                                                    },
                                                    children: "Tarih"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    className: "w-full p-3 rounded-xl text-[14px] outline-none",
                                                    style: {
                                                        background: COLORS.glass,
                                                        border: `1px solid ${COLORS.glassBorder}`,
                                                        color: COLORS.goldLight
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1315,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1308,
                                            columnNumber: 17
                                        }, this),
                                        requestType === "leave" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] font-semibold uppercase tracking-wider block mb-2",
                                                    style: {
                                                        color: COLORS.champagneGold
                                                    },
                                                    children: "Izin Turu"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1327,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full p-3 rounded-xl text-[14px] outline-none",
                                                    style: {
                                                        background: COLORS.glass,
                                                        border: `1px solid ${COLORS.glassBorder}`,
                                                        color: COLORS.goldLight
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "annual",
                                                            children: "Yillik Izin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1341,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "sick",
                                                            children: "Saglik Izni"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1342,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "personal",
                                                            children: "Kisisel Izin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1343,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1326,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] font-semibold uppercase tracking-wider block mb-2",
                                                    style: {
                                                        color: COLORS.champagneGold
                                                    },
                                                    children: "Istenen Vardiya"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1348,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full p-3 rounded-xl text-[14px] outline-none",
                                                    style: {
                                                        background: COLORS.glass,
                                                        border: `1px solid ${COLORS.glassBorder}`,
                                                        color: COLORS.goldLight
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "morning",
                                                            children: "Sabah (08:00 - 16:00)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1362,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "afternoon",
                                                            children: "Ogle (16:00 - 00:00)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1363,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "night",
                                                            children: "Gece (00:00 - 08:00)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                            lineNumber: 1364,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1354,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1347,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] font-semibold uppercase tracking-wider block mb-2",
                                                    style: {
                                                        color: COLORS.champagneGold
                                                    },
                                                    children: "Aciklama"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1369,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    rows: 3,
                                                    className: "w-full p-3 rounded-xl text-[14px] outline-none resize-none",
                                                    style: {
                                                        background: COLORS.glass,
                                                        border: `1px solid ${COLORS.glassBorder}`,
                                                        color: COLORS.goldLight
                                                    },
                                                    placeholder: "Opsiyonel aciklama..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1375,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1368,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1307,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-t flex items-center justify-end gap-3",
                                    style: {
                                        borderColor: COLORS.glassBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            className: "px-5 py-2.5 rounded-full text-[14px] font-medium",
                                            style: {
                                                background: COLORS.glass,
                                                border: `1px solid ${COLORS.glassBorder}`,
                                                color: COLORS.goldLight
                                            },
                                            whileHover: {
                                                borderColor: COLORS.champagneGold
                                            },
                                            whileTap: {
                                                scale: 0.98
                                            },
                                            onClick: ()=>setIsRequestModalOpen(false),
                                            children: "Iptal"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1391,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            className: "px-5 py-2.5 rounded-full text-[14px] font-bold",
                                            style: {
                                                background: COLORS.champagneGold,
                                                color: COLORS.background
                                            },
                                            whileHover: {
                                                scale: 1.02
                                            },
                                            whileTap: {
                                                scale: 0.98
                                            },
                                            children: "Talep Gonder"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1404,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1387,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1288,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                    lineNumber: 1277,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 1275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isBrandSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed inset-0 z-50 flex items-center justify-center",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                background: "rgba(0, 0, 0, 0.8)"
                            },
                            onClick: ()=>setIsBrandSearchOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1430,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "relative w-[500px] rounded-3xl overflow-hidden",
                            style: {
                                background: COLORS.background,
                                border: `1px solid ${COLORS.glassBorder}`,
                                boxShadow: `0 0 80px ${COLORS.champagneGold}10`
                            },
                            initial: {
                                scale: 0.9,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            exit: {
                                scale: 0.9,
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b",
                                    style: {
                                        borderColor: COLORS.glassBorder
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 px-4 py-3 rounded-xl",
                                        style: {
                                            background: COLORS.glass,
                                            border: `1px solid ${COLORS.glassBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 18,
                                                style: {
                                                    color: COLORS.champagneGold
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 1457,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Sirket ara...",
                                                value: brandSearchQuery,
                                                onChange: (e)=>setBrandSearchQuery(e.target.value),
                                                className: "flex-1 bg-transparent text-[14px] outline-none",
                                                style: {
                                                    color: COLORS.goldLight
                                                },
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                lineNumber: 1458,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                        lineNumber: 1450,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1446,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-80 overflow-y-auto p-4 space-y-2",
                                    children: filteredBrands.map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            className: "w-full flex items-center gap-3 p-3 rounded-xl text-left",
                                            style: {
                                                background: selectedBrand.id === brand.id ? COLORS.glassHover : "transparent",
                                                border: `1px solid ${selectedBrand.id === brand.id ? COLORS.champagneGold + "40" : "transparent"}`
                                            },
                                            whileHover: {
                                                background: COLORS.glassHover
                                            },
                                            onClick: ()=>{
                                                setSelectedBrand(brand);
                                                setIsBrandSearchOpen(false);
                                                setBrandSearchQuery("");
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-full flex items-center justify-center",
                                                    style: {
                                                        background: `${COLORS.champagneGold}20`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                        size: 18,
                                                        style: {
                                                            color: COLORS.champagneGold
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                        lineNumber: 1489,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1485,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px] font-medium",
                                                    style: {
                                                        color: COLORS.goldLight
                                                    },
                                                    children: brand.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                                    lineNumber: 1491,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, brand.id, true, {
                                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                            lineNumber: 1471,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                                    lineNumber: 1469,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                            lineNumber: 1435,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                    lineNumber: 1424,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
                lineNumber: 1422,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s(ShiftCalendar, "z7ZcTPmMIn2F+s6XShGJeZSJeh0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c1 = ShiftCalendar;
var _c, _c1;
__turbopack_context__.k.register(_c, "StaffHealthRing");
__turbopack_context__.k.register(_c1, "ShiftCalendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/companymanagementsystem/components/dashboard/shift-calendar.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Desktop_companymanagementsystem_components_dashboard_shift-calendar_tsx_212fcc70._.js.map